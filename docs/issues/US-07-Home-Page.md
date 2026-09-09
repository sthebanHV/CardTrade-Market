# [US-07] Página Principal (Home)

**Epic:** Catálogo de Cartas
**Prioridad:** Alta
**Estimación:** 6 puntos

---

## Descripción

**Como** visitante o usuario de la plataforma,
**quiero** acceder a una página principal que muestre cartas destacadas y me permita navegar fácilmente,
**para** descubrir cartas interesantes y comenzar a explorar el catálogo.

---

## Criterios de Aceptación

1. Se muestra una barra de búsqueda principal en la parte superior de la página.
2. Se muestran categorías/tipos de cartas: Pokémon, Magic, Yu-Gi-Oh!, Dragon Ball, One Piece, etc.
3. Cada categoría es clickeable y filtra el catálogo por ese tipo.
4. Se muestra una sección "Cartas Destacadas" con un grid de 6-8 cartas seleccionadas.
5. Se muestra una sección "Últimas Publicaciones" con las cartas más recientes.
6. Cada carta en el grid muestra: imagen, nombre, precio y rareza.
7. Las imágenes se cargan con lazy loading para mejorar el rendimiento.
8. El header es fijo (sticky) y contiene: logo, navegación, barra de búsqueda y menú de usuario.
9. Se muestra un footer con información de la plataforma, links útiles y redes sociales.
10. La página carga en menos de 3 segundos en conexiones estándar.
11. El diseño es completamente responsive para desktop, tablet y móvil.
12. Se muestra un spinner o skeleton loader durante la carga de datos.

---

## Wireframe

