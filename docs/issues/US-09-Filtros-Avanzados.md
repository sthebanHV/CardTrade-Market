# [US-09] Filtros Avanzados de Búsqueda

**Epic:** Catálogo de Cartas
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** usuario del catálogo de cartas,
**quiero** refinar mi búsqueda usando filtros avanzados,
**para** encontrar exactamente la carta que necesito sin revisar resultados irrelevantes.

---

## Criterios de Aceptación

1. Se muestra un panel de filtros en el lateral izquierdo de la página de resultados de búsqueda.
2. El usuario puede filtrar por tipo de carta: Pokémon, Magic, Yu-Gi-Oh, Dragon Ball, One Piece, Otros.
3. El usuario puede filtrar por edición de la carta.
4. El usuario puede filtrar por rareza: Common, Uncommon, Rare, Ultra Rare, Secret Rare.
5. El usuario puede filtrar por estado de la carta: NM (Near Mint), LP (Lightly Played), MP (Moderately Played), HP (Heavily Played), D (Damaged).
6. El usuario puede filtrar por rango de precio (mínimo y máximo).
7. Los filtros son combinables entre sí (se aplican de forma acumulativa).
8. Existe un botón "Limpiar filtros" que restablece todos los filtros seleccionados.
9. Se muestra el conteo actualizado de resultados filtrados en tiempo real.
10. En mobile, los filtros se muestran en un drawer colapsable que se abre desde un botón flotante.
11. Los filtros seleccionados persisten al navegar entre páginas de resultados.
12. La URL se actualiza con los parámetros de filtro para permitir compartir búsquedas filtradas.

---

## Wireframe

### Desktop - Panel de Filtros

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔍 Buscar cartas...                                               [Buscar]│
├──────────────┬──────────────────────────────────────────────────────────────┤
│              │  Resultados: 247 cartas encontradas                         │
│  FILTROS     │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  ─────────── │  │  Card    │ │  Card    │ │  Card    │ │  Card    │       │
│              │  │  Image   │ │  Image   │ │  Image   │ │  Image   │       │
│  Tipo ▼      │  │          │ │          │ │          │ │          │       │
│  ☐ Pokémon   │  │ Charizard│ │ Pikachu  │ │ Blue-    │ │ Dark     │       │
│  ☐ Magic     │  │ Base Set │ │ Promo    │ │ Eyes     │ │ Magician │       │
│  ☐ Yu-Gi-Oh  │  │          │ │          │ │ Dragon   │ │ LoB      │       │
│  ☐ Dragon B. │  │ $150.00  │ │ $25.00   │ │ $85.00   │ │ $45.00   │       │
│  ☐ One Piece │  │ ⭐⭐⭐⭐⭐  │ │ ⭐⭐⭐⭐    │ │ ⭐⭐⭐⭐⭐  │ │ ⭐⭐⭐     │       │
│  ☐ Otros     │  │ [Comparar]│ │ [Comparar]│ │ [Comparar]│ │ [Comparar]│       │
│              │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  Rareza ▼    │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  ☐ Common    │  │  Card    │ │  Card    │ │  Card    │ │  Card    │       │
│  ☐ Uncommon  │  │  Image   │ │  Image   │ │  Image   │ │  Image   │       │
│  ☐ Rare      │  │          │ │          │ │          │ │          │       │
│  ☐ Ultra Rare│  │ Lugia    │ │ Mew      │ │ Red-     │ │ Shining  │       │
│  ☐ Secret    │  │ Neo      │ │ Base Set │ │ Eyes Char│ │ Ferali   │       │
│              │  │          │ │          │ │izard     │ │ tr.      │       │
│  Estado ▼    │  │ $200.00  │ │ $300.00  │ │ $120.00  │ │ $90.00   │       │
│  ☐ NM        │  │ ⭐⭐⭐⭐⭐  │ │ ⭐⭐⭐⭐⭐  │ │ ⭐⭐⭐⭐    │ │ ⭐⭐⭐⭐    │       │
│  ☐ LP        │  │ [Comparar]│ │ [Comparar]│ │ [Comparar]│ │ [Comparar]│       │
│  ☐ MP        │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│  ☐ HP        │                                                              │
│  ☐ D         │  « 1 2 3 ... 62 »                                           │
│              │                                                              │
│  Precio      │                                                              │
│  Min: [____] │                                                              │
│  Max: [____] │                                                              │
│              │                                                              │
│  [Limpiar]   │                                                              │
│  filtros     │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

### Mobile - Drawer de Filtros

```
┌──────────────────────┐     ┌──────────────────────┐
│ 🔍 Buscar...  [☰]   │     │ 🔍 Buscar...  [☰]   │
├──────────────────────┤     ├──────────────────────┤
│                      │     │ FILTROS       [Cerrar]│
│ Resultados: 247      │     │ ───────────────────── │
│ ┌────────┐ ┌────────┐│     │ Tipo                   │
│ │ Card 1 │ │ Card 2 ││     │ ☐ Pokémon              │
│ │ Image  │ │ Image  ││     │ ☐ Magic                │
│ │ Name   │ │ Name   ││     │ ☐ Yu-Gi-Oh             │
│ │ $XX.XX │ │ $XX.XX ││     │ ☐ Dragon Ball          │
│ └────────┘ └────────┘│     │ ☐ One Piece            │
│ ┌────────┐ ┌────────┐│     │ ☐ Otros                │
│ │ Card 3 │ │ Card 4 ││     │                        │
│ │ Image  │ │ Image  ││     │ Rareza                 │
│ │ Name   │ │ Name   ││     │ ☐ Common               │
│ │ $XX.XX │ │ $XX.XX ││     │ ☐ Uncommon             │
│ └────────┘ └────────┘│     │ ☐ Rare                 │
│                      │     │ ☐ Ultra Rare           │
│ « 1 2 3 ... »       │     │ ☐ Secret Rare          │
│                      │     │                        │
│ [🔄 Filtros] 2 activos│     │ Estado                 │
│                      │     │ ☐ NM  ☐ LP  ☐ MP      │
└──────────────────────┘     │ ☐ HP  ☐ D              │
                             │                        │
                             │ Precio                 │
                             │ Min: [____]            │
                             │ Max: [____]            │
                             │                        │
                             │ [Aplicar filtros]      │
                             │ [Limpiar filtros]      │
                             └──────────────────────┘
```

### Estado vacío/Error

```
┌─────────────────────────────────────────────────────┐
│  🔍 Buscar cartas...                         [Buscar]│
├──────────────┬──────────────────────────────────────┤
│  FILTROS     │                                      │
│  ─────────── │  ┌─────────────────────────────┐     │
│              │  │                             │     │
│  [filtros]   │  │       🔍  (icono grande)    │     │
│              │  │                             │     │
│  [Limpiar]   │  │  No se encontraron cartas   │     │
│              │  │  con los filtros seleccionados│    │
│              │  │                             │     │
│              │  │  Intenta ajustar los filtros │     │
│              │  │  o buscar con otros términos │     │
│              │  │                             │     │
│              │  │  [Limpiar filtros]          │     │
│              │  │                             │     │
│              │  └─────────────────────────────┘     │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /catalogo?search=...&tipo=...&rareza=...&estado=...&precioMin=...&precioMax=...
- **Componentes:** FilterPanel, FilterDrawer, FilterCheckbox, PriceRangeFilter, ActiveFilters
- **Endpoints:** GET /api/cards?search=&tipo=&rareza=&estado=&precioMin=&precioMax=&page=&limit=
