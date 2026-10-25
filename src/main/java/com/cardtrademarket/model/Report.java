package com.cardtrademarket.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "reports")
public class Report {

    public enum Motivo {
        FRAUDE, FALSO, PRECIO_ABUSIVO, DESCRIPCION_ENGANOSA, OTRO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "card_id")
    private String cardId;

    private String motivo; // Report.Motivo.name()

    @Column(length = 1000)
    private String detalles;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    private String estado; // PENDIENTE, DESCARTADO, OCULTO, SUSPENDIDO, RESUELTO

    @Column(name = "fecha_resolucion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaResolucion;

    @Column(name = "admin_id")
    private String adminId;

    @Column(name = "nota_resolucion", length = 500)
    private String notaResolucion;

    public Report() {
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCardId() { return cardId; }
    public void setCardId(String cardId) { this.cardId = cardId; }
    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
    public String getDetalles() { return detalles; }
    public void setDetalles(String detalles) { this.detalles = detalles; }
    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public Date getFechaResolucion() { return fechaResolucion; }
    public void setFechaResolucion(Date fechaResolucion) { this.fechaResolucion = fechaResolucion; }
    public String getAdminId() { return adminId; }
    public void setAdminId(String adminId) { this.adminId = adminId; }
    public String getNotaResolucion() { return notaResolucion; }
    public void setNotaResolucion(String notaResolucion) { this.notaResolucion = notaResolucion; }
}
