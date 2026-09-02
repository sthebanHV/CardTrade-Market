# [US-09] Gestionar Mis Publicaciones

**Epic:** Publicación y Venta
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** vendedor,
**quiero** ver y gestionar todas mis cartas publicadas (editar, eliminar, marcar como vendida),
**para** mantener actualizado mi inventario de venta.

---

## Criterios de Aceptance

- [ ] Lista de todas mis publicaciones con filtro por estado
- [ ] Cada publicación muestra: imagen, nombre, precio, estado, fecha
- [ ] Puedo editar precio y descripción
- [ ] Puedo eliminar una publicación (con confirmación)
- [ ] Puedo marcar una carta como "Vendida"
- [ ] Puedo cambiar estado entre Activa/Inactiva
- [ ] Se muestra estadística: vistas, favoritos
- [ ] Ordenar por: fecha, precio, más vistas
- [ ] Paginación de resultados

---

## Wireframe - Mis Publicaciones

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [Mi Perfil] [≡]  |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MIS PUBLICACIONES (12)                              | |
|  |                                                     | |
|  |  Filtros: [Todas ▼]  Ordenar: [Más reciente ▼]    | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  [img] Charizard ex Full Art                        | |
|  |        $45.00  |  Activa  |  Publicada: 15 Ene 2024 | |
|  |        👁 234 vistas  |  ♡ 12 favoritos             | |
|  |  [Editar]  [Marcar vendida]  [Pausar]  [Eliminar]  | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  [img] Pikachu Full Art                             | |
|  |        $28.00  |  Activa  |  Publicada: 20 Ene 2024 | |
|  |        👁 156 vistas  |  ♡ 8 favoritos              | |
|  |  [Editar]  [Marcar vendida]  [Pausar]  [Eliminar]  | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  [img] Blue-Eyes White Dragon                       | |
|  |        $120.00  |  Vendida  |  Vendida: 25 Ene 2024 | |
|  |        👁 89 vistas  |  ♡ 5 favoritos               | |
|  |  [Ver detalles de venta]                            | |
|  +----------------------------------------------------+ |
|                                                          |
|  [< 1 2 >]                                              |
+----------------------------------------------------------+
```

---

## Wireframe - Editar Publicación

```
+----------------------------------------------------------+
|  EDITAR PUBLICACIÓN                                  [X] |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  IMÁGENES ACTUALES                                  | |
|  |  +--------+ +--------+ +--------+                  | |
|  |  | [img1] | | [img2] | | [img3] |                  | |
|  |  |   [X]  | |   [X]  | |   [X]  |                  | |
|  |  +--------+ +--------+ +--------+                  | |
|  |  +--------+                                         | |
|  |  |  [+]   |  Agregar más                            | |
|  |  +--------+                                         | |
|  +----------------------------------------------------+ |
|                                                          |
|  Precio (USD)                                            |
|  +-----------------------------+                        |
|  | $ 55.00                     |  (editado de $45.00)   |
|  +-----------------------------+                        |
|                                                          |
|  Descripción                                             |
|  +-----------------------------+                        |
|  | Carta en excelente estado...|                        |
|  +-----------------------------+                        |
|                                                          |
|  +-----------------+  +-----------------+               |
|  |    CANCELAR      |  |  GUARDAR CAMBIOS|               |
|  +-----------------+  +-----------------+               |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Confirmar Eliminación

```
+-----------------------------------+
|  ⚠️ Confirmar Eliminación         |
+-----------------------------------+
|                                   |
|  ¿Estás seguro de eliminar        |
|  "Charizard ex Full Art"?         |
|                                   |
|  Esta acción no se puede          |
|  deshacer.                        |
|                                   |
|  +-----------+  +-----------+    |
|  | CANCELAR  |  | ELIMINAR  |    |
|  +-----------+  +-----------+    |
|                                   |
+-----------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/my-listings`
- **Componentes:** `MyListings`, `ListingCard`, `EditListingModal`, `DeleteConfirmModal`
- **Endpoints:**
  - `GET /api/cards/my-listings` - Mis publicaciones
  - `PUT /api/cards/:id` - Editar
  - `DELETE /api/cards/:id` - Eliminar
  - `PATCH /api/cards/:id/status` - Cambiar estado
