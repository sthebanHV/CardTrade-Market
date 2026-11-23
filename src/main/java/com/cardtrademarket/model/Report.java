package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.Date;

@Document(collection = "reports")
public class Report {

    public enum Motivo {
        FRAUDE, FALSO, PRECIO_ABUSIVO, DESCRIPCION_ENGANOSA, OTRO
    }

    @Id
    private String id;

    private String cardId;

    private String motivo; // Report.Motivo.name()

    private String detalles;

    private Date fecha;

    private String estado; // PENDIENTE, DESCARTADO, OCULTO, SUSPENDIDO, RESUELTO

    private Date fechaResolucion;

    private String adminId;

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
