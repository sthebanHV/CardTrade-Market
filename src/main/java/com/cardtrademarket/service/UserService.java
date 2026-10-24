package com.cardtrademarket.service;

import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        user.setRole("ROLE_USER");
        user.setEmailVerified(false);
        user.setFechaCreacion(new java.util.Date());
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public User updateProfile(User userDetails) {
        if (userDetails.getId() == null) {
            throw new RuntimeException("ID de usuario requerido");
        }
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (userDetails.getNombre() != null) user.setNombre(userDetails.getNombre());
        if (userDetails.getEmail() != null) user.setEmail(userDetails.getEmail());
        if (userDetails.getPasswordHash() != null && !userDetails.getPasswordHash().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(userDetails.getPasswordHash()));
        }
        return userRepository.save(user);
    }

    public java.util.Map<String, Object> getDashboardData(String username) {
        User user = findByUsername(username);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        java.util.Map<String, Object> data = new java.util.HashMap<>();
        data.put("username", user.getUsername());
        data.put("nombre", user.getNombre());
        data.put("email", user.getEmail());
        data.put("role", user.getRole());
        data.put("rating", user.getRating());
        data.put("fechaCreacion", user.getFechaCreacion());
        return data;
    }
}