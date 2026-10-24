package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nombre;
    private String email;
    private String username;
    private String passwordHash;
    private String role;
    private Double rating;
    private boolean emailVerified;

    @Temporal(TemporalType.TIMESTAMP)
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
        return true;
    }
}
