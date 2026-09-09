# [US-15] Catálogo por Juego

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Se pueden agregar más juegos
- **Valocious**: Facilita la navegación por categorías
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación estándar de categorías
- **Testable**: Verificar navegación por cada juego

---

## Historia de Usuario

**Como** coleccionista de un juego específico,
**quiero** navegar por las cartas de mi juego favorito,
**para** encontrar cartas de la colección que me interesa.

---

## Criterios de Aceptación

1. Mostrar categorías principales: Pokémon, Magic, Yu-Gi-Oh!
2. Cada categoría tiene su imagen representativa y cantidad de cartas
3. Al hacer clic, se muestra el catálogo filtrado por ese juego
4. Se pueden combinar con otros filtros (rareza, precio, etc.)
5. Mostrar subcategorías si existen (sets, ediciones)

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  CATEGORÍAS DE JUEGOS                                    |
|                                                          |
|  +----------------------------------------------------+ |
|  |  +------------------+  +------------------+         | |
|  |  | 🎨               |  | 🔥               |         | |
|  |  |                  |  |                  |         | |
|  |  |    POKÉMON       |  |   MAGIC          |         | |
|  |  |                  |  |                  |         | |
|  |  |  12,450 cartas   |  |  8,320 cartas    |         | |
|  |  +------------------+  +------------------+         | |
|  |                                                     | |
|  |  +------------------+  +------------------+         | |
|  |  | ⚡               |  | 🎯               |         | |
|  |  |                  |  |                  |         | |
|  |  |   YU-GI-OH!      |  |   OTROS          |         | |
|  |  |                  |  |                  |         | |
|  |  |  6,780 cartas    |  |  2,100 cartas    |         | |
|  |  +------------------+  +------------------+         | |
|  +----------------------------------------------------+ |
|                                                          |
|  POKÉMON - Subcategorías                                 |
|                                                          |
|  [Sword & Shield] [Sun & Moon] [XY] [Black & White]     |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/cards/game/:game`
- **Componentes**: `CategoryGrid`, `CategoryCard`, `SubcategoryList`
- **Endpoints**:
  - `GET /api/categories` - Obtener categorías
  - `GET /api/cards?game=pokemon` - Cartas por juego
- **SEO**: URLs amigables por juego
