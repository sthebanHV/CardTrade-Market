# [US-21] Gestionar Colección Personal

**Epic:** Colección Personal
**Prioridad:** Media
**Estimación:** 8 puntos

---

## Descripción

**Como** usuario,
**quiero** ver y gestionar las cartas de mi colección,
**para** tener un registro completo, organizado y actualizado de todas mis cartas.

---

## Criterios de Aceptación

1. La colección se muestra en vista de cuadrícula (grid) por defecto, con tarjetas que incluyen imagen, nombre, tipo, rareza y precio.
2. El usuario puede alternar entre vista de cuadrícula y vista de lista; la preferencia se persiste en localStorage.
3. Filtros disponibles: por tipo de juego (Pokémon, Yu-Gi-Oh!, MTG, Otro), por rareza, y por estado de la carta.
4. Barra de búsqueda que filtra cartas por nombre en tiempo real.
5. Opciones de ordenamiento: por nombre (A-Z, Z-A), por precio (mayor-menor, menor-mayor), por fecha de adquisición (más reciente, más antiguo).
6. Cada carta tiene botones de acción: Editar, Eliminar, Marcar como "En Venta".
7. La opción "Editar" abre un formulario modal con los datos actuales de la carta para modificar.
8. La opción "Eliminar" muestra un modal de confirmación: "¿Eliminar [nombre de carta] de tu colección? Esta acción no se puede deshacer."
9. Al marcar como "En Venta", la carta se publica automáticamente en el marketplace con el precio de adquisición (ajustable).
10. Se muestra el valor total estimado de la colección en la parte superior.
11. Se muestra el contador total de cartas: "Mostrando X de Y cartas".
12. La paginación muestra 12 cartas por vista en grid y 20 en lista.
13. En vista de lista, se muestran columnas: imagen, nombre, tipo, edición, rareza, estado, precio, fecha, acciones.
14. Los filtros se muestran como sidebar en desktop y como bottom sheet en mobile.
15. Se muestra un badge de estado: "En Venta" en verde, "En Colección" en azul para cada carta.

---

## Wireframe

