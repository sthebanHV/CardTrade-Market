# [US-25] Confirmación de Compra

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Información mostrada ajustable
- **Valioso**: Da tranquilidad al comprador
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que se muestra la confirmación correcta

---

## Historia de Usuario

**Como** comprador,
**quiero** recibir confirmación inmediata después de pagar,
**para** saber que mi compra fue procesada exitosamente.

---

## Criterios de Aceptación

1. Mostrar número de orden único
2. Resumen de la compra: artículos, total, dirección
3. Estado del pago: Aprobado ✓
4. Estimación de envío
5. Enviar email de confirmación
6. Botón para ver detalle de la orden
7. Botón para seguir comprando

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market                                |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  ✅ ¡COMPRA EXITOSA!                                 | |
|  |                                                     | |
|  |  Tu orden #CTM-2026-001234 ha sido procesada.       | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  RESUMEN DE LA ORDEN                                | |
|  |                                                     | |
|  |  Charizard ex Full ART                  $45.00      | |
|  |  PIKACHU FULL ART                       $28.00      | |
|  |  Envío                                  $5.99       | |
|  |  ──────────────────────────────────────             | |
|  |  TOTAL                                  $78.99      | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  Dirección de Envío:                                | |
|  |  Calle Principal 123, Col. Centro                   | |
|  |  CDMX, México 06000                                 | |
|  |                                                     | |
|  |  Estimación de Llegada: 15-17 Septiembre 2026       | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  [Ver Detalle de la Orden]                          | |
|  |  [Seguir Comprando]                                 | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  📧 Hemos enviado un email de confirmación a:            |
|  carlos@email.com                                        |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/order-confirmation/:orderId`
- **Componentes**: `OrderConfirmation`, `OrderSummary`
- **Endpoints**:
  - `GET /api/orders/:orderId` - Obtener detalle de orden
- **Email**: Enviar email de confirmación con SendGrid
