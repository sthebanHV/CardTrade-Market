package com.cardtrademarket.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.Date;

@Document(collection = "audit_logs")
public class AuditLog {

    @Id
    private String id;

    private String adminId;

    private String adminUsername;

    private String accion; // CAMBIAR_ROL, SUSPENDER_USUARIO, REACTIVAR_USUARIO, RESOLVER_REPORTE, OCULTAR_CARTA

    private String objetivoTipo; // USER, REPORT, CARD

    private String objetivoId;

    private String detalle;

    private Date fecha;

    public AuditLog() {
        this.fecha = new Date();
    }

    public AuditLog(String adminId, String adminUsername, String accion,
                    String objetivoTipo, String objetivoId, String detalle) {
        this();
        this.adminId = adminId;
        this.adminUsername = adminUsername;
        this.accion = accion;
        this.objetivoTipo = objetivoTipo;
        this.objetivoId = objetivoId;
        this.detalle = detalle;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAdminId() { return adminId; }
    public void setAdminId(String adminId) { this.adminId = adminId; }
    public String getAdminUsername() { return adminUsername; }
    public void setAdminUsername(String adminUsername) { this.adminUsername = adminUsername; }
    public String getAccion() { return accion; }
    public void setAccion(String accion) { this.accion = accion; }
    public String getObjetivoTipo() { return objetivoTipo; }
    public void setObjetivoTipo(String objetivoTipo) { this.objetivoTipo = objetivoTipo; }
    public String getObjetivoId() { return objetivoId; }
    public void setObjetivoId(String objetivoId) { this.objetivoId = objetivoId; }
    public String getDetalle() { return detalle; }
    public void setDetalle(String detalle) { this.detalle = detalle; }
    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }
}