### Desktop - Vista Cuadrícula (Grid)

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Colección                                                            |
|                                                                           |
|  Valor Total: $12,450.00 MXN     Total: 47 cartas                       |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  Filtros:                                                                |
|  +------------------+  +----------------------------------------------+ |
|  | Tipo de Juego    |  |  [🔍 Buscar por nombre...]  Grid | Lista    | |
|  | [✓] Pokémon      |  +----------------------------------------------+ |
|  | [✓] Yu-Gi-Oh!   |                                                 |
|  | [✓] MTG         |  Ordenar: [Más reciente ▼]                       |
|  | [ ] Otro        |                                                 |
|  +------------------+                                                 |
|                           +------------------------------------------+ |
|  Rareza                   |                                          | |
|  [✓] Común               |  +------+------+------+------+------+   | |
|  [✓] Rara                |  | IMG  | IMG  | IMG  | IMG  | IMG  |   | |
|  [✓] Ultra Rara          |  |Char- |Blue- |Black |Pika- |Yugi  |   | |
|  [ ] Secreta             |  |izard |Eyes  |Lotus |chu   |oh    |   | |
|                           |  |VMAX  |White |Alpha |EX    |Dark  |   | |
|  Estado                  |  |$150  |$85   |$1200 |$45   |$120  |   | |
|  [✓] Nuevo (NM)         |  |En    |En    |En    |En    |En    |   | |
|  [ ] Casi Nuevo         |  |Venta |Venta |Venta |Venta |Venta |   | |
|  [ ] Muy Bueno          |  +------+------+------+------+------+   | |
|  [ ] Bueno              |                                          | |
|  [ ] Regular            |  +------+------+------+------+------+   | |
|  [ ] Malo               |  | IMG  | IMG  | IMG  | IMG  | IMG  |   | |
|                           |  |Red   |Blue  |Lil-  |Sol-  |Drag- |   | |
|  [Limpiar Filtros]       |  |Eyes  |Eyes  |iana  |galeo |on    |   | |
|                           |  |Pend. |Rares |V     |GX    |Master|   | |
|                           |  |$320  |$275  |$180  |$95   |$500  |   | |
|                           |  |Col.  |Col.  |Col.  |Col.  |Col.  |   | |
|                           |  +------+------+------+------+------+   | |
|                           |                                          | |
|                           |  Mostrando 10 de 47 cartas              | |
|                           |  [< 1 2 3 4 5 >]                        | |
|                           +------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Vista Lista

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Colección                                                            |
|                                                                           |
|  Valor Total: $12,450.00 MXN     Total: 47 cartas                       |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  [🔍 Buscar por nombre...]      Grid | Lista    Ordenar: [Más reciente ▼]|
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  | IMAGEN  NOMBRE         TIPO      EDICIÓN     RAREZA    ESTADO  PRECIO| |
|  |-------  -------------  --------  ----------  --------  ------  ------| |
|  | [IMG]   Charizard VMAX Pokémon   Shining Ft  Ultra R   Nuevo   $150 | |
|  | [IMG]   Blue-Eyes WD   Yu-Gi-Oh  LOB         Rara      LP      $85  | |
|  | [IMG]   Black Lotus    MTG       Alpha       Mythic    GD      $1200| |
|  | [IMG]   Pikachu EX     Pokémon   Base Set    Rara      NM      $45  | |
|  | [IMG]   Dark Magician  Yu-Gi-Oh  LOB         Rara      VG      $120 | |
|  | [IMG]   Red-Eyes Pend. Pokémon   Retro Blk   Ultra R   NM      $320 | |
|  | [IMG]   Blue-Eyes Rares Yu-Gi-Oh Starter    Común     NM      $275 | |
|  | [IMG]   Liliana V      MTG       Innistrad   Mythic    NM      $180 | |
|  | [IMG]   Solgaleo GX    Pokémon   Cosmic Ecl  Ultra R   NM      $95  | |
|  | [IMG]   Dragon Master  Yu-Gi-Oh  Legend      Ultra R   VG      $500 | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  Mostrando 10 de 47 cartas                    [< 1 2 3 4 5 >]           |
|                                                                           |
+===========================================================================+
```

### Desktop - Editar Carta (Modal)

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Colección                                                            |
|  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ✎ EDITAR CARTA                                           [X]     | |
|  |                                                                     | |
|  |  +---------------------------+  +------------------------------+   | |
|  |  |                           |  |  Nombre de la Carta *        |   | |
|  |  |      +-------------+      |  |  +--------------------------+|   | |
|  |  |      |             |      |  |  | Charizard VMAX           ||   | |
|  |  |      |   IMAGEN    |      |  |  +--------------------------+|   | |
|  |  |      |   ACTUAL    |      |  |                              |   | |
|  |  |      |             |      |  |  Tipo de Juego *            |   | |
|  |  |      +-------------+      |  |  +--------------------------+|   | |
|  |  |                           |  |  | Pokémon              [▼] ||   | |
|  |  |  [Cambiar Imagen]         |  |  +--------------------------+|   | |
|  |  |  [Eliminar Imagen]        |  |                              |   | |
|  |  +---------------------------+  |  Rareza *                    |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | Ultra Rara            [▼]||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Estado                      |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | Nuevo (NM)            [▼]||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Precio de Adquisición       |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | $  150.00               ||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Marcar como:                |   | |
|  |                                  |  [ ] En Venta                |   | |
|  |                                  |                              |   | |
|  |                                  |  [Cancelar]  [Guardar Cambios]   | |
|  |                                  +------------------------------+   | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Mobile - Vista Cuadrícula

```
+--------------------------+
|  ≡   Mi Colección       |
+--------------------------+
|                          |
|  Valor: $12,450.00      |
|  Total: 47 cartas        |
|                          |
|  [🔍 Buscar...]  [Grid] |
|                          |
|  Filtros: Tipo [▼]      |
|  Rareza [▼] Estado [▼]  |
|                          |
|  Ordenar: [Reciente ▼]  |
|                          |
|  +------+------+------+ |
|  | IMG  | IMG  | IMG  | |
|  |Char- |Blue- |Black | |
|  |izard |Eyes  |Lotus | |
|  |VMAX  |White |Alpha | |
|  |$150  |$85   |$1200 | |
|  +------+------+------+ |
|                          |
|  +------+------+------+ |
|  | IMG  | IMG  | IMG  | |
|  |Pika- |Yugi  |Red-  | |
|  |chu   |oh    |Eyes  | |
|  |EX    |Dark  |Pend. | |
|  |$45   |$120  |$320  | |
|  +------+------+------+ |
|                          |
|  +------+------+------+ |
|  | IMG  | IMG  | IMG  | |
|  |Blue  |Lil-  |Sol-  | |
|  |Eyes  |iana  |galeo | |
|  |Rares |V     |GX    | |
|  |$275  |$180  |$95   | |
|  +------+------+------+ |
|                          |
|  Mostrando 12 de 47     |
|  [< 1 2 3 4 >]          |
|                          |
+--------------------------+
```

### Mobile - Vista Lista

```
+--------------------------+
|  ≡   Mi Colección       |
+--------------------------+
|                          |
|  Valor: $12,450.00      |
|  Total: 47 cartas        |
|                          |
|  [🔍 Buscar...]  [List] |
|                          |
|  +--------------------+  |
|  | [IMG] Charizard V  |  |
|  | Pokémon | Ultra R  |  |
|  | NM | $150.00       |  |
|  | [✏️] [🗑️] [💰]      |  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  | [IMG] Blue-Eyes WD |  |
|  | Yu-Gi-Oh | Rara    |  |
|  | LP | $85.00        |  |
|  | [✏️] [🗑️] [💰]      |  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  | [IMG] Black Lotus  |  |
|  | MTG | Mythic       |  |
|  | GD | $1,200.00     |  |
|  | [✏️] [🗑️] [💰]      |  |
|  +--------------------+  |
|                          |
|  Mostrando 3 de 47      |
|  [< 1 2 ... 16 >]       |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|                         +--------+                                        |
|                         |  📋    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    No se encontraron cartas                                |
|                                                                           |
|          No hay cartas que coincidan con los filtros                      |
|          seleccionados. Intenta ajustar los criterios                     |
|          de búsqueda.                                                     |
|                                                                           |
|                    [Limpiar Filtros]                                      |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|                         +--------+                                        |
|                         |  📋    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    Tu colección está vacía                                |
|                                                                           |
|              Comienza a registrar tus cartas para                         |
|              llevar un control organizado de tu colección.                |
|                                                                           |
|                    [+ Agregar Primera Carta]                              |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  CONFIRMAR ELIMINACIÓN                                          | |
|  |                                                                     | |
|  |  ¿Estás seguro de eliminar "Charizard VMAX" de tu colección?        | |
|  |                                                                     | |
|  |  Esta acción no se puede deshacer.                                  | |
|  |                                                                     | |
|  |  [Cancelar]                              [Eliminar]                 | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /collection
- **Componentes:** CollectionGrid, CollectionList, CollectionFilters, CollectionHeader, CardGridItem, CardListItem, CardEditModal, DeleteConfirmModal, SellButton, Pagination
- **Endpoints:**
  - GET /api/collection/cards - Obtener cartas de la colección (con filtros, búsqueda, ordenamiento, paginación)
  - PUT /api/collection/cards/:id - Actualizar carta
  - DELETE /api/collection/cards/:id - Eliminar carta
  - PUT /api/collection/cards/:id/sell - Marcar como "En Venta"
  - GET /api/collection/stats - Obtener estadísticas (valor total, contador)
