# [US-05] Búsqueda de Cartas

**Epic:** Catálogo de Cartas
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** buscar cartas por nombre con resultados en tiempo real,
**para** encontrar rápidamente las cartas que deseo comprar o consultar.

---

## Criterios de Aceptance

- [ ] Barra de búsqueda con placeholder "Buscar cartas..."
- [ ] Búsqueda en tiempo real con debounce de 300ms
- [ ] Sugerencias de autocompletado al escribir
- [ ] Búsqueda por nombre exacto o parcial
- [ ] Se muestran resultados como grid de cartas
- [ ] Se indica el número de resultados encontrados
- [ ] Se muestra "No se encontraron resultados" cuando aplica
- [ ] Se puede limpiar la búsqueda con botón X
- [ ] La búsqueda funciona desde cualquier página
- [ ] Resultados incluyen: imagen, nombre, precio, rareza, vendedor

---

## Wireframe - Barra de Búsqueda con Sugerencias

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market                                 |
|                                                          |
|  +--------------------------------------------------+   |
|  | 🔍 Charizar...                           [X]     |   |
|  +--------------------------------------------------+   |
|  |  Charizard ex Full Art                    Pokémon  |   |
|  |  Charizard Base Set 1st Edition           Pokémon  |   |
|  |  Charizard VMAX Rainbow                  Pokémon  |   |
|  +--------------------------------------------------+   |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Resultados de Búsqueda

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Charizard        ] [X]  |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  Resultados para "Charizard" (24 cartas encontradas)| |
|  |                                                     | |
|  |  Ordenar por: [Precio ▼] [Rareza] [Más reciente]  | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------+  +----------+  +----------+  +----------+ |
|  |  [Img]   |  |  [Img]   |  |  [Img]   |  |  [Img]   | |
|  |          |  |          |  |          |  |          | |
|  | Charizard|  | Charizard|  | Charizard|  | Charizard| |
|  | ex Full  |  | Base Set |  | VMAX     |  | GX       | |
|  | Art      |  | 1st Ed   |  | Rainbow  |  | Rare     | |
|  | ★★★★     |  | ★★★★★    |  | ★★★★     |  | ★★★      | |
|  | $45.00   |  | $350.00  |  | $89.00   |  | $25.00   | |
|  | [Comprar]|  | [Comprar]|  | [Comprar]|  | [Comprar]| |
|  +----------+  +----------+  +----------+  +----------+ |
|                                                          |
|  +----------+  +----------+  +----------+  +----------+ |
|  |  [Img]   |  |  [Img]   |  |  [Img]   |  |  [Img]   | |
|  | Charizard|  | Charizard|  | Charizard|  | Charizard| |
|  | Mega     |  | Leon      |  | Star     |  | Dark     | |
|  |          |  |          |  |          |  |          | |
|  | $120.00  |  | $32.00   |  | $78.00   |  | $15.00   | |
|  +----------+  +----------+  +----------+  +----------+ |
|                                                          |
|  [< 1 2 3 ... 6 >]                                      |
+----------------------------------------------------------+
```

---

## Wireframe - Sin Resultados

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 xyzabc123        ] [X]  |
+----------------------------------------------------------+
|                                                          |
|              +-----------------------------------+       |
|              |          🔍                        |       |
|              |   No se encontraron cartas         |       |
|              |   para "xyzabc123"                 |       |
|              |                                    |       |
|              |   Intenta con otros términos       |       |
|              |   o revisa los filtros             |       |
|              +-----------------------------------+       |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/search?q=term`
- **Componentes:** `SearchBar`, `SearchSuggestions`, `SearchResults`, `CardGrid`
- **Endpoint:** `GET /api/cards/search?q=term`
- **Debounce:** Custom hook `useDebounce` (300ms)
- **Autocompletado:** Top 5 sugerencias
