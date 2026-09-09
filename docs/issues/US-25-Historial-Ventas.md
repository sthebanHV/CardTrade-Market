# [US-25] Historial de Ventas

**Epic:** Historial y Seguimiento
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** vendedor,
**quiero** ver un registro de todas mis ventas,
**para** llevar control de mis ingresos.

---

## Criterios de Aceptación

1. El sistema muestra una lista completa de todas las ventas realizadas por el vendedor, incluyendo fecha, artículos vendidos, monto total, estado de la transacción y datos del comprador.
2. El vendedor puede filtrar las ventas por estado: completadas, pendientes, canceladas y todas.
3. El vendedor puede ordenar las ventas por fecha (más reciente/antiguo) y por monto (mayor/menor).
4. Al hacer clic en una venta, se despliega el detalle completo: artículos, imágenes, precio unitario, precio total, fecha de compra, método de pago y datos del comprador.
5. Se muestra un resumen estadístico en la parte superior: total de ingresos acumulados, ventas del mes actual y promedio de venta.
6. La lista de ventas tiene paginación con 10 elementos por página.
7. En caso de no existen ventas, se muestra un estado vacío con mensaje descriptivo y enlace para publicar artículos.
8. El componente es responsive y se adapta a pantallas desktop, tablet y móvil.

---

## Wireframe

```
+------------------------------------------------------------------+
|  Historial de Ventas                              [Exportar CSV]  |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+  +------------------+  +------------------+|
|  | Ingresos Totales |  | Ventas este Mes  |  | Promedio Venta   ||
|  | $12,450.00       |  | 8 ventas         |  | $1,556.25        ||
|  +------------------+  +------------------+  +------------------+|
|                                                                  |
|  Filtrar: [Todas ▼]    Ordenar: [Fecha ↓ ▼]                     |
|                                                                  |
|  +------------------------------------------------------------------+
|  | #    | Fecha       | Artículo(s)        | Monto    | Estado  |  |
|  |------|-------------|--------------------|----------|---------|  |
|  | 001  | 08/09/2026  | Charizard Base Set  | $450.00  | ✓ Comp. |  |
|  | 002  | 07/09/2026  | Pikachu VMAX        | $120.00  | ✓ Comp. |  |
|  | 003  | 05/09/2026  | Lugia EX + 2 más    | $890.00  | Pend.   |  |
|  | 004  | 03/09/2026  | Mewtwo GX           | $320.00  | ✓ Comp. |  |
|  | 005  | 01/09/2026  | Rayquaza VMAX       | $780.00  | Cancel. |  |
|  +------------------------------------------------------------------+
|                                                                  |
|  Comprador: Juan Pérez           [Ver Detalle]                   |
|                                                                  |
|  ← Anterior  Página 1 de 4  Siguiente →                         |
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  Historial de Ventas   [≡]  |
+-----------------------------+
|                             |
|  Ingresos Totales           |
|  $12,450.00                 |
|                             |
|  Este mes: 8 ventas         |
|  Promedio: $1,556.25        |
|                             |
|  [Todas ▼] [Fecha ↓ ▼]     |
|                             |
|  +-------------------------+|
|  | #001 - 08/09/2026      ||
|  | Charizard Base Set      ||
|  | $450.00 - Completada   ||
|  | Comprador: Juan P.     ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | #002 - 07/09/2026      ||
|  | Pikachu VMAX            ||
|  | $120.00 - Completada   ||
|  | Comprador: Ana L.      ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | #003 - 05/09/2026      ||
|  | Lugia EX + 2 más        ||
|  | $890.00 - Pendiente    ||
|  | Comprador: Carlos M.   ||
|  +-------------------------+|
|                             |
|  ← 1 de 4 →                |
|                             |
+-----------------------------+
```

### Estado vacío/Error

```
+------------------------------------------------------------------+
|  Historial de Ventas                              [Exportar CSV]  |
+------------------------------------------------------------------+
|                                                                  |
|                      +------------------+                         |
|                      |                  |                         |
|                      |   (carrito       |                         |
|                      |    vacío)        |                         |
|                      |                  |                         |
|                      +------------------+                         |
|                                                                  |
|          Aún no tienes ventas registradas                        |
|                                                                  |
|    Cuando realices tu primera venta, aparecerá aquí              |
|    con todos los detalles y estadísticas.                        |
|                                                                  |
|              [  Publicar Artículos  ]                             |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /seller/history
- **Componentes:** SalesHistoryPage, SalesStatsCard, SalesTable, SalesFilter, SalesPagination, SalesDetailModal
- **Endpoints:** GET /api/sales?status={}&sort={}&order={}&page={}&limit=10, GET /api/sales/stats, GET /api/sales/{id}
