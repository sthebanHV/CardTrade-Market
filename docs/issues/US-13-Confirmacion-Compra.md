# [US-13] Confirmación de Compra

**Epic:** Proceso de Compra
**Prioridad:** Alta
**Estimación:** 3 puntos

---

## Historia de Usuario

**Como** comprador,
**quiero** recibir una confirmación detallada de mi compra con el número de orden,
**para** tener registro de la transacción y poder contactar al vendedor.

---

## Criterios de Aceptance

- [ ] Se muestra número de orden único
- [ ] Resumen de la compra: artículos, cantidades, total
- [ ] Datos del vendedor para contacto
- [ ] Instrucciones de envío/entrega
- [ ] Opción de calificar al vendedor
- [ ] Botón para ver detalle de la orden
- [ ] Se envía email de confirmación
- [ ] La orden aparece en mi historial de compras

---

## Wireframe - Confirmación de Compra

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |              ✅ ¡COMPRA EXITOSA!                     | |
|  |                                                     | |
|  |  Orden #CTM-2024-001                                | |
|  |  Fecha: 25 de Enero, 2024                           | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  DETALLES DE LA ORDEN                                | |
|  |                                                     | |
|  |  +------+  Charizard ex Full Art         $45.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  +------+  Pikachu Full Art              $28.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  Subtotal:                                $73.00    | |
|  |  Envío:                                   $5.99     | |
|  |  TOTAL:                                   $78.99    | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  VENDEDOR                                           | |
|  |                                                     | |
|  |  +--------+  CardMaster_MX                          | |
|  |  | Avatar |  ★★★★☆ (4.2)                           | |
|  |  +--------+  [Enviar mensaje]                       | |
|  |                                                     | |
|  |  📧 cardmaster@email.com                            | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ENVÍO                                              | |
|  |                                                     | |
|  |  📍 Av. Reforma 123, Col. Centro, CDMX 06000        | |
|  |  📦 El vendedor se pondrá en contacto para          | |
|  |     coordinar el envío                               | |
|  |  📧 Recibirás un email con actualizaciones           | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  VALORAR AL VENDEDOR                                 | |
|  |                                                     | |
|  |  ¿Cómo fue tu experiencia?                          | |
|  |                                                     | |
|  |  ★ ★ ★ ★ ★                                         | |
|  |                                                     | |
|  |  [Dejar reseña]                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  +--------------------------+  +----------------------+ |
|  |   VER DETALLE DE ORDEN   |  |   VOLVER AL INICIO   | |
|  +--------------------------+  +----------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/order/:id/success` o `/confirmation/:orderId`
- **Componentes:** `OrderConfirmation`, `OrderSummary`, `SellerContact`, `RatingStars`
- **Endpoint:** `GET /api/orders/:id`
- **Email:** Nodemailer o servicio de email (SendGrid, Mailgun)
- **Número de orden:** Formato `CTM-YYYY-XXX`
