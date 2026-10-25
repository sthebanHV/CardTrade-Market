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
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "admin_id")
    private String adminId;

    @Column(name = "admin_username")
    private String adminUsername;

    @Column(name = "accion", length = 50)
    private String accion; // CAMBIAR_ROL, SUSPENDER_USUARIO, REACTIVAR_USUARIO, RESOLVER_REPORTE, OCULTAR_CARTA

    @Column(name = "objetivo_tipo", length = 30)
    private String objetivoTipo; // USER, REPORT, CARD

    @Column(name = "objetivo_id")
    private String objetivoId;

    @Column(name = "detalle", length = 500)
    private String detalle;

    @Temporal(TemporalType.TIMESTAMP)
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
