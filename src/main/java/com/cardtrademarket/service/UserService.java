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

    @Autowired
    private com.cardtrademarket.repository.CardRepository cardRepository;

    @Autowired
    private com.cardtrademarket.repository.ProfileChangeRepository profileChangeRepository;

    public java.util.Optional<java.util.Map<String, Object>> getPublicProfile(String id) {
        return userRepository.findById(id).map(u -> {
            java.util.Map<String, Object> m = new java.util.LinkedHashMap<>();
            m.put("id", u.getId());
            m.put("username", u.getUsername());
            m.put("nombre", u.getNombre());
            m.put("rating", u.getRating() != null ? u.getRating() : 0.0);
            m.put("fechaCreacion", u.getFechaCreacion());
            long ventas = cardRepository.findByVendedorIdOrderByFechaPublicacionDesc(id).stream()
                    .filter(c -> c.getStatus() == com.cardtrademarket.model.Card.Status.VENDIDO)
                    .count();
            m.put("ventas", ventas);
            return m;
        });
    }

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

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User findByResetToken(String token) {
        return userRepository.findByResetToken(token).orElse(null);
    }

    public User findByVerifyToken(String token) {
        return userRepository.findByVerifyToken(token).orElse(null);
    }

    public User guardar(User user) {
        return userRepository.save(user);
    }

    public String encode(String raw) {
        return passwordEncoder.encode(raw);
    }

    public java.util.List<com.cardtrademarket.model.ProfileChange> historialCambios(String userId) {
        return profileChangeRepository.findTop20ByUserIdOrderByFechaDesc(userId);
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

        if (userDetails.getNombre() != null && !userDetails.getNombre().equals(user.getNombre())) {
            registrarCambio(user, "nombre", user.getNombre(), userDetails.getNombre());
            user.setNombre(userDetails.getNombre());
        }
        if (userDetails.getUsername() != null && !userDetails.getUsername().equals(user.getUsername())) {
            if (userRepository.findByUsername(userDetails.getUsername()).isPresent()) {
                throw new RuntimeException("El nombre de usuario ya está en uso");
            }
            registrarCambio(user, "username", user.getUsername(), userDetails.getUsername());
            user.setUsername(userDetails.getUsername());
        }
        if (userDetails.getEmail() != null
                && !userDetails.getEmail().equalsIgnoreCase(user.getEmail())) {
            if (userRepository.findByEmail(userDetails.getEmail().toLowerCase()).isPresent()) {
                throw new RuntimeException("El correo electrónico ya está registrado");
            }
            registrarCambio(user, "email", user.getEmail(), userDetails.getEmail());
            user.setPendingEmail(userDetails.getEmail().toLowerCase());
            String token = java.util.UUID.randomUUID().toString().replace("-", "");
            user.setVerifyToken(token);
            user.setVerifyTokenExpiry(new java.util.Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000L));
            user.setEmailVerified(false);
        }
        if (userDetails.getBio() != null) {
            String bio = userDetails.getBio().length() > 500
                    ? userDetails.getBio().substring(0, 500) : userDetails.getBio();
            if (!bio.equals(user.getBio())) {
                registrarCambio(user, "bio", user.getBio(), bio);
            }
            user.setBio(bio);
        }
        if (userDetails.getPasswordHash() != null && !userDetails.getPasswordHash().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(userDetails.getPasswordHash()));
            user.setFechaUltimoCambioPassword(new java.util.Date());
        }
        return userRepository.save(user);
    }

    public User actualizarAvatar(String userId, String dataUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        registrarCambio(user, "avatar", "foto anterior", "nueva foto");
        user.setAvatarUrl(dataUrl);
        return userRepository.save(user);
    }

    private void registrarCambio(User user, String campo, String anterior, String nuevo) {
        com.cardtrademarket.model.ProfileChange change = new com.cardtrademarket.model.ProfileChange();
        change.setUserId(user.getId());
        change.setCampo(campo);
        change.setValorAnterior(anterior != null && anterior.length() > 100 ? anterior.substring(0, 100) : anterior);
        change.setValorNuevo(nuevo != null && nuevo.length() > 100 ? nuevo.substring(0, 100) : nuevo);
        change.setFecha(new java.util.Date());
        profileChangeRepository.save(change);
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