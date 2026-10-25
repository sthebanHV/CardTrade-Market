package com.cardtrademarket.controller;

import com.cardtrademarket.model.Card;
import com.cardtrademarket.model.Follow;
import com.cardtrademarket.model.Review;
import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.FollowRepository;
import com.cardtrademarket.repository.ReviewRepository;
import com.cardtrademarket.repository.UserRepository;
import com.cardtrademarket.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/sellers")
public class SellersController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private CardService cardService;

    private User usuarioActual() {
        org.springframework.security.core.Authentication auth =
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() instanceof String) {
            return null;
        }
        return (User) auth.getPrincipal();
    }

    private Optional<User> vendedor(String username) {
        return userRepository.findByUsername(username);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> perfil(@PathVariable String username) {
        Optional<User> opt = vendedor(username);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Vendedor no encontrado"));
        }
        User v = opt.get();
        List<Review> reseñas = reviewRepository.findBySellerIdOrderByCreatedAtDesc(v.getId());

        double ratingProm = reseñas.stream()
                .mapToInt(r -> r.getRating() == null ? 0 : r.getRating())
                .average().orElse(v.getRating() == null ? 0.0 : v.getRating());
        long positivas = reseñas.stream()
                .filter(r -> r.getRating() != null && r.getRating() >= 4).count();
        double pctPositivas = reseñas.isEmpty() ? 0.0 : Math.round(positivas * 100.0 / reseñas.size());

        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", v.getId());
        m.put("username", v.getUsername());
        m.put("nombre", v.getNombre());
        m.put("avatarUrl", v.getAvatarUrl());
        m.put("bio", v.getBio());
        m.put("rating", Math.round(ratingProm * 10.0) / 10.0);
        m.put("reseñas", reseñas.size());
        m.put("pctPositivas", pctPositivas);
        m.put("ventas", cardService.contarVendidasDe(v.getId()));
        m.put("publicacionesActivas", cardService.contarPublicadasDe(v.getId()));
        m.put("followers", followRepository.countByFollowingId(v.getId()));
        m.put("following", followRepository.countByFollowerId(v.getId()));

        User yo = usuarioActual();
        boolean siguiendo = false;
        if (yo != null && !yo.getId().equals(v.getId())) {
            siguiendo = followRepository.findByFollowerIdAndFollowingId(yo.getId(), v.getId()).isPresent();
        }
        m.put("siguiendo", siguiendo);
        m.put("esPropio", yo != null && yo.getId().equals(v.getId()));
        return ResponseEntity.ok(m);
    }

    @GetMapping("/{username}/listings")
    public ResponseEntity<?> listings(@PathVariable String username) {
        Optional<User> opt = vendedor(username);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Vendedor no encontrado"));
        }
        List<Card> cards = cardService.misPublicaciones(opt.get().getId(), "activas");
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/{username}/reviews")
    public ResponseEntity<?> reviews(@PathVariable String username) {
        Optional<User> opt = vendedor(username);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Vendedor no encontrado"));
        }
        List<Map<String, Object>> out = new ArrayList<>();
        for (Review r : reviewRepository.findBySellerIdOrderByCreatedAtDesc(opt.get().getId())) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("rating", r.getRating());
            m.put("comment", r.getComment());
            m.put("fecha", r.getCreatedAt());
            userRepository.findById(r.getUserId()).ifPresent(autor -> {
                Map<String, Object> a = new LinkedHashMap<>();
                a.put("username", autor.getUsername());
                a.put("nombre", autor.getNombre());
                a.put("avatarUrl", autor.getAvatarUrl());
                m.put("autor", a);
            });
            out.add(m);
        }
        return ResponseEntity.ok(out);
    }

    @org.springframework.transaction.annotation.Transactional
    @PostMapping("/{username}/follow")
    public ResponseEntity<?> seguir(@PathVariable String username) {
        User yo = usuarioActual();
        if (yo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Debes iniciar sesión"));
        }
        Optional<User> opt = vendedor(username);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Vendedor no encontrado"));
        }
        User v = opt.get();
        if (v.getId().equals(yo.getId())) {
            return ResponseEntity.badRequest().body(Map.of("error", "No puedes seguirte a ti mismo"));
        }
        Optional<Follow> existente = followRepository.findByFollowerIdAndFollowingId(yo.getId(), v.getId());
        boolean siguiendo;
        if (existente.isPresent()) {
            followRepository.deleteByFollowerIdAndFollowingId(yo.getId(), v.getId());
            siguiendo = false;
        } else {
            Follow f = new Follow();
            f.setFollowerId(yo.getId());
            f.setFollowingId(v.getId());
            f.setFecha(new java.util.Date());
            followRepository.save(f);
            siguiendo = true;
        }
        return ResponseEntity.ok(Map.of(
                "following", siguiendo,
                "followers", followRepository.countByFollowingId(v.getId())
        ));
    }
}
