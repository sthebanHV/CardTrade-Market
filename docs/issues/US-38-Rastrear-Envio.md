# [US-38] Rastrear Envío

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Transportistas soportados
- **Valioso**: Da tranquilidad al comprador
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que se muestra el estado del envío

---

## Historia de Usuario

**Como** comprador,
**quiero** ver el estado de mi envío en tiempo real,
**para** saber cuándo llegará mi pedido.

---

## Criterios de Aceptación

1. Mostrar estado actual del envío
2. Timeline de eventos del envío
3. Transportista y número de tracking
4. Estimación de llegada
5. Notificación cuando el estado cambia

---

## Wireframe

```
+----------------------------------------------------------+
|  RASTREO DE ENVÍO - #CTM-2026-001234                     |
+----------------------------------------------------------+
|                                                          |
|  Transportista: Estafeta                                 |
|  Tracking: EFX123456789                                  |
|  Estimación de Llegada: 15 Septiembre 2026               |
|                                                          |
|  ESTADO ACTUAL: En Tránsito 🚚                           |
|                                                          |
|  Timeline:                                               |
|  ──────────────────────────────────────────────────────  |
|  ✓ 09/09 14:30 - Paquete recibido en almacén            |
|  ✓ 09/09 18:45 - Paquete en tránsito                    |
|  ◯ 10/09 --:-- - En ruta de entrega                      |
|  ◯ 11/09 --:-- - Entregado                               |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/my-purchases/:orderId`
- **Componentes**: `ShipmentTracker`, `TrackingTimeline`
- **Endpoints**:
  - `GET /api/orders/:orderId/tracking` - Obtener info de tracking
- **Integración**: APIs de transportistas (Estafeta, DHL, FedEx)
- **Webhooks**: Recibir actualizaciones de transportistas
