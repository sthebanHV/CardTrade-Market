# [US-15] Ver y Gestionar Mi Colección

**Epic:** Colección Personal
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** ver todas las cartas de mi colección en una vista organizada con filtros,
**para** tener un registro completo y organizado de mis cartas.

---

## Criterios de Aceptance

- [ ] Vista grid/lista de cartas en mi colección
- [ ] Filtros: tipo, rareza, estado
- [ ] Búsqueda por nombre dentro de la colección
- [ ] Ordenar por: nombre, precio, fecha de adquisición
- [ ] Editar información de carta en la colección
- [ ] Eliminar carta de la colección (con confirmación)
- [ ] Marcar carta como "En venta" (crear publicación)
- [ ] Valor total de la colección visible
- [ ] Contador total de cartas
- [ ] Paginación

---

## Wireframe - Mi Colección

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MI COLECCIÓN                                       | |
|  |                                                     | |
|  |  Total: 48 cartas  |  Valor estimado: $2,340.00    | |
|  |                                                     | |
|  |  Buscar: [🔍 Nombre de carta...]                    | |
|  |  Tipo: [Todos ▼]  Rareza: [Todas ▼]  [Limpiar]    | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------+  +----------+  +----------+  +----------+ |
|  |  [Img]   |  |  [Img]   |  |  [Img]   |  |  [Img]   | |
|  |          |  |          |  |          |  |          | |
|  | Charizard|  | Pikachu  |  | Mewtwo   |  | Blue-Eyes| |
|  | ex Full  |  | Full Art |  | Base Set |  | White    | |
|  | Art      |  |          |  |          |  | Dragon   | |
|  | $45.00   |  | $28.00   |  | $89.00   |  | $120.00  | |
|  | [✏️][🗑️] |  | [✏️][🗑️] |  | [✏️][🗑️] |  | [✏️][🗑️] | |
|  +----------+  +----------+  +----------+  +----------+ |
|                                                          |
|  +----------+  +----------+  +----------+  +----------+ |
|  |  [Img]   |  |  [Img]   |  |  [Img]   |  |  [Img]   | |
|  | Lugia    |  | Umbreon  |  | Rayquaza |  | Dark     | |
|  | VSTAR    |  | VMAX     |  | MAX      |  | Magician | |
|  | $67.00   |  | $52.00   |  | $78.00   |  | $15.00   | |
|  | [✏️][🗑️] |  | [✏️][🗑️] |  | [✏️][🗑️] |  | [✏️][🗑️] | |
|  +----------+  +----------+  +----------+  +----------+ |
|                                                          |
|  [< 1 2 3 ... 6 >]                                      |
+----------------------------------------------------------+
```

---

## Wireframe - Vista Lista

```
+----------------------------------------------------------+
|  MI COLECCIÓN (48 cartas)  [Grid 📊] [Lista ☰]          |
+----------------------------------------------------------+
|                                                          |
|  +------+--------------------------------------------+  |
|  | [img]| Charizard ex Full Art  | Ultra Rare | $45  |  |
|  +------+--------------------------------------------+  |
|  +------+--------------------------------------------+  |
|  | [img]| Pikachu Full Art       | Rare       | $28  |  |
|  +------+--------------------------------------------+  |
|  +------+--------------------------------------------+  |
|  | [img]| Mewtwo Base Set        | Rare       | $89  |  |
|  +------+--------------------------------------------+  |
|  +------+--------------------------------------------+  |
|  | [img]| Blue-Eyes White Dragon | Ultra Rare | $120 |  |
|  +------+--------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Editar Carta en Colección

```
+----------------------------------------------------------+
|  EDITAR CARTA EN COLECCIÓN                          [X]  |
+----------------------------------------------------------+
|                                                          |
|  +-------------------+                                   |
|  |                   |  Nombre                           |
|  |    [Imagen]       |  +-----------------------------+  |
|  |                   |  | Charizard ex Full Art       |  |
|  |   [Cambiar]       |  +-----------------------------+  |
|  +-------------------+                                   |
|                                                          |
|  Rareza: [Ultra Rare ▼]                                  |
|  Estado: [Nuevo (NM) ▼]                                  |
|  Precio de adquisición: [$ 45.00]                        |
|                                                          |
|  +-----------------+  +-----------------+               |
|  |    CANCELAR      |  |  GUARDAR        |               |
|  +-----------------+  +-----------------+               |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/collection`
- **Componentes:** `MyCollection`, `CollectionGrid`, `CollectionList`, `CollectionItem`, `EditCollectionModal`
- **Endpoints:**
  - `GET /api/collection` - Obtener colección
  - `PUT /api/collection/:id` - Editar carta
  - `DELETE /api/collection/:id` - Eliminar carta
- **Vista:** Toggle grid/lista con persistencia en localStorage
