# [US-18] Gestionar Mis Publicaciones

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Acciones disponibles ajustables
- **Valioso**: Permite al vendedor controlar sus publicaciones
- **Estimable**: 6 puntos de esfuerzo
- **Pequeño**: Implementación estándar de CRUD
- **Testable**: Verificar cada acción (editar, eliminar, pausar)

---

## Historia de Usuario

**Como** vendedor,
**quiero** ver, editar y eliminar mis publicaciones activas,
**para** mantener mi catálogo actualizado y organizado.

---

## Criterios de Aceptación

1. Mostrar lista de todas mis publicaciones
2. Filtrar por estado: Activas, Pausadas, Vendidas
3. Editar precio, descripción y fotos de una publicación
4. Pausar/activar una publicación
5. Eliminar una publicación con confirmación
6. Marcar como vendida
7. Mostrar estadísticas de cada publicación (vistas, favoritos)

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MIS PUBLICACIONES (12 publicaciones)               | |
|  |                                                     | |
|  |  Filtrar: [Todas ▼]  Ordenar: [Más Recientes ▼]    | |
|  |                                                     | |
|  |  +------+  Charizard ex Full ART                    | |
|  |  |      |  Pokémon | Ultra Rare | Nuevo (NM)        | |
|  |  | [img]|  $45.00 USD  |  Vistas: 124  | ⭐ 4.8    | |
|  |  |      |  Estado: Activa                           | |
|  |  +------+  [Editar] [Pausar] [Vendida] [Eliminar]   | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  +------+  Pikachu VMAX Rainbow                     | |
|  |  |      |  Pokémon | Secret Rare | Casi Nuevo       | |
|  |  | [img]|  $28.00 USD  |  Vistas: 89   | ⭐ 4.5    | |
|  |  |      |  Estado: Pausada                          | |
|  |  +------+  [Editar] [Activar] [Vendida] [Eliminar]   | |
|  |                                                     | |
|  |  +------------------------------------------------+ | |
|  |  |  [+ Nueva Publicación]                          | | |
|  |  +------------------------------------------------+ | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/my-listings`
- **Componentes**: `MyListingsPage`, `ListingCard`, `ListingActions`
- **Endpoints**:
  - `GET /api/cards/my-listings` - Mis publicaciones
  - `PUT /api/cards/:id` - Editar publicación
  - `DELETE /api/cards/:id` - Eliminar publicación
  - `PATCH /api/cards/:id/status` - Cambiar estado
