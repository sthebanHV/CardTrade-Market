# [US-35] Historial de Ventas

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Métricas mostradas ajustables
- **Valioso**: Permite llevar control de ingresos por ventas
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que se muestran todas las ventas

---

## Historia de Usuario

**Como** vendedor,
**quiero** ver todas mis ventas con montos y fechas,
**para** llevar un control de mis ingresos.

---

## Criterios de Aceptación

1. Lista cronológica de todas las ventas
2. Filtros por fecha y estado
3. Monto total de ventas en el período seleccionado
4. Detalle de cada venta: comprador, artículos, monto
5. Descargar reporte de ventas
6. Ver si el pago fue recibido

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  HISTORIAL DE VENTAS (56 ventas)                    | |
|  |                                                     | |
|  |  Filtrar: [Todas ▼]  Período: [Este Mes ▼]          | |
|  |                                                     | |
|  |  RESUMEN DEL PERÍODO                                | |
|  |  +-----------------------------------------------+  | |
|  |  |  💰 Ventas Totales: $4,250.00 USD             |  | |
|  |  |  📦 Órdenes: 56  |  📊 Promedio: $75.89       |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +------------------------------------------------+ | |
|  |  |  #CTM-2026-001234  |  09/09/2026  | Pagado    | | |
|  |  |  Comprador: user123                               | | |
|  |  |  Charizard ex, Pikachu VMAX                     | | |
|  |  |  Monto: $78.99 USD                              | | |
|  |  |  [Ver Detalle]                                  | | |
|  |  +------------------------------------------------+ | |
|  |                                                     | |
|  |  +------------------------------------------------+ | |
|  |  |  #CTM-2026-001189  |  05/09/2026  | Pagado    | | |
|  |  |  Comprador: collector99                             | | |
|  |  |  Blue-Eyes White Dragon                         | | |
|  |  |  Monto: $125.99 USD                             | | |
|  |  |  [Ver Detalle]                                  | | |
|  |  +------------------------------------------------+ | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/my-sales`
- **Componentes**: `SalesHistory`, `SalesCard`, `SalesSummary`
- **Endpoints**:
  - `GET /api/orders/sales` - Obtener historial de ventas
- **Reportes**: Generar CSV/PDF de ventas
