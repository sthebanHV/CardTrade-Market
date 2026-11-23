package com.cardtrademarket.model;


public class OrderItem {

    private String cardId;

    private String nombre;

    private Double precioUnitario;

    private String vendedorId;

    public OrderItem() {}

    public OrderItem(String cardId, String nombre, Double precioUnitario, String vendedorId) {
        this.cardId = cardId;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.vendedorId = vendedorId;
    }

    public String getCardId() { return cardId; }
    public void setCardId(String cardId) { this.cardId = cardId; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }
    public String getVendedorId() { return vendedorId; }
    public void setVendedorId(String vendedorId) { this.vendedorId = vendedorId; }
}
