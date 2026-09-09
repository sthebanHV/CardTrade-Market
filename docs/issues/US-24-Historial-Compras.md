# [US-24] Historial de Compras

**Epic:** Historial y Seguimiento
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** comprador,
**quiero** ver un registro de todas mis compras,
**para** llevar control de mis gastos, dar seguimiento a pedidos y revisar transacciones anteriores.

---

## Criterios de Aceptación

1. Se muestra una lista cronológica de todas las compras realizadas por el usuario.
2. Cada entrada en la lista muestra: fecha de compra, cantidad de artículos, monto total, estado del pedido y nombre del vendedor.
3. Los estados disponibles son: Todas, Completadas, Pendientes, Enviadas, Canceladas, Reembolsadas.
4. Se incluyen filtros por estado: pestañas o dropdown que permite filtrar por cada estado o ver todos.
5. Se puede ordenar por fecha (más reciente primero, más antiguo primero) y por monto (mayor a menor, menor a mayor).
6. Al hacer clic en una compra, se navega al detalle completo que incluye: artículos con imagen y datos, desglose de costos, dirección de envío, método de pago, estado actual con timeline de seguimiento.
7. Desde el detalle, se ofrece botón "Calificar Vendedor" si la compra está completada y aún no ha sido calificada.
8. Se muestra un indicador visual del estado: badge de color (verde completada, amarillo pendiente, azul enviada, rojo cancelada).
9. La paginación muestra 10 compras por página.
10. Opción de exportar historial a CSV con las mismas capacidades de la US-23.
11. Se muestra un resumen en la parte superior: total gastado, número de compras, gasto promedio.
12. Las compras pendientes muestran un botón "Rastrear Pedido" que muestra la información de envío.
13. Las compras canceladas muestran el motivo de cancelación si está disponible.

---

## Wireframe