### Home Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Categorías  Mi Perfil  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔍 Buscar cartas por nombre, tipo, rareza...             │  │
│  └───────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ─── Categorías ────────────────────────────────────────────── │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ 🟡       │ │ 🔵       │ │ ⚫       │ │ 🔴       │          │
│  │ Pokémon  │ │ Magic    │ │ Yu-Gi-Oh │ │ Dragon   │          │
│  │ (1,234)  │ │ (892)    │ │ (756)    │ │ Ball     │          │
│  └──────────┘ └──────────┘ └──────────┘ │ (423)    │          │
│                                          └──────────┘          │
│  ┌──────────┐ ┌──────────┐                                    │
│  │ 🟢       │ │ ⚪       │                                    │
│  │ One Piece│ │ Otros    │                                    │
│  │ (312)    │ │ (189)    │                                    │
│  └──────────┘ └──────────┘                                    │
│                                                                 │
│  ─── Cartas Destacadas ────────────────────────────────────── │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │ Charizard│ │ Blue-   │ │ Dark    │ │ Pikachu │              │
│  │ VMAX    │ │ Eyes    │ │ Magician│ │ EX      │              │
│  │ $125.00 │ │ $89.00  │ │ $67.50  │ │ $45.00  │              │
│  │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐  │ │ ⭐⭐⭐⭐  │ │ ⭐⭐⭐⭐⭐│              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │ Umbreon │ │ Red-    │ │ Mewtwo  │ │ Lugia   │              │
│  │ V       │ │ Eyes-   │ │ GX      │ │ ★       │              │
│  │ $38.00  │ │ Black   │ │ $52.00  │ │ $78.00  │              │
│  │ ⭐⭐⭐⭐  │ │ $34.00  │ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐  │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  ─── Últimas Publicaciones ────────────────────────────────── │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │  ████   │ │  ████   │ │  ████   │ │  ████   │              │
│  │ Squirtle│ │ Jolteon │ │ Raichu  │ │ Gyarados│              │
│  │ Base    │ │ Promo   │ │ Holo    │ │ Holo    │              │
│  │ $12.00  │ │ $22.00  │ │ $18.50  │ │ $28.00  │              │
│  │ ⭐⭐⭐   │ │ ⭐⭐⭐⭐  │ │ ⭐⭐⭐   │ │ ⭐⭐⭐⭐  │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Ver Todas las Cartas                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  © 2024 CardTrade Market │ Términos │ Privacidad │ Contacto    │
└─────────────────────────────────────────────────────────────────┘
```

### Home Mobile

```
┌─────────────────────────┐
│  🃏 CardTrade      ≡    │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ 🔍 Buscar cartas... │ │
│ └─────────────────────┘ │
│                         │
│  ── Categorías ──────  │
│  ┌───────┐ ┌───────┐   │
│  │ 🟡    │ │ 🔵    │   │
│  │Pokémon│ │Magic  │   │
│  └───────┘ └───────┘   │
│  ┌───────┐ ┌───────┐   │
│  │ ⚫    │ │ 🔴    │   │
│  │Yu-Gi  │ │Dragon │   │
│  └───────┘ └───────┘   │
│                         │
│  ── Destacadas ──────  │
│  ┌─────────┐ ┌────────┐│
│  │  ████   │ │  ████  ││
│  │  ████   │ │  ████  ││
│  │Charizard│ │Blue-   ││
│  │ $125.00 │ │Eyes    ││
│  │⭐⭐⭐⭐⭐ │ │ $89.00 ││
│  └─────────┘ └────────┘│
│  ┌─────────┐ ┌────────┐│
│  │  ████   │ │  ████  ││
│  │  ████   │ │  ████  ││
│  │ Dark    │ │Pikachu ││
│  │Magician │ │ EX     ││
│  │ $67.50  │ │ $45.00 ││
│  └─────────┘ └────────┘│
│                         │
│  ── Últimas ────────── │
│  ┌─────────┐ ┌────────┐│
│  │  ████   │ │  ████  ││
│  │  ████   │ │  ████  ││
│  │ Squirtle│ │Jolteon ││
│  │ $12.00  │ │ $22.00 ││
│  └─────────┘ └────────┘│
│                         │
│  ┌─────────────────────┐│
│  │ Ver Todas las Cartas││
│  └─────────────────────┘│
│                         │
├─────────────────────────┤
│ © 2024 CardTrade Market │
│ Términos │ Privacidad   │
└─────────────────────────┘
```

### Estado vacío/Error

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Categorías  Mi Perfil  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🔍 Buscar cartas por nombre, tipo, rareza...             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ─── Categorías ────────────────────────────────────────────── │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ 🟡       │ │ 🔵       │ │ ⚫       │ │ 🔴       │          │
│  │ Pokémon  │ │ Magic    │ │ Yu-Gi-Oh │ │ Dragon   │          │
│  └──────────┘ └──────────┘ └──────────┘ │ Ball     │          │
│                                          └──────────┘          │
│                                                                 │
│  ─── Cartas Destacadas ────────────────────────────────────── │
│                                                                 │
│           ┌─────────────────────────────────┐                  │
│           │                                 │                  │
│           │     ⚠️ No hay cartas            │                  │
│           │     destacadas disponibles      │                  │
│           │     en este momento.            │                  │
│           │                                 │                  │
│           │     Intenta más tarde o         │                  │
│           │     publica una carta.          │                  │
│           │                                 │                  │
│           │  ┌───────────────────────────┐  │                  │
│           │  │    Publicar Carta          │  │                  │
│           │  └───────────────────────────┘  │                  │
│           │                                 │                  │
│           └─────────────────────────────────┘                  │
│                                                                 │
│  ─── Últimas Publicaciones ────────────────────────────────── │
│                                                                 │
│           ┌─────────────────────────────────┐                  │
│           │     🔄 Cargando cartas...       │                  │
│           │     ████████████░░░░░░          │                  │
│           └─────────────────────────────────┘                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  © 2024 CardTrade Market │ Términos │ Privacidad │ Contacto    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /
- **Componentes:** HomePage, SearchBar, CategoryGrid, FeaturedCards, LatestCards, CardItem, Header, Footer
- **Endpoints:** GET /api/cards/featured, GET /api/cards/latest, GET /api/categories
- **Optimización:** Lazy loading de imágenes (loading="lazy"), skeleton loaders
- **Cache:** Cache de 5 minutos para datos de home, invalidación al publicar carta
- **Performance:** Code splitting, critical CSS inline, CDN para imágenes
- **SEO:** Meta tags dinámicos, Open Graph para compartir
- **Analytics:** Tracking de clics en categorías y cartas destacadas
