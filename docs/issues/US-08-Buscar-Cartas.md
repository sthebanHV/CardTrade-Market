# [US-08] Búsqueda de Cartas

**Epic:** Catálogo de Cartas
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Descripción

**Como** usuario de la plataforma,
**quiero** buscar cartas por nombre con resultados en tiempo real,
**para** encontrar rápidamente las cartas que deseo comprar o coleccionar.

---

## Criterios de Aceptación

1. Se muestra una barra de búsqueda con placeholder descriptivo: "Buscar cartas por nombre, tipo o rareza...".
2. La búsqueda se ejecuta en tiempo real mientras el usuario escribe (con debounce de 300ms).
3. Se muestran sugerencias de autocompletado (máximo 5 resultados) mientras se escribe.
4. La búsqueda soporta tanto coincidencia parcial como exacta del término.
5. Los resultados se muestran como un grid de cartas con imagen, nombre, precio y rareza.
6. Se muestra el conteo total de resultados: "Se encontraron X resultados".
7. Si no hay resultados, se muestra un mensaje amigable: "No se encontraron cartas para '[término]'".
8. Se incluye un botón para limpiar la búsqueda y volver a ver todas las cartas.
9. Los resultados se ordenan por relevancia (nombre exacto primero, luego parcial).
10. La búsqueda funciona correctamente en dispositivos móviles y de escritorio.
11. Se almacenan las búsquedas recientes del usuario para acceso rápido.
12. La búsqueda es case-insensitive (no distingue mayúsculas/minúsculas).

---

## Wireframe

### Barra de búsqueda con sugerencias

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Categorías  Mi Perfil  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔍 Char                    │  ✕ Limpiar                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Sugerencias:                                              │  │
│  │                                                           │  │
│  │ 🔍 Charizard VMAX                                         │  │
│  │ 🔍 Charizard EX                                           │  │
│  │ 🔍 Charmeleon                                             │  │
│  │ 🔍 Charmander                                             │  │
│  │ 🔍 Chikorita                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ─── Resultados: 24 cartas encontradas ──────────────────────── │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │ Charizard│ │ Charizard│ │ Charizard│ │ Charmele│              │
│  │ VMAX    │ │ EX      │ │ Base    │ │ on Holo │              │
│  │ $125.00 │ │ $89.00  │ │ $45.00  │ │ $12.00  │              │
│  │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐  │ │ ⭐⭐⭐    │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │ Charmand│ │ Charmand│ │ Charmand│ │ Charmand│              │
│  │ er 1st  │ │ er 1st  │ │ er Base │ │ er Fossil│             │
│  │ $8.00   │ │ $7.50   │ │ $5.00   │ │ $6.50   │              │
│  │ ⭐⭐⭐   │ │ ⭐⭐⭐   │ │ ⭐⭐     │ │ ⭐⭐⭐   │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  ← 1 2 3 ... 3 →                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────────┐
│  🃏 CardTrade    ≡      │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 🔍 Char       ✕     │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Sugerencias:        │ │
│ │ 🔍 Charizard VMAX   │ │
│ │ 🔍 Charizard EX     │ │
│ │ 🔍 Charmeleon       │ │
│ │ 🔍 Charmander       │ │
│ │ 🔍 Chikorita        │ │
│ └─────────────────────┘ │
│                         │
│ 24 cartas encontradas   │
│                         │
│ ┌─────────┐ ┌────────┐ │
│ │  ████   │ │  ████  │ │
│ │  ████   │ │  ████  │ │
│ │Charizard│ │Charizard│ │
│ │ VMAX    │ │ EX     │ │
│ │ $125.00 │ │ $89.00 │ │
│ └─────────┘ └────────┘ │
│ ┌─────────┐ ┌────────┐ │
│ │  ████   │ │  ████  │ │
│ │  ████   │ │  ████  │ │
│ │Charizard│ │Charmele│ │
│ │ Base    │ │ on     │ │
│ │ $45.00  │ │ $12.00 │ │
│ └─────────┘ └────────┘ │
│                         │
│ ← 1 2 3 ... 3 →        │
│                         │
└─────────────────────────┘
```

### Sin resultados

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Categorías  Mi Perfil  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔍 XYZABC123                         │  ✕ Limpiar        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│           ┌─────────────────────────────────┐                  │
│           │                                 │                  │
│           │     🔍 No se encontraron        │                  │
│           │     cartas para "XYZABC123"     │                  │
│           │                                 │                  │
│           │     Intenta con otros términos  │                  │
│           │     o revisa la ortografía.     │                  │
│           │                                 │                  │
│           │  ┌───────────────────────────┐  │                  │
│           │  │     Limpiar Búsqueda      │  │                  │
│           │  └───────────────────────────┘  │                  │
│           │                                 │                  │
│           │  Sugerencias:                   │                  │
│           │  • Pokémon                      │                  │
│           │  • Magic                        │                  │
│           │  • Yu-Gi-Oh                     │                  │
│           │                                 │                  │
│           └─────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Búsquedas recientes

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Categorías  Mi Perfil  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔍 Buscar cartas por nombre, tipo o rareza...            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Búsquedas Recientes:                                      │  │
│  │                                                           │  │
│  │ ⏱️ Charizard        │  ⏱️ Pikachu EX    │  ⏱️ Blue-Eyes │  │
│  │ ⏱️ Dark Magician    │  ⏱️ Umbreon V     │              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ─── Cartas Destacadas ────────────────────────────────────── │
│  (grid de cartas)                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile sin resultados

```
┌─────────────────────────┐
│  🃏 CardTrade    ≡      │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 🔍 XYZABC   ✕       │ │
│ └─────────────────────┘ │
│                         │
│   🔍 No se encontraron │
│   cartas para          │
│   "XYZABC123"          │
│                         │
│   Intenta con otros    │
│   términos.            │
│                         │
│  ┌───────────────────┐  │
│  │ Limpiar Búsqueda  │  │
│  └───────────────────┘  │
│                         │
│  Sugerencias:           │
│  • Pokémon              │
│  • Magic                │
│  • Yu-Gi-Oh             │
│                         │
└─────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /search?q=:query
- **Componentes:** SearchBar, SearchSuggestions, SearchResults, CardGrid, CardItem, Pagination, EmptyState
- **Endpoints:** GET /api/cards/search?q=:query&limit=20&page=1, GET /api/cards/suggest?q=:query
- **Debounce:** Implementar debounce de 300ms para evitar búsquedas excesivas
- **Búsqueda:** Full-text search en MongoDB o Elasticsearch para mejor rendimiento
- **Índices:** Crear índices en campos de nombre, tipo y rareza
- **Cache:** Cache de resultados de búsqueda por 2 minutos
- **Historial:** Almacenar últimas 10 búsquedas por usuario en localStorage
- **Analytics:** Tracking de términos de búsqueda más populares
- **Performance:** Paginación del lado del servidor, lazy loading de resultados
