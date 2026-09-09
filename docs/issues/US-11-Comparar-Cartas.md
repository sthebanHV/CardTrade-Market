# [US-11] Comparar Cartas

**Epic:** Catálogo de Cartas
**Prioridad:** Baja
**Estimación:** 5 puntos

---

## Descripción

**Como** usuario del catálogo de cartas,
**quiero** comparar cartas lado a lado,
**para** evaluar opciones antes de comprar y elegir la mejor relación calidad-precio.

---

## Criterios de Aceptación

1. Existe un botón "Comparar" en cada tarjeta de carta del catálogo.
2. Al agregar una carta a comparación, se muestra un panel fijo en la parte inferior de la pantalla.
3. El panel de comparación permite agregar un máximo de 3 cartas simultáneamente.
4. Se muestra una tabla comparativa con los siguientes campos: nombre, tipo, edición, rareza, estado, precio y vendedor.
5. El usuario puede eliminar cartas de la comparación con un botón "X" en cada columna.
6. Si se intenta agregar una cuarta carta, se muestra un mensaje indicando el límite alcanzado.
7. En mobile, la tabla de comparación se desplaza horizontalmente.
8. El panel de comparación se cierra con un botón "Cerrar comparación".
9. La selección de cartas a comparar persiste al navegar entre páginas del catálogo.
10. Se resalta visualmente la carta con mejor precio en la columna de precio.

---

## Wireframe

### Desktop - Panel de Comparación

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Resultados: 247 cartas                    [ Comparando: 2/3 ]             │
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  FILTROS     │  │  Card    │ │  Card    │ │  Card    │ │  Card    │       │
│              │  │  Image   │ │  Image   │ │  Image   │ │  Image   │       │
│  [filtros]   │  │ Charizard│ │ Pikachu  │ │ Blue-Eyes│ │ Dark     │       │
│              │  │ $150.00  │ │ $25.00   │ │ $85.00   │ │ Magician │       │
│              │  │ [✓Comp.] │ │ [✓Comp.] │ │ [Comparar]│ │ $45.00   │       │
│              │  └──────────┘ └──────────┘ └──────────┘ │ [Comparar]│       │
│              │                                          └──────────┘       │
│              │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  📊 COMPARACIÓN DE CARTAS                          [Cerrar] [✕]           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────┬──────────────────┬──────────────────┬──────────────────┐   │
│  │            │   Charizard ✕    │   Pikachu ✕     │   [Agregar +]    │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Imagen     │  [Img Charizard] │  [Img Pikachu]  │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Nombre     │  Charizard       │  Pikachu         │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Tipo       │  Pokémon          │  Pokémon          │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Edición    │  Base Set         │  Promo            │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Rareza     │  Holo Rare        │  Rare              │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Estado     │  NM               │  LP                │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Precio     │  $150.00         │  $25.00           │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │ Vendedor   │  Carlos M.       │  Ana R.            │                  │   │
│  ├────────────┼──────────────────┼──────────────────┼──────────────────┤   │
│  │            │  [Ver detalle]   │  [Ver detalle]   │                  │   │
│  └────────────┴──────────────────┴──────────────────┴──────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mobile - Vista de Comparación

```
┌──────────────────────┐
│ Resultados: 247      │
│ [🔄 Filtros] [📊 2] │
├──────────────────────┤
│ ┌────────┐ ┌────────┐│
│ │ Card 1 │ │ Card 2 ││
│ │ $XX.XX │ │ $XX.XX ││
│ └────────┘ └────────┘│
│ ┌────────┐ ┌────────┐│
│ │ Card 3 │ │ Card 4 ││
│ │ $XX.XX │ │ $XX.XX ││
│ └────────┘ └────────┘│
│                      │
└──────────────────────┘

┌──────────────────────┐
│ 📊 COMPARACIÓN [✕]  │
├──────────────────────┤
│                      │
│ ← SCROLL HORIZONTAL →│
│                      │
│ ┌──────┬──────┐      │
│ │      │Chariz│      │
│ │  Img │ard ✕ │      │
│ │      │      │      │
│ ├──────┼──────┤      │
│ │Nombre│Chariz│      │
│ │      │ard   │      │
│ ├──────┼──────┤      │
│ │Tipo  │Pokémo│      │
│ │      │n     │      │
│ ├──────┼──────┤      │
│ │Edición│Base S│      │
│ │      │et    │      │
│ ├──────┼──────┤      │
│ │Rareza│Holo R│      │
│ │      │are   │      │
│ ├──────┼──────┤      │
│ │Estado│NM    │      │
│ ├──────┼──────┤      │
│ │Precio│$150  │      │
│ ├──────┼──────┤      │
│ │Vende.│Carlos│      │
│ │      │M.    │      │
│ ├──────┼──────┤      │
│ │      │[Ver  │      │
│ │      │det.] │      │
│ └──────┴──────┘      │
│                      │
│ ← →                  │
│ (scroll horizontal)  │
└──────────────────────┘
```

### Estado vacío/Error

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📊 COMPARACIÓN DE CARTAS                       [Cerrar] [✕]               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                      ┌─────────────────────────────┐                       │
│                      │                             │                       │
│                      │       📊  (icono grande)    │                       │
│                      │                             │                       │
│                      │  No hay cartas para comparar│                       │
│                      │                             │                       │
│                      │  Agrega cartas desde el     │                       │
│                      │  catálogo haciendo clic en  │                       │
│                      │  el botón "Comparar"        │                       │
│                      │                             │                       │
│                      │  [Volver al catálogo]       │                       │
│                      │                             │                       │
│                      └─────────────────────────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /catalogo (con panel de comparación persistente)
- **Componentes:** ComparisonPanel, ComparisonTable, ComparisonSlot, AddToComparisonButton
- **Endpoints:** GET /api/cards/:id, POST /api/comparison/add, DELETE /api/comparison/:cardId
