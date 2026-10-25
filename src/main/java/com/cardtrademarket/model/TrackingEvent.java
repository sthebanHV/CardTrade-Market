package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
public class TrackingEvent {

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "status")
    private String status;

    public TrackingEvent() {}

    public TrackingEvent(LocalDateTime fecha, String descripcion, String status) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.status = status;
    }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
