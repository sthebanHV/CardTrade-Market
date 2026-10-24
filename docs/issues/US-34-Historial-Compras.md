# [US-34] Historial de Compras

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Información mostrada ajustable
- **Valioso**: Permite revisar compras anteriores
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que se muestran todas las compras

---

## Historia de Usuario

**Como** comprador,
**quiero** ver todo lo que he comprado con fechas y estados,
**para** llevar un registro de mis adquisiciones.

---

## Criterios de Aceptación

1. Lista cronológica de todas las compras
2. Filtros por fecha y estado
3. Detalle de cada compra: artículos, total, estado del envío
4. Opción de repetir una compra
5. Descargar factura de cada compra
6. Ver estado del envío actual

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  HISTORIAL DE COMPRAS (24 compras)                  | |
|  |                                                     | |
|  |  Filtrar: [Todas ▼]  Fecha: [Todos los tiempos ▼]   | |
|  |                                                     | |
|  |  +------------------------------------------------+ | |
|  |  |  #CTM-2026-001234  |  09/09/2026  | Entregado  | | |
|  |  |  Charizard ex, Pikachu VMAX                     | | |
|  |  |  Total: $78.99 USD                              | | |
|  |  |  [Ver Detalle] [Repetir Compra]                 | | |
|  |  +------------------------------------------------+ | |
|  |                                                     | |
|  |  +------------------------------------------------+ | |
|  |  |  #CTM-2026-001189  |  05/09/2026  | En Tránsito| | |
|  |  |  Blue-Eyes White Dragon                         | | |
|  |  |  Total: $125.99 USD                             | | |
|  |  |  [Ver Detalle] [Rastrear Envío]                 | | |
|  |  +------------------------------------------------+ | |
|  |                                                     | |
|  |  +------------------------------------------------+ | |
|  |  |  #CTM-2026-001156  |  01/09/2026  | Entregado  | | |
|  |  |  Lugia V Alternate Art                          | | |
|  |  |  Total: $63.99 USD                              | | |
|  |  |  [Ver Detalle] [Repetir Compra] [Dejar Reseña] | | |
|  |  +------------------------------------------------+ | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/my-purchases`
- **Componentes**: `PurchaseHistory`, `PurchaseCard`, `PurchaseFilters`
- **Endpoints**:
  - `GET /api/orders/purchases` - Obtener historial de compras
  - `GET /api/orders/:orderId` - Detalle de compra
