# [US-14] Comparar Cartas

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Cantidad de cartas a comparar
- **Valioso**: Ayuda al usuario a decidir entre opciones similares
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación manejable
- **Testable**: Verificar comparación lado a lado

---

## Historia de Usuario

**Como** comprador indeciso,
**quiero** comparar hasta 3 cartas lado a lado,
**para** ver las diferencias y tomar la mejor decisión.

---

## Criterios de Aceptación

1. Se puede seleccionar hasta 3 cartas para comparar
2. Se muestra una tabla comparativa con todas las características
3. Se resaltan las diferencias entre cartas
4. Se puede agregar directamente al carrito desde la comparación
5. Se puede eliminar cartas de la comparación
6. La comparación debe funcionar solo para cartas del mismo juego

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  COMPARAR CARTAS (3 seleccionadas)                       |
|                                                          |
|  +-------------+ +-------------+ +-------------+         |
|  | [img]       | | [img]       | | [img]       |         |
|  | Charizard   | | Charizard   | | Charizard   |         |
|  | ex Full ART | | VMAX        | | GX          |         |
|  | [x Quitar]  | | [x Quitar]  | | [x Quitar]  |         |
|  +-------------+ +-------------+ +-------------+         |
|                                                          |
|  CARACTERÍSTICA        | Carta 1    | Carta 2    | Carta 3 |
|  ─────────────────────┼────────────┼────────────┼─────────|
|  Juego                | Pokémon    | Pokémon    | Pokémon  |
|  Rareza               | Ultra Rare | Secret     | Rare Holo|
|  Set                  | Evolving   | Vivid      | XY       |
|  Estado               | NM         | LP         | NM       |
|  Precio               | $45.00     | $38.00     | $52.00   |
|  Vendedor             | CardMaster | PikachuFan | TCG_M    |
|  Rating Vendedor      | ⭐ 4.8     | ⭐ 4.5     | ⭐ 4.9   |
|  ─────────────────────┼────────────┼────────────┼─────────|
|                       | [Comprar]  | [Comprar]  | [Comprar]|
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/compare?ids=1,2,3`
- **Componentes**: `ComparisonTable`, `ComparisonCard`, `AddToCompare`
- **Endpoints**:
  - `GET /api/cards/compare?ids=...` - Obtener datos para comparar
- **State**: Guardar selección en localStorage
- **UX**: Botón flotante "Comparar (2)" cuando se seleccionan cartas
