package com.cardtrademarket.controller;

import com.cardtrademarket.repository.CardRepository;
import com.cardtrademarket.repository.OrderRepository;
import com.cardtrademarket.repository.UserRepository;
import com.cardtrademarket.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StatsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CardService cardService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> stats() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("usuarios", userRepository.count());
        m.put("cartas", cardRepository.count());
        m.put("ventas", orderRepository.count());
        return ResponseEntity.ok(m);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> categories() {
        return ResponseEntity.ok(cardService.categorias());
    }
}
