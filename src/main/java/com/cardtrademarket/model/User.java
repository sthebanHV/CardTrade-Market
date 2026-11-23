package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Collection;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;

    private String nombre;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String username;
    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    private String passwordHash;
    private String role;
    private String status; // ACTIVO, SUSPENDIDO
    private Double rating;
    private boolean emailVerified;

    private String bio;

    private String avatarUrl;

    private String pendingEmail;

    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    private String resetToken;

    private Date resetTokenExpiry;

    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    private String verifyToken;

    private Date verifyTokenExpiry;

    private Integer failedAttempts = 0;

    private Date lockedUntil;

    private Boolean tfaEnabled = false;

    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    private String tfaSecret;

    @com.fasterxml.jackson.annotation.JsonProperty(access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY)
    private String tfaBackupCodes;

    private Date fechaUltimoCambioPassword;

    private Date fechaCreacion;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String rol = (role == null || role.isBlank()) ? "ROLE_USER" : role;
        return java.util.Collections.singletonList(
                new org.springframework.security.core.authority.SimpleGrantedAuthority(rol));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return status == null || "ACTIVO".equals(status);
    }
}
