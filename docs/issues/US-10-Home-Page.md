# [US-10] Página Principal (Home)

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Diseño y contenido ajustables
- **Valioso**: Primera impresión que atrae a los usuarios
- **Estimable**: 6 puntos de esfuerzo
- **Pequeño**: Se puede completar en un sprint
- **Testable**: Verificar que se muestran todos los elementos

---

## Historia de Usuario

**Como** visitante del sitio,
**quiero** ver una página principal atractiva y organizada,
**para** entender qué ofrece la plataforma y encontrar cartas interesantes.

---

## Criterios de Aceptación

1. Mostrar un banner principal con llamada a la acción
2. Mostrar cartas destacadas/seleccionadas por el equipo
3. Mostrar categorías por juego (Pokémon, Magic, Yu-Gi-Oh!)
4. Mostrar las publicaciones más recientes
5. Mostrar estadísticas de la plataforma (usuarios, cartas, ventas)
6. El diseño debe ser responsive (móvil, tablet, desktop)
7. El contenido debe cargar en menos de 3 segundos

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Buscar...]  [🛒] [👤]   |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  🃏  ENCUENTRA CARTAS RARAS PARA TU COLECCIÓN       | |
|  |     Explora miles de cartas coleccionables          | |
|  |     +------------------+                             | |
|  |     |  EXPLORAR CARTAS |                             | |
|  |     +------------------+                             | |
|  +----------------------------------------------------+ |
|                                                          |
|  ──────────────────────────────────────────────────────  |
|                                                          |
|  CATEGORÍAS POR JUEGO                                    |
|                                                          |
|  +----------+  +----------+  +----------+                |
|  | Pokémon  |  | Magic    |  | Yu-Gi-Oh |                |
|  | [🎨]     |  | [🔥]     |  | [⚡]     |                |
|  +----------+  +----------+  +----------+                |
|                                                          |
|  ──────────────────────────────────────────────────────  |
|                                                          |
|  CARTAS DESTACADAS                                       |
|                                                          |
|  +--------+ +--------+ +--------+ +--------+             |
|  | [img]  | | [img]  | | [img]  | | [img]  |             |
|  | Chariz.| | Pikach | | Blue-Ey| | Black M|             |
|  | $45.00 | | $28.00 | | $120.0 | | $95.00 |             |
|  +--------+ +--------+ +--------+ +--------+             |
|                                                          |
|  ──────────────────────────────────────────────────────  |
|                                                          |
|  PUBLICACIONES RECIENTES                                 |
|                                                          |
|  +--------+ +--------+ +--------+ +--------+             |
|  | [img]  | | [img]  | | [img]  | | [img]  |             |
|  | Mega   | | Lugia  | | Red-Eye| | Dark M |             |
|  | $35.00 | | $85.00 | | $75.00 | | $42.00 |             |
|  +--------+ +--------+ +--------+ +--------+             |
|                                                          |
|  ──────────────────────────────────────────────────────  |
|                                                          |
|  📊 CARDTRADE MARKET EN NÚMEROS                          |
|  12,500+ Usuarios  |  45,000+ Cartas  |  8,200+ Ventas  |
|                                                          |
+----------------------------------------------------------+
|  Footer: Términos | Privacidad | Contacto | © 2026       |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/` o `/home`
- **Componentes**: `HomePage`, `HeroBanner`, `CategoryGrid`, `FeaturedCards`, `RecentListings`, `StatsSection`
- **Endpoints**:
  - `GET /api/cards/featured` - Cartas destacadas
  - `GET /api/cards/recent` - Publicaciones recientes
  - `GET /api/stats` - Estadísticas de la plataforma
- **Performance**: Implementar lazy loading para imágenes
