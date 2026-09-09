# [US-18] Confirmación de Compra

**Epic:** Proceso de Compra
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Descripción

**Como** comprador,
**quiero** recibir una confirmación detallada de mi compra,
**para** tener registro completo de la transacción y dar seguimiento a mi pedido.

---

## Criterios de Aceptación

1. Se muestra un número de orden único con formato #ORD-YYYY-XXXXX (año + secuencia).
2. Se presenta un resumen completo de la compra: lista de artículos con imagen, nombre, cantidad y precio individual.
3. Se muestra el desglose de costos: subtotal, envío, impuestos y total pagado.
4. Se incluyen los datos del vendedor para cada artículo: nombre, calificación y enlace al perfil.
5. Se muestran las instrucciones de envío: dirección de entrega, método de envío y tiempo estimado de llegada.
6. Se incluye el método de pago utilizado (tarjeta enmascarada con últimos 4 dígitos).
7. Se ofrece botón "Calificar Vendedor" que redirige al formulario de calificación.
8. Se incluye botón "Ver Detalle de Orden" que navega al detalle completo de la orden.
9. Se envía automáticamente un email de confirmación con todos los detalles de la compra.
10. La orden aparece inmediatamente en la sección "Historial de Compras" del usuario.
11. Se muestra un botón "Seguir Comprando" que redirige al marketplace.
12. El diseño incluye animación de éxito (checkmark animado) al cargar la página.
13. La información se mantiene visible y accesible mientras el usuario no cierre la sesión.

---

## Wireframe

### Desktop - Confirmación de Compra

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|                                                                           |
|                        +----------------------+                           |
|                        |    ✓  ¡Pedido        |                           |
|                        |    Confirmado!       |                           |
|                        +----------------------+                           |
|                                                                           |
|           Gracias por tu compra, Juan. Tu pedido está                    |
|           siendo procesado y recibirás un email de                        |
|           confirmación en breve.                                          |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  Orden #ORD-2026-78432                        Fecha: 09/09/2026          |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ARTÍCULOS DEL PEDIDO                                               | |
|  |                                                                     | |
|  |  +--------+  Pokémon TCG - Charizard VMAX (Shining Fates)          | |
|  |  |  IMG   |  Rareza: Ultra Rara  |  Estado: NM  |  x2   $150.00   | |
|  |  +--------+  Vendido por: CardMasterMX ⭐ 4.8                       | |
|  |                                                                     | |
|  |  +--------+  Yu-Gi-Oh! - Blue-Eyes White Dragon (LOB)             | |
|  |  |  IMG   |  Rareza: Rara  |  Estado: LP  |  x1   $85.00          | |
|  |  +--------+  Vendido por: DuelStore ⭐ 4.6                          | |
|  |                                                                     | |
|  |  +--------+  MTG - Black Lotus (Alpha)                             | |
|  |  |  IMG   |  Rareza: Mythic  |  Estado: GD  |  x1   $1,200.00    | |
|  |  +--------+  Vendido por: MagicEmporium ⭐ 4.9                      | |
|  |                                                                     | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------+  +--------------------------------------+ |
|  |  DIRECCIÓN DE ENVÍO       |  |  MÉTODO DE PAGO                      | |
|  |                           |  |                                      | |
|  |  Juan Pérez               |  |  Visa ****4242                       | |
|  |  Av. Revolución 1234      |  |  Expira: 12/27                       | |
|  |  Col. Centro              |  |                                      | |
|  |  Ciudad de México, CDMX   |  |                                      | |
|  |  CP: 06000                |  |                                      | |
|  |  Tel: 55-1234-5678       |  |                                      | |
|  +---------------------------+  +--------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------+       |
|  |  RESUMEN DE PAGO                                              |       |
|  |                                                               |       |
|  |  Subtotal (4 artículos):               $1,435.00             |       |
|  |  Envío (Estándar 5-7 días):            $15.00                |       |
|  |  Impuestos (16%):                      $231.20               |       |
|  |  ─────────────────────────────────────────────────            |       |
|  |  TOTAL PAGADO:                         $1,681.20             |       |
|  +---------------------------------------------------------------+       |
|                                                                           |
|  +---------------------------------------------------------------+       |
|  |  INSTRUCCIONES DE ENVÍO                                       |       |
|  |                                                               |       |
|  |  Método: Envío Estándar                                       | |
|  |  Tiempo estimado: 5-7 días hábiles                            | |
|  |  Número de rastreo: Se enviará por email cuando               | |
|  |                     el paquete sea despachado                  | |
|  +---------------------------------------------------------------+       |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  SIGUIENTE PASO                                                     | |
|  |                                                                     | |
|  |  Recibirás un email de confirmación con todos los detalles.         | |
|  |  También puedes dar seguimiento desde tu historial de compras.      | |
|  |                                                                     | |
|  |  [Calificar Vendedores]  [Ver Detalle de Orden]  [Seguir Comprando]| |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Mobile - Confirmación de Compra

