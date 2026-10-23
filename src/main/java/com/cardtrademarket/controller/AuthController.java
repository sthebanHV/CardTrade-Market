package com.cardtrademarket.controller;

import com.cardtrademarket.model.User;
import com.cardtrademarket.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User userRequest) {
        User user = userService.register(userRequest);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername());
        if (userService.verifyPassword(loginRequest.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.ok(jwtTokenProvider.generateToken(user.getUsername()));
        }
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // Lógica de logout - invalidar token
        return ResponseEntity.ok("Sesión cerrada");
    }
}