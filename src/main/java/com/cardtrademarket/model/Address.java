package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "nombre_completo")
    private String nombreCompleto;

    @Column(name = "linea1")
    private String linea1;

    @Column(name = "linea2")
    private String linea2;

    private String ciudad;

    private String estado;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    private String telefono;

    private boolean predeterminada;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Address() {
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getNombreCompleto() { return nombreCompleto; }
    public void setNombreCompleto(String nombreCompleto) { this.nombreCompleto = nombreCompleto; }
    public String getLinea1() { return linea1; }
    public void setLinea1(String linea1) { this.linea1 = linea1; }
    public String getLinea2() { return linea2; }
    public void setLinea2(String linea2) { this.linea2 = linea2; }
    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getCodigoPostal() { return codigoPostal; }
    public void setCodigoPostal(String codigoPostal) { this.codigoPostal = codigoPostal; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public boolean isPredeterminada() { return predeterminada; }
    public void setPredeterminada(boolean predeterminada) { this.predeterminada = predeterminada; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
