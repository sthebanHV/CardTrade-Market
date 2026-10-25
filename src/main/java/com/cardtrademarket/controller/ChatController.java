package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Conversation;
import com.cardtrademarket.model.Message;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.ConversationRepository;
import com.cardtrademarket.repository.MessageRepository;
import com.cardtrademarket.repository.UserRepository;
import com.cardtrademarket.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private NotificationService notificationService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private Map<String, Object> resumenUsuario(User u) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", u.getId());
        m.put("username", u.getUsername());
        m.put("nombre", u.getNombre());
        m.put("avatarUrl", u.getAvatarUrl());
        return m;
    }

    private Map<String, Object> resumenConversacion(Conversation c, User yo) {
        String otroId = yo.getId().equals(c.getParticipante1()) ? c.getParticipante2() : c.getParticipante1();
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", c.getId());
        m.put("cardId", c.getCardId());
        userRepository.findById(otroId).ifPresent(otro -> m.put("otro", resumenUsuario(otro)));
        if (c.getCardId() != null) {
            cardRepository.findById(c.getCardId()).ifPresent(card -> {
                Map<String, Object> cm = new LinkedHashMap<>();
                cm.put("id", card.getId());
                cm.put("nombre", card.getNombre());
                cm.put("imagenes", card.getImagenes());
                m.put("card", cm);
            });
        }
        List<Message> msgs = messageRepository.findByConversationIdOrderByCreatedAtAsc(c.getId());
        if (!msgs.isEmpty()) {
            Message ultimo = msgs.get(msgs.size() - 1);
            m.put("ultimoMensaje", ultimo.getContenido());
            m.put("ultimoFecha", ultimo.getCreatedAt());
        } else {
            m.put("ultimoMensaje", null);
            m.put("ultimoFecha", c.getLastMessageAt());
        }
        m.put("noLeidos", messageRepository.countByConversationIdAndSenderIdNotAndLeidoFalse(c.getId(), yo.getId()));
        return m;
    }

    @GetMapping("/conversations")
    public ResponseEntity<?> conversaciones() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        List<Map<String, Object>> out = new ArrayList<>();
        for (Conversation c : conversationRepository.deUsuario(u.getId())) {
            out.add(resumenConversacion(c, u));
        }
        return ResponseEntity.ok(out);
    }

    @PostMapping("/conversations")
    public ResponseEntity<?> iniciar(@RequestBody Map<String, String> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        String otroId = body.get("userId");
        String cardId = body.get("cardId");
        if (otroId == null || otroId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "userId es obligatorio"));
        }
        if (otroId.equals(u.getId())) {
            return ResponseEntity.badRequest().body(Map.of("error", "No puedes escribirte a ti mismo"));
        }
        if (userRepository.findById(otroId).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Usuario no encontrado"));
        }
        Optional<Conversation> existente = conversationRepository.entre(u.getId(), otroId);
        Conversation c = existente.orElseGet(() -> conversationRepository.save(
                new Conversation(u.getId(), otroId, cardId)));
        return ResponseEntity.ok(resumenConversacion(c, u));
    }

    @org.springframework.transaction.annotation.Transactional
    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<?> mensajes(@PathVariable String conversationId) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        Optional<Conversation> opt = conversationRepository.findById(conversationId);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Conversaci\u00f3n no encontrada"));
        }
        Conversation c = opt.get();
        if (!u.getId().equals(c.getParticipante1()) && !u.getId().equals(c.getParticipante2())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "No participas en esta conversaci\u00f3n"));
        }
        marcarLeidos(c.getId(), u.getId());
        List<Map<String, Object>> out = new ArrayList<>();
        for (Message msg : messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId)) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", msg.getId());
            m.put("senderId", msg.getSenderId());
            m.put("contenido", msg.getContenido());
            m.put("leido", msg.getLeido());
            m.put("createdAt", msg.getCreatedAt());
            m.put("mio", msg.getSenderId().equals(u.getId()));
            out.add(m);
        }
        return ResponseEntity.ok(out);
    }

    @Transactional
    protected void marcarLeidos(String conversationId, String userId) {
        messageRepository.marcarLeidos(conversationId, userId);
    }

    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<?> enviar(@PathVariable String conversationId, @RequestBody Map<String, String> body) {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        Optional<Conversation> opt = conversationRepository.findById(conversationId);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Conversaci\u00f3n no encontrada"));
        }
        Conversation c = opt.get();
        if (!u.getId().equals(c.getParticipante1()) && !u.getId().equals(c.getParticipante2())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "No participas en esta conversaci\u00f3n"));
        }
        String contenido = body.get("contenido");
        if (contenido == null || contenido.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El mensaje no puede estar vac\u00edo"));
        }
        if (contenido.length() > 500) {
            contenido = contenido.substring(0, 500);
        }
        Message msg = messageRepository.save(new Message(conversationId, u.getId(), contenido));
        c.setLastMessageAt(LocalDateTime.now());
        conversationRepository.save(c);

        String receptorId = u.getId().equals(c.getParticipante1()) ? c.getParticipante2() : c.getParticipante1();
        try {
            notificationService.createNotification(receptorId, "MESSAGE",
                    "Nuevo mensaje de " + u.getUsername(),
                    contenido.length() > 80 ? contenido.substring(0, 80) + "\u2026" : contenido,
                    "/messages");
            log.info("[EMAIL-SIMULADO] para {}: nuevo mensaje de {}", receptorId, u.getUsername());
        } catch (Exception ignored) {
        }

        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", msg.getId());
        m.put("senderId", msg.getSenderId());
        m.put("contenido", msg.getContenido());
        m.put("leido", msg.getLeido());
        m.put("createdAt", msg.getCreatedAt());
        m.put("mio", true);
        return ResponseEntity.status(HttpStatus.CREATED).body(m);
    }

    @GetMapping("/unread-total")
    public ResponseEntity<?> noLeidos() {
        User u = usuarioActual();
        if (u == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "No autorizado"));
        }
        return ResponseEntity.ok(Map.of("unread", messageRepository.noLeidosDe(u.getId())));
    }
}
