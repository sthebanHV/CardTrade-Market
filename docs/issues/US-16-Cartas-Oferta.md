# [US-16] Cartas en Oferta

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Porcentaje de descuento ajustable
- **Valioso**: Atrae compradores buscando ofertas
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar que solo se muestran cartas con descuento

---

## Historia de Usuario

**Como** comprador buscando ofertas,
**quiero** ver las cartas que tienen descuento,
**para** ahorrar dinero en mis compras.

---

## Criterios de Aceptación

1. Mostrar cartas con precio rebajado (precio original tachado)
2. Mostrar el porcentaje de descuento
3. Filtrar automáticamente cartas en oferta
4. Se puede ordenar por mayor descuento
5. Mostrar tiempo restante de la oferta si tiene fecha de expiración

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  🏷️  OFERTAS ESPECIALES                                  |
|                                                          |
|  +----------------------------------------------------+ |
|  |  +--------+  +--------+  +--------+  +--------+   | |
|  |  | [img]  |  | [img]  |  | [img]  |  | [img]  |   | |
|  |  | Chariz |  | Pikach |  | Lugia  |  | Mewtwo |   | |
|  |  | -30%   |  | -25%   |  | -40%   |  | -20%   |   | |
|  |  |        |  |        |  |        |  |        |   | |
|  |  | ~~$45~~|  | ~~$28~~|  | ~~$85~~|  | ~~$50~~|   | |
|  |  | $31.50 |  | $21.00 |  | $51.00 |  | $40.00 |   | |
|  |  +--------+  +--------+  +--------+  +--------+   | |
|  +----------------------------------------------------+ |
|                                                          |
|  Oferta termina en: 2 días 14:32:15                      |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/cards/offers`
- **Componentes**: `OfferCard`, `OfferCountdown`
- **Endpoints**:
  - `GET /api/cards/offers` - Cartas en oferta
- **Campos**: `originalPrice`, `discountPercent`, `offerEndsAt`