```
+--------------------------+
|  ←   ¡Pedido Confirmado! |
+--------------------------+
|                          |
|       +--------+         |
|       |   ✓    |         |
|       +--------+         |
|                          |
|  Gracias por tu compra,  |
|  Juan.                   |
|                          |
|  Orden: #ORD-2026-78432  |
|  Fecha: 09/09/2026       |
|                          |
+--------------------------+
|  ARTÍCULOS               |
|                          |
|  +----+ Charizard VMAX   |
|  |IMG | x2     $150.00  |
|  +----+ CardMasterMX     |
|                          |
|  +----+ Blue-Eyes Dragon |
|  |IMG | x1      $85.00  |
|  +----+ DuelStore        |
|                          |
|  +----+ Black Lotus      |
|  |IMG | x1   $1,200.00  |
|  +----+ MagicEmporium    |
|                          |
+--------------------------+
|  ENVÍO A                 |
|                          |
|  Juan Pérez              |
|  Av. Revolución 1234     |
|  CDMX, 06000             |
|  Tel: 55-1234-5678      |
|                          |
+--------------------------+
|  PAGO                    |
|                          |
|  Visa ****4242           |
|  Exp: 12/27              |
|                          |
+--------------------------+
|  RESUMEN                 |
|                          |
|  Subtotal:    $1,435.00 |
|  Envío:         $15.00  |
|  Impuestos:    $231.20  |
|  ─────────────────────  |
|  TOTAL:       $1,681.20 |
|                          |
+--------------------------+
|  [Calificar Vendedores]  |
|  [Ver Detalle de Orden]  |
|  [Seguir Comprando]      |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|                         +--------+                                        |
|                         |  ✗     |                                        |
|                         +--------+                                        |
|                                                                           |
|                    No se pudo cargar la confirmación                      |
|                                                                           |
|  No pudimos obtener los detalles de tu orden. Por favor                   |
|  revisa tu email de confirmación o contacta soporte.                      |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  Código de error: PAYMENT_TIMEOUT                                   | |
|  |  Si el cargo fue realizado, contacta soporte con tu número          | |
|  |  de transacción.                                                    | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|           [Reintentar]     [Contactar Soporte]     [Volver al Inicio]    |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|                    PROCESANDO TU PAGO...                                  |
|                                                                           |
|                         +--------+                                        |
|                         | ⟳     |                                        |
|                         +--------+                                        |
|                                                                           |
|              Por favor no cierres esta ventana.                           |
|              Esto puede tomar unos segundos.                              |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /checkout/confirmation/:orderId
- **Componentes:** OrderConfirmation, SuccessAnimation, ArticleList, SellerInfo, ShippingDetails, PaymentSummary, RatingButton
- **Endpoints:**
  - GET /api/orders/:orderId - Obtener detalles de la orden confirmada
  - POST /api/orders/:orderId/rate - Enviar calificación de vendedor
  - POST /api/notifications/send-confirmation - Enviar email de confirmación
  - GET /api/users/me/orders - Obtener historial de compras del usuario
