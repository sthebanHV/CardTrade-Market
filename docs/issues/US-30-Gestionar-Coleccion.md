# [US-30] Gestionar Mi Colección

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Acciones disponibles ajustables
- **Valioso**: Permite organizar y mantener la colección
- **Estimable**: 8 puntos de esfuerzo
- **Pequeño**: Implementación completa pero manejable
- **Testable**: Verificar cada acción de gestión

---

## Historia de Usuario

**Como** coleccionista,
**quiero** organizar, editar y eliminar cartas de mi colección,
**para** mantener mi colección actualizada y organizada.

---

## Criterios de Aceptación

1. Ver todas las cartas de mi colección
2. Filtrar por juego, rareza, estado
3. Editar información de cada carta
4. Eliminar cartas con confirmación
5. Ver estadísticas básicas (total cartas, valor estimado)
6. Buscar dentro de mi colección

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MI COLECCIÓN (156 cartas)                          | |
|  |                                                     | |
|  |  Filtrar: [Todos ▼]  Buscar: [🔍 ...]              | |
|  |                                                     | |
|  |  +------+  Charizard ex Full ART                    | |
|  |  |      |  Pokémon | Ultra Rare | Nuevo (NM)        | |
|  |  | [img]|  Agregado: 09/09/2026                     | |
|  |  |      |  [Editar] [Eliminar]                      | |
|  |  +------+                                           | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  +------+  Pikachu VMAX Rainbow                     | |
|  |  |      |  Pokémon | Secret Rare | Casi Nuevo       | |
|  |  | [img]|  Agregado: 01/08/2026                     | |
|  |  |      |  [Editar] [Eliminar]                      | |
|  |  +------+                                           | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  ESTADÍSTICAS                                       | |
|  |  Total: 156 cartas | Pokémon: 120 | Magic: 36       | |
|  |  Valor Estimado: $2,450.00 USD                      | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/my-collection`
- **Componentes**: `CollectionPage`, `CollectionCard`, `CollectionFilters`, `CollectionStats`
- **Endpoints**:
  - `GET /api/collection` - Obtener colección
  - `PUT /api/collection/:id` - Actualizar carta
  - `DELETE /api/collection/:id` - Eliminar carta
- **Búsqueda**: Implementar búsqueda local en la colección
