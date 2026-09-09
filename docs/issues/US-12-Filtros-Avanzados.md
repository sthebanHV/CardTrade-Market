# [US-12] Filtros Avanzados de Búsqueda

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Filtros disponibles ajustables
- **Valioso**: Permite refinar búsquedas para encontrar exactamente lo que se busca
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar de filtros
- **Testable**: Verificar que cada filtro funciona correctamente

---

## Historia de Usuario

**Como** usuario del sitio,
**quiero** filtrar las cartas por juego, rareza, precio y estado,
**para** encontrar exactamente lo que busco sin revisar todo el catálogo.

---

## Criterios de Aceptación

1. Filtros por juego: Pokémon, Magic, Yu-Gi-Oh!, Otros
2. Filtros por rareza: Común, Rara, Ultra Rara, Secreta
3. Filtros por rango de precio: mínimo y máximo
4. Filtros por estado: Nuevo (NM), Casi Nuevo (LP), Bueno (MP), Usado (HP)
5. Los filtros deben aplicarse en tiempo real
6. Se debe mostrar la cantidad de resultados después de filtrar
7. Se debe poder limpiar todos los filtros con un botón

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +-------------------+  +------------------------------+ |
|  | FILTROS           |  | Resultados (45 cartas)       | |
|  |                   |  |                              | |
|  | Juego             |  | +------+  Charizard ex      | |
|  | [x] Pokémon       |  | | [img]|  $45.00  ⭐ 4.8    | |
|  | [ ] Magic         |  | +------+                    | |
|  | [ ] Yu-Gi-Oh!     |  |                              | |
|  | [ ] Otros         |  | +------+  Pikachu VMAX      | |
|  |                   |  | | [img]|  $28.00  ⭐ 4.5    | |
|  | Rareza            |  | +------+                    | |
|  | [x] Común         |  |                              | |
|  | [ ] Rara          |  | +------+  Blue-Eyes White   | |
|  | [x] Ultra Rara    |  | | [img]|  $120.00 ⭐ 4.9   | |
|  | [ ] Secreta       |  | +------+                    | |
|  |                   |  |                              | |
|  | Precio            |  |                              | |
|  | $[10] - $[100]    |  |                              | |
|  | ─────●──────●────  |  |                              | |
|  |                   |  |                              | |
|  | Estado            |  |                              | |
|  | [x] Nuevo (NM)    |  |                              | |
|  | [ ] Casi Nuevo    |  |                              | |
|  | [ ] Bueno         |  |                              | |
|  |                   |  |                              | |
|  | [Limpiar Filtros] |  |                              | |
|  +-------------------+  +------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/cards?game=pokemon&rarity=ultra&price_min=10&price_max=100&condition=NM`
- **Componentes**: `FilterSidebar`, `FilterCheckbox`, `PriceRange`, `ActiveFilters`
- **Endpoints**:
  - `GET /api/cards?filters=...` - Cartas con filtros
- **State**: Usar URL params para filtros (persistencia en enlace)
- **Performance**: Implementar debounce para filtros de precio
