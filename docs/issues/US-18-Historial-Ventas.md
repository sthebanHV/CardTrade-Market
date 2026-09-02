# [US-18] Historial de Ventas

**Epic:** Historial y Seguimiento
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** vendedor,
**quiero** ver un registro de todas mis ventas realizadas,
**para** llevar control de mis ingresos y el rendimiento de mis publicaciones.

---

## Criterios de Aceptance

- [ ] Lista de todas las ventas realizadas
- [ ] Cada venta muestra: fecha, artículos, monto total, estado, comprador
- [ ] Filtro por estado: Todas, Completadas, Pendientes, Canceladas
- [ ] Ordenar por: fecha (más reciente primero), monto
- [ ] Ver detalle de cada venta
- [ ] Estadísticas: total de ingresos, ventas este mes, promedio
- [ ] Paginación de resultados

---

## Wireframe - Historial de Ventas

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [Mi Perfil] [≡]  |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  HISTORIAL DE VENTAS                                 | |
|  |                                                     | |
|  |  Filtros: [Todas ▼]  Ordenar: [Más reciente ▼]    | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ESTADÍSTICAS RÁPIDAS                               | |
|  |                                                     | |
|  |  💰 Total ingresos: $534.00  |  📊 Ventas: 8        | |
|  |  📈 Este mes: $120.00       |  📅 Promedio: $66.75  | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  Orden #CTM-2024-003                    $45.00      | |
|  |  25 de Enero, 2024  |  ✅ Completada                | |
|  |                                                     | |
|  |  +------+  Charizard ex Full Art          $45.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  Comprador: CardFan99                               | |
|  |  [Ver detalles]  [Ver comprador]                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  Orden #CTM-2024-004                    $89.00      | |
|  |  22 de Enero, 2024  |  ✅ Completada                | |
|  |                                                     | |
|  |  +------+  Mewtwo Base Set               $89.00    | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  Comprador: CollectorPro                            | |
|  |  [Ver detalles]  [Ver comprador]                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  [< 1 2 >]                                              |
+----------------------------------------------------------+
```

---

## Wireframe - Estadísticas de Ventas

```
+----------------------------------------------------------+
|  ESTADÍSTICAS DE VENTAS                                  |
+----------------------------------------------------------+
|                                                          |
|  +------------------+  +------------------+             |
|  | 💰 INGRESOS      |  | 📊 VENTAS        |             |
|  | TOTALES           |  | TOTALES          |             |
|  | $534.00          |  | 8                |             |
|  +------------------+  +------------------+             |
|                                                          |
|  +------------------+  +------------------+             |
|  | 📈 ESTE MES      |  | 📅 PROMEDIO      |             |
|  | $120.00          |  | $66.75/venta     |             |
|  +------------------+  +------------------+             |
|                                                          |
|  +----------------------------------------------------+ |
|  |  VENTAS POR MES (Últimos 6 meses)                   | |
|  |                                                     | |
|  |  Nov  ████████           $180                       | |
|  |  Dic  ██████████████     $280                       | |
|  |  Ene  ████████           $120                       | |
|  |  Feb  ████               $60                        | |
|  |  Mar  ████               $54                        | |
|  |  Abr  (pendiente)                                   | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/sales-history`
- **Componentes:** `SalesHistory`, `SaleCard`, `SalesStats`, `SalesChart`
- **Endpoints:**
  - `GET /api/orders/seller` - Historial de ventas
  - `GET /api/orders/seller/stats` - Estadísticas de ventas
