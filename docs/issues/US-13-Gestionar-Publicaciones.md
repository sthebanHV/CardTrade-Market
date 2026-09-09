# [US-13] Gestionar Publicaciones

**Epic:** Publicación y Venta
**Prioridad:** Media
**Estimación:** 6 puntos

---

## Descripción

**Como** vendedor registrado,
**quiero** gestionar mis cartas publicadas,
**para** mantener actualizado mi inventario de venta y responder a la demanda del mercado.

---

## Criterios de Aceptación

1. Se muestra una lista de todas las publicaciones del vendedor con filtro por estado (Activa, Inactiva, Vendida, Borrador).
2. Cada publicación en la lista muestra: imagen miniatura, nombre, precio, estado y fecha de publicación.
3. El vendedor puede editar el precio y la descripción de una publicación existente.
4. El vendedor puede eliminar una publicación con confirmación antes de proceder.
5. El vendedor puede marcar una publicación como "Vendida".
6. El vendedor puede cambiar el estado de una publicación entre Activa e Inactiva.
7. Se muestran estadísticas básicas por publicación: número de vistas y veces añadido a favoritos.
8. El vendedor puede ordenar las publicaciones por: fecha de publicación, precio, más vistas.
9. La lista está paginada con 10 publicaciones por página por defecto.
10. Se muestra un conteo total de publicaciones y el filtro activo.
11. Al eliminar una publicación, se muestra un modal de confirmación con el nombre de la carta.
12. Los cambios se reflejan inmediatamente en el catálogo público.

---

## Wireframe

### Lista de Publicaciones

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver]                   Mis Publicaciones (12)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Filtrar: [Todas ▼]   Ordenar: [Más recientes ▼]                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────┬───────────────────────────────────────────────────────────────┐   │
│  │     │                                                               │   │
│  │ 🖼️  │  Charizard - Base Set                $150.00    ✅ Activa    │   │
│  │     │  Publicado: 15 Mar 2026   👁️ 234 vistas   ♡ 18 favoritos    │   │
│  │     │  [✏️ Editar]  [🔄 Estado]  [✓ Vendida]  [🗑️ Eliminar]      │   │
│  │     │                                                               │   │
│  ├─────┼───────────────────────────────────────────────────────────────┤   │
│  │     │                                                               │   │
│  │ 🖼️  │  Pikachu - Promo                   $25.00     ✅ Activa     │   │
│  │     │  Publicado: 10 Mar 2026   👁️ 156 vistas   ♡ 12 favoritos   │   │
│  │     │  [✏️ Editar]  [🔄 Estado]  [✓ Vendida]  [🗑️ Eliminar]      │   │
│  │     │                                                               │   │
│  ├─────┼───────────────────────────────────────────────────────────────┤   │
│  │     │                                                               │   │
│  │ 🖼️  │  Blue-Eyes -LOB                   $85.00     🔴 Inactiva    │   │
│  │     │  Publicado: 05 Mar 2026   👁️ 89 vistas    ♡ 5 favoritos     │   │
│  │     │  [✏️ Editar]  [🔄 Estado]  [✓ Vendida]  [🗑️ Eliminar]      │   │
│  │     │                                                               │   │
│  ├─────┼───────────────────────────────────────────────────────────────┤   │
│  │     │                                                               │   │
│  │ 🖼️  │  Mewtwo - Base Set                $60.00     🟡 Borrador   │   │
│  │     │  Guardado: 01 Mar 2026   👁️ 0 vistas     ♡ 0 favoritos     │   │
│  │     │  [✏️ Editar]  [🚀 Publicar]  [🗑️ Eliminar]                  │   │
│  │     │                                                               │   │
│  └─────┴───────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  « 1 2 »                                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Editar Publicación

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver a mis publicaciones]         Editar Publicación                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📸 IMÁGENES ACTUALES                                              │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐                               │   │
│  │  │  [Img1] │ │  [Img2] │ │  [Img3] │                               │   │
│  │  │    ✕    │ │    ✕    │ │    ✕    │                               │   │
│  │  └─────────┘ └─────────┘ └─────────┘                               │   │
│  │  [📷 Agregar más imágenes]                                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📋 CAMPOS EDITABLES                                               │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  Precio (USD) *                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ $ 150.00                                                    │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Descripción *                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Carta en excelente estado, sin rayones visibles.           │   │   │
│  │  │                                                             │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ℹ️ Campos no editables: nombre, tipo, edición, rareza, estado    │   │
│  │  Para cambiar estos campos, elimina la publicación y crea una nueva│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────┐  ┌────────────────────────────────┐   │
│  │  [Cancelar]                    │  │  💾 Guardar cambios            │   │
│  └────────────────────────────────┘  └────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Confirmar Eliminación

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ⚠️  Eliminar publicación                                          │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ¿Estás seguro de que deseas eliminar la publicación               │   │
│  │  "Charizard - Base Set"?                                            │   │
│  │                                                                     │   │
│  │  Esta acción no se puede deshacer. La carta dejará de ser          │   │
│  │  visible en el catálogo público.                                   │   │
│  │                                                                     │   │
│  │  ┌────────────────────────────────┐  ┌──────────────────────────┐  │   │
│  │  │  [Cancelar]                   │  │  [🗑️ Sí, eliminar]       │  │   │
│  │  └────────────────────────────────┘  └──────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /mis-publicaciones
- **Componentes:** PublicationList, PublicationCard, PublicationFilters, EditPublicationForm, DeleteConfirmationModal, StatusToggle
- **Endpoints:** GET /api/my-cards, PUT /api/cards/:id, DELETE /api/cards/:id, PATCH /api/cards/:id/status
