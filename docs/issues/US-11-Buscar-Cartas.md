# [US-11] Búsqueda de Cartas

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Algoritmo de búsqueda ajustable
- **Valioso**: Permite encontrar cartas específicas rápidamente
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar de búsqueda
- **Testable**: Verificar resultados relevantes

---

## Historia de Usuario

**Como** usuario del sitio,
**quiero** buscar cartas por nombre o descripción,
**para** encontrar rápidamente las cartas que me interesan.

---

## Criterios de Aceptación

1. Debe haber un campo de búsqueda accesible en el header
2. La búsqueda debe ser en tiempo real (autocomplete)
3. Se deben mostrar sugerencias mientras se escribe
4. Los resultados deben incluir imagen, nombre, precio y vendedor
5. Se debe poder buscar por nombre de carta, juego o descripción
6. Si no hay resultados, mostrar mensaje amigable
7. La búsqueda debe funcionar desde cualquier página

---

## Wireframe

### Barra de Búsqueda

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Buscar cartas...] [🛒]   |
+----------------------------------------------------------+
```

### Autocomplete

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 charizard ex  ]  [🛒]    |
+----------------------------------------------------------+
                             +----------------------------+
                             | Sugerencias:               |
                             | ─────────────────────────  |
                             | 🃏 Charizard ex Full ART   |
                             | 🃏 Charizard VMAX          |
                             | 🃏 Charizard GX            |
                             | 🃏 Charmeleon (base)       |
                             +----------------------------+
```

### Resultados de Búsqueda

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  Resultados para "charizard ex" (24 resultados)          |
|                                                          |
|  +----------------------------------------------------+ |
|  |  Ordenar por: [Más Recientes ▼] [Precio ▼]         | |
|  +----------------------------------------------------+ |
|                                                          |
|  +------+  Charizard ex Full ART                        |
|  |      |  Tipo: Pokémon | Ultra Rare | Nuevo (NM)      |
|  | [img]|  Vendedor: CardMaster_MX ⭐ 4.8               |
|  |      |  $45.00 USD                                   |
|  +------+  [Agregar al Carrito] [♥ Favorito]            |
|                                                          |
|  ─────────────────────────────────────────────────────  |
|                                                          |
|  +------+  Charizard VMAX Rainbow                       |
|  |      |  Tipo: Pokémon | Secret Rare | Usado (LP)     |
|  | [img]|  Vendedor: PikachuFan ⭐ 4.5                  |
|  |      |  $38.00 USD                                   |
|  +------+  [Agregar al Carrito] [♥ Favorito]            |
|                                                          |
|  ─────────────────────────────────────────────────────  |
|                                                          |
|  +------+  Charizard GX (XY Evolutions)                 |
|  |      |  Tipo: Pokémon | Rare Holo | Nuevo (NM)       |
|  | [img]|  Vendedor: TCG_Masters ⭐ 4.9                 |
|  |      |  $52.00 USD                                   |
|  +------+  [Agregar al Carrito] [♥ Favorito]            |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/search?q=query`
- **Componentes**: `SearchBar`, `SearchResults`, `SearchSuggestions`
- **Endpoints**:
  - `GET /api/cards/search?q=query` - Buscar cartas
  - `GET /api/cards/suggestions?q=query` - Autocomplete
- **Búsqueda**: Elasticsearch o MongoDB text search
- **Performance**: Debounce de 300ms en búsquedas en tiempo real
