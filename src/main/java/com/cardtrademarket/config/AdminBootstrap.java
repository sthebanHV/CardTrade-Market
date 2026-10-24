package com.cardtrademarket.config;

import com.cardtrademarket.model.User;
import com.cardtrademarket.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminBootstrap implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrap.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${ADMIN_EMAIL:}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD:}")
    private String adminPassword;

    @Override
    public void run(ApplicationArguments args) {
        if (adminEmail == null || adminEmail.isBlank()) {
            return;
        }
        if (userRepository.findByEmail(adminEmail).isPresent()) {
            return;
        }
        if (adminPassword == null || adminPassword.length() < 8) {
            log.warn("ADMIN_PASSWORD no definido o demasiado corto (min 8); no se crea admin");
            return;
        }
        User admin = new User();
        admin.setNombre("Administrador");
        admin.setEmail(adminEmail);
        admin.setUsername(adminEmail.split("@")[0]);
        admin.setPasswordHash(passwordEncoder.encode(adminPassword));
        admin.setRole("ROLE_ADMIN");
        admin.setEmailVerified(true);
        admin.setFechaCreacion(new java.util.Date());
        userRepository.save(admin);
        log.info("Administrador inicial creado: {}", adminEmail);
    }
}