### Desktop - Historial de Compras

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Cuenta > Historial de Compras                                         |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  RESUMEN DE COMPRAS                                                 | |
|  |                                                                     | |
|  |  Total Gastado        N° Compras      Gasto Promedio               | |
|  |  $8,245.00 MXN        12 compras      $687.08 MXN                  | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  Filtros: [Todas] [Completadas] [Pendientes] [Enviadas] [Canceladas]    |
|                                                                           |
|  Ordenar: [Más reciente ▼]                    [Exportar CSV]             |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  +---------------------------------------------------------------+ | |
|  |  |  #ORD-2026-78432                          09/09/2026          | | |
|  |  |                                                               | | |
|  |  |  3 artículos  |  $1,681.20  |  ✅ Completada                  | | |
|  |  |                                                               | | |
|  |  |  Vendedores: CardMasterMX, DuelStore, MagicEmporium           | | |
|  |  |                                                               | | |
|  |  |  [Ver Detalle]  [Calificar Vendedores]                        | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  +---------------------------------------------------------------+ | |
|  |  |  #ORD-2026-76891                          05/09/2026          | | |
|  |  |                                                               | | |
|  |  |  1 artículo   |  $45.00     |  🚚 Enviada                    | | |
|  |  |                                                               | | |
|  |  |  Vendedor: CardMasterMX                                       | | |
|  |  |                                                               | | |
|  |  |  [Ver Detalle]  [Rastrear Pedido]                             | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  +---------------------------------------------------------------+ | |
|  |  |  #ORD-2026-75234                          01/09/2026          | | |
|  |  |                                                               | | |
|  |  |  2 artículos  |  $320.00    |  ⏳ Pendiente                   | | |
|  |  |                                                               | | |
|  |  |  Vendedor: DuelStore                                          | | |
|  |  |                                                               | | |
|  |  |  [Ver Detalle]  [Rastrear Pedido]                             | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  +---------------------------------------------------------------+ | |
|  |  |  #ORD-2026-72100                          25/08/2026          | | |
|  |  |                                                               | | |
|  |  |  1 artículo   |  $120.00    |  ❌ Cancelada                   | | |
|  |  |                                                               | | |
|  |  |  Vendedor: MagicEmporium                                       | | |
|  |  |  Motivo: Artículo no disponible                                | | |
|  |  |                                                               | | |
|  |  |  [Ver Detalle]                                                | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  Mostrando 4 de 12 compras                     [< 1 2 >]          | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Detalle de Compra

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Cuenta > Historial > Orden #ORD-2026-78432                           |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ESTADO DEL PEDIDO                                                  | |
|  |                                                                     | |
|  |  ✅ Confirmado  →  📦 Preparando  →  🚚 Enviado  →  ✓ Entregado   | |
|  |     09/09          09/09              --             --             | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ARTÍCULOS                                                           | |
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
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------+  +--------------------------------------+ |
|  |  DIRECCIÓN DE ENVÍO       |  |  MÉTODO DE PAGO                      | |
|  |                           |  |                                      | |
|  |  Juan Pérez               |  |  Visa ****4242                       | |
|  |  Av. Revolución 1234      |  |  Expira: 12/27                       | |
|  |  Col. Centro              |  |  Aprobado: 09/09/2026               | |
|  |  CDMX, 06000              |  |                                      | |
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
|  [Volver al Historial]   [Calificar Vendedores]   [Contactar Soporte]   |
|                                                                           |
+===========================================================================+
```

### Mobile - Historial de Compras

```
+--------------------------+
|  ←   Historial Compras   |
+--------------------------+
|                          |
|  RESUMEN                |
|                          |
|  $8,245.00  12 compras  |
|  Promedio: $687.08      |
|                          |
+--------------------------+
|                          |
| [Todas][Comp][Pend][Env]|
|                          |
|  Ordenar: [Reciente ▼]  |
|  [Exportar CSV]          |
|                          |
+--------------------------+
|                          |
|  +--------------------+  |
|  | #ORD-78432         |  |
|  | 09/09/2026         |  |
|  | 3 arts | $1,681.20|  |
|  | ✅ Completada      |  |
|  |                    |  |
|  | [Ver Detalle]      |  |
|  | [Calificar]        |  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  | #ORD-76891         |  |
|  | 05/09/2026         |  |
|  | 1 art  | $45.00    |  |
|  | 🚚 Enviada         |  |
|  |                    |  |
|  | [Ver Detalle]      |  |
|  | [Rastrear]         |  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  | #ORD-75234         |  |
|  | 01/09/2026         |  |
|  | 2 arts | $320.00   |  |
|  | ⏳ Pendiente       |  |
|  |                    |  |
|  | [Ver Detalle]      |  |
|  | [Rastrear]         |  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  | #ORD-72100         |  |
|  | 25/08/2026         |  |
|  | 1 art  | $120.00   |  |
|  | ❌ Cancelada       |  |
|  | Motivo: No disp.   |  |
|  |                    |  |
|  | [Ver Detalle]      |  |
|  +--------------------+  |
|                          |
|  Mostrando 4 de 12      |
|  [< 1 2 >]              |
|                          |
+--------------------------+
```

### Mobile - Detalle de Compra

```
+--------------------------+
|  ← Orden #ORD-78432     |
+--------------------------+
|                          |
|  ESTADO                  |
|                          |
|  ✅ ── 📦 ── 🚚 ── ✓   |
|  Conf  Prep  Env  Entr  |
|  09/09 09/09  --   --   |
|                          |
+--------------------------+
|                          |
|  ARTÍCULOS               |
|                          |
|  +----+ Charizard VMAX  |
|  |IMG | Ultra R | NM   |
|  +----+ x2 | $150.00   |
|  CardMasterMX ⭐ 4.8    |
|                          |
|  +----+ Blue-Eyes WD    |
|  |IMG | Rara | LP      |
|  +----+ x1 | $85.00    |
|  DuelStore ⭐ 4.6       |
|                          |
|  +----+ Black Lotus     |
|  |IMG | Mythic | GD    |
|  +----+ x1 | $1,200.00 |
|  MagicEmporium ⭐ 4.9   |
|                          |
+--------------------------+
|                          |
|  ENVÍO A                 |
|                          |
|  Juan Pérez              |
|  Av. Revolución 1234     |
|  CDMX, 06000             |
|  55-1234-5678            |
|                          |
+--------------------------+
|                          |
|  PAGO                    |
|                          |
|  Visa ****4242           |
|  Exp: 12/27              |
|  Aprobado: 09/09/2026   |
|                          |
+--------------------------+
|                          |
|  RESUMEN                 |
|                          |
|  Subtotal:    $1,435.00 |
|  Envío:         $15.00  |
|  Impuestos:    $231.20  |
|  ─────────────────────  |
|  TOTAL:       $1,681.20 |
|                          |
+--------------------------+
|                          |
|  [Calificar Vendedores]  |
|  [Contactar Soporte]     |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|                         +--------+                                        |
|                         |  📋    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    No tienes compras registradas                          |
|                                                                           |
|              Cuando realices tu primera compra,                          |
|              aparecerá aquí con todos los detalles.                       |
|                                                                           |
|                    [Explorar Marketplace]                                 |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  NO SE ENCONTRARON COMPRAS                                       | |
|  |                                                                     | |
|  |  No hay compras que coincidan con el filtro seleccionado.           | |
|  |                                                                     | |
|  |  [Ver Todas las Compras]                                            | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  🚚 SEGUIMIENTO DE ENVÍO                                            | |
|  |                                                                     | |
|  |  Orden: #ORD-2026-76891                                             | |
|  |  Estado: En Tránsito                                                | |
|  |                                                                     | |
|  |  09/09 10:30 - Paquete despachado desde almacén                     | |
|  |  09/09 14:15 - En tránsito a CDMX                                  | |
|  |  09/09 18:00 - Llegó a centro de distribución                       | |
|  |                                                                     | |
|  |  Estimado de entrega: 11/09/2026                                   | |
|  |                                                                     | |
|  |  [Cerrar]                                                           | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /account/orders, /account/orders/:orderId
- **Componentes:** OrderHistoryList, OrderHistoryItem, OrderDetail, OrderTimeline, OrderFilters, OrderSummary, TrackingModal, RatingButton, ExportHistoryButton
- **Endpoints:**
  - GET /api/orders - Obtener historial de compras del usuario (con filtros, paginación)
  - GET /api/orders/:orderId - Obtener detalle de una orden
  - GET /api/orders/:orderId/tracking - Obtener información de seguimiento
  - POST /api/orders/:orderId/rate - Enviar calificación de vendedor
  - POST /api/orders/export - Exportar historial a CSV
