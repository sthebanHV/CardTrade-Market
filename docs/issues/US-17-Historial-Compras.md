# [US-17] Historial de Compras

**Epic:** Historial y Seguimiento
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** comprador,
**quiero** ver un registro de todas mis compras con sus detalles,
**para** llevar control de mis gastos y revisar transacciones anteriores.

---

## Criterios de Aceptance

- [ ] Lista de todas las compras realizadas
- [ ] Cada compra muestra: fecha, artículos, monto total, estado, vendedor
- [ ] Filtro por estado: Todas, Completadas, Pendientes, Canceladas
- [ ] Ordenar por: fecha (más reciente primero), monto
- [ ] Ver detalle de cada compra
- [ ] Opción de calificar al vendedor (si no se ha hecho)
- [ ] Paginación de resultados
- [ ] Exportar historial (CSV/PDF) (opcional)

---

## Wireframe - Historial de Compras

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [Mi Perfil] [≡]  |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  HISTORIAL DE COMPRAS                                | |
|  |                                                     | |
|  |  Filtros: [Todas ▼]  Ordenar: [Más reciente ▼]    | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  Orden #CTM-2024-001                    $78.99      | |
|  |  25 de Enero, 2024  |  ✅ Completada                | |
|  |                                                     | |
|  |  +------+  Charizard ex Full Art          $45.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  +------+  Pikachu Full Art               $28.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  Vendedor: CardMaster_MX  [Ver perfil]              | |
|  |  [Ver detalles]  [⭐ Calificar vendedor]             | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  Orden #CTM-2024-002                    $120.00     | |
|  |  20 de Enero, 2024  |  ✅ Completada                | |
|  |                                                     | |
|  |  +------+  Blue-Eyes White Dragon        $120.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  Vendedor: YuGiCollector  [Ver perfil]              | |
|  |  [Ver detalles]  [⭐ Calificar vendedor]             | |
|  +----------------------------------------------------+ |
|                                                          |
|  [< 1 2 >]                                              |
+----------------------------------------------------------+
```

---

## Wireframe - Detalle de Compra

```
+----------------------------------------------------------+
|  DETALLE DE ORDEN #CTM-2024-001                    [X]   |
+----------------------------------------------------------+
|                                                          |
|  Fecha: 25 de Enero, 2024                                |
|  Estado: ✅ Completada                                   |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ARTÍCULOS                                           | |
|  |                                                     | |
|  |  +------+  Charizard ex Full Art          $45.00    | |
|  |  | [img]|  Ultra Rare | Nuevo (NM)                   | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  +------+  Pikachu Full Art               $28.00    | |
|  |  | [img]|  Rare | Nuevo (NM)                         | |
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
|  |  +--------+ CardMaster_MX                           | |
|  |  | Avatar | ★★★★☆ (4.2)                            | |
|  |  +--------+ [Enviar mensaje]  [Ver perfil]          | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ENVÍO                                              | |
|  |  📍 Av. Reforma 123, Col. Centro, CDMX 06000        | |
|  +----------------------------------------------------+ |
|                                                          |
|  [Cerrar]                                                |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/purchase-history`
- **Componentes:** `PurchaseHistory`, `OrderCard`, `OrderDetailModal`
- **Endpoints:**
  - `GET /api/orders/buyer` - Historial de compras
  - `GET /api/orders/:id` - Detalle de orden
