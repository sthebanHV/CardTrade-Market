# [US-06] Filtros Avanzados

**Epic:** Catálogo de Cartas
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** refinar mi búsqueda de cartas usando filtros avanzados como tipo, edición, rareza y precio,
**para** encontrar exactamente la carta que necesito.

---

## Criterios de Aceptance

- [ ] Panel de filtros accesible desde resultados de búsqueda
- [ ] Filtro por tipo de carta: Pokémon, Magic, Yu-Gi-Oh, Dragon Ball, One Piece, Otros
- [ ] Filtro por edición: Base, 1st Edition, Reverse Holo, Full Art, etc.
- [ ] Filtro por rareza: Common, Uncommon, Rare, Ultra Rare, Secret Rare, etc.
- [ ] Filtro por estado: Nuevo (NM), Ligero (LP), Moderado (MP), Pesado (HP), Dañado (D)
- [ ] Filtro por rango de precio: mínimo y máximo
- [ ] Los filtros son combinables (AND)
- [ ] Botón "Limpiar filtros" para restablecer
- [ ] Se muestra el conteo de resultados filtrados
- [ ] Filtros colapsables en mobile (drawer)

---

## Wireframe - Panel de Filtros (Desktop)

```
+----------------------------------------------------------+
|  Resultados para "Charizard" (12 cartas)                 |
+----------------------------------------------------------+
|  FILTROS          |  RESULTADOS                          |
|  ──────────────── |  ──────────────────────────────────  |
|                   |                                      |
|  TIPO             |  +----------+  +----------+         |
|  [x] Pokémon      |  |  [Img]   |  |  [Img]   |         |
|  [ ] Magic        |  | Charizard|  | Charizard|         |
|  [ ] Yu-Gi-Oh     |  | ex Full  |  | Base Set |         |
|  [ ] Dragon Ball  |  | Art      |  | 1st Ed   |         |
|  [ ] One Piece    |  | $45.00   |  | $350.00  |         |
|                   |  +----------+  +----------+         |
|  RAREZA           |                                      |
|  [x] Ultra Rare   |  +----------+  +----------+         |
|  [ ] Secret Rare  |  |  [Img]   |  |  [Img]   |         |
|  [ ] Rare         |  | Charizard|  | Charizard|         |
|  [ ] Uncommon     |  | VMAX     |  | GX       |         |
|                   |  | $89.00   |  | $25.00   |         |
|  ESTADO           |  +----------+  +----------+         |
|  ( ) Cualquiera   |                                      |
|  (●) Nuevo (NM)   |  [Ver más...]                        |
|  ( ) Ligero (LP)  |                                      |
|                   |                                      |
|  PRECIO           |                                      |
|  $[10 ] - $[100]  |                                      |
|  ├────────●───────┤                                      |
|                   |                                      |
|  [Limpiar]        |                                      |
|  [Aplicar]        |                                      |
|                   |                                      |
+----------------------------------------------------------+
```

---

## Wireframe - Filtros Mobile (Drawer)

```
+---------------------------+
| [≡] Resultados (12)  [▼] |
+---------------------------+
|                           |
| +-----------------------+|
| | FILTROS          [X]  ||
| +-----------------------+|
| |                       ||
| | TIPO                  ||
| | [x] Pokémon           ||
| | [ ] Magic             ||
| | [ ] Yu-Gi-Oh          ||
| |                       ||
| | RAREZA                ||
| | [x] Ultra Rare        ||
| | [ ] Secret Rare       ||
| |                       ||
| | PRECIO                ||
| | $[10] - $[100]        ||
| | ├──────●──────────────┤||
| |                       ||
| | [Limpiar]  [Aplicar]  ||
| +-----------------------+|
|                           |
| +---------+ +---------+  |
| |  [Img]  | |  [Img]  |  |
| |Charizard| | Charizard| |
| |ex Full  | | Base Set | |
| |$45.00   | | $350.00  |  |
| +---------+ +---------+  |
+---------------------------+
```

---

## Notas Técnicas

- **Componentes:** `FilterPanel`, `FilterCheckbox`, `FilterRadio`, `PriceRange`, `FilterDrawer`
- **Endpoint:** `GET /api/cards/search?q=term&type=pokemon&rarity=ultraRare&condition=NM&minPrice=10&maxPrice=100`
- **Estado:** Filtros en URL params para compartir resultados
- **UX:** Aplicar filtros automáticamente o con botón (decidir)
