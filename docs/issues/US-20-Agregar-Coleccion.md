# [US-20] Agregar Carta a Colección

**Epic:** Colección Personal
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** usuario,
**quiero** registrar cartas en mi colección personal,
**para** llevar un registro organizado y detallado de todas las cartas que poseo.

---

## Criterios de Aceptación

1. El formulario de agregar carta incluye campos: nombre de la carta, tipo de juego (Pokémon, Yu-Gi-Oh!, MTG, Otro), edición/colección, rareza, estado de la carta, precio de adquisición, fecha de adquisición, imagen (opcional), y notas adicionales (opcional).
2. Los campos obligatorios son: nombre, tipo de juego y rareza. Los demás son opcionales.
3. El campo "fecha de adquisición" tiene como valor por defecto la fecha actual, pero puede modificarse.
4. El campo "precio de adquisición" es opcional y acepta valores decimales con formato de moneda.
5. El campo "imagen" permite subir una foto de la carta (máximo 5MB, formatos: JPG, PNG, WebP). Se muestra preview antes de guardar.
6. El campo "estado" es un select con opciones: Nuevo (NM), Casi Nuevo (NM-), Muy Bueno (VG), Bueno (GD), Regular (PL), Malo (PR).
7. El campo "rareza" es un select con opciones según el juego seleccionado (ej: Pokémon: Común, Incomún, Rara, Ultra Rara, Secreta).
8. Al enviar el formulario válidamente, la carta se agrega a la colección y se muestra mensaje de confirmación: "Carta [nombre] agregada a tu colección".
9. El formulario se limpia después de guardar exitosamente, listo para agregar otra carta.
10. Desde el detalle de cualquier carta en el marketplace, hay un botón "Agregar a Mi Colección" que abre el formulario prellenado con los datos de esa carta.
11. Se muestra contador incremental en el header de colección al agregar una carta.
12. El formulario incluye autocompletado para nombre de carta buscando en la base de datos de cartas del marketplace.
13. La imagen se recorta automáticamente a formato cuadrado para vista previa en la colección.

---

## Wireframe

### Desktop - Formulario Agregar Carta

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Colección > Agregar Carta                                             |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  AGREGAR CARTA A MI COLECCIÓN                                       | |
|  |                                                                     | |
|  |  +---------------------------+  +------------------------------+   | |
|  |  |                           |  |  INFORMACIÓN DE LA CARTA     |   | |
|  |  |                           |  |                              |   | |
|  |  |                           |  |  Nombre de la Carta *        |   | |
|  |  |      +-------------+      |  |  +--------------------------+|   | |
|  |  |      |             |      |  |  | Charizard VMAX           ||   | |
|  |  |      |   IMAGEN    |      |  |  +--------------------------+|   | |
|  |  |      |   PREVIA    |      |  |                              |   | |
|  |  |      |             |      |  |  Tipo de Juego *            |   | |
|  |  |      +-------------+      |  |  +--------------------------+|   | |
|  |  |                           |  |  | Pokémon              [▼] ||   | |
|  |  |  [Subir Imagen]           |  |  +--------------------------+|   | |
|  |  |  JPG, PNG, WebP (max 5MB) |  |                              |   | |
|  |  |                           |  |  Edición / Colección         |   | |
|  |  +---------------------------+  |  +--------------------------+|   | |
|  |                                  |  | Shining Fates          ||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Rareza *                    |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | Ultra Rara            [▼]||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Estado de la Carta          |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | Nuevo (NM)            [▼]||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Precio de Adquisición       |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | $  150.00               ||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Fecha de Adquisición        |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | 09/09/2026              ||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  Notas (opcional)            |   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |  | Carta en perfecto        ||   | |
|  |                                  |  | estado, sin rayaduras.   ||   | |
|  |                                  |  +--------------------------+|   | |
|  |                                  |                              |   | |
|  |                                  |  [Cancelar]  [Agregar Carta] |   | |
|  |                                  +------------------------------+   | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Botón Rápido desde Detalle de Carta

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Marketplace > Pokémon > Charizard VMAX                                   |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------+  +--------------------------------------+ |
|  |                           |  |  Charizard VMAX                      | |
|  |                           |  |  Shining Fates - Ultra Rara          | |
|  |      +-------------+      |  |                                      | |
|  |      |             |      |  |  Estado: Nuevo (NM)                  | |
|  |      |   CHARIZARD |      |  |  Vendido por: CardMasterMX ⭐ 4.8    | |
|  |      |    VMAX     |      |  |                                      | |
|  |      |             |      |  |  Precio: $150.00 MXN                 | |
|  |      +-------------+      |  |                                      | |
|  |                           |  |  +-----------------------------+    | |
|  |  ← 1 2 3 4 5 →           |  |  |     [Agregar a Mi Colección] |    | |
|  |                           |  |  +-----------------------------+    | |
|  +---------------------------+  |                                      | |
|                                  |  [Añadir al Carrito]   [Comprar]    | |
|                                  +--------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Mobile - Formulario Agregar Carta

```
+--------------------------+
|  ← Agregar Carta         |
+--------------------------+
|                          |
|  +--------------------+  |
|  |                    |  |
|  |   +----------+     |  |
|  |   |          |     |  |
|  |   | IMAGEN   |     |  |
|  |   | PREVIA   |     |  |
|  |   |          |     |  |
|  |   +----------+     |  |
|  |                    |  |
|  |  [Subir Imagen]    |  |
|  +--------------------+  |
|                          |
|  Nombre *               |
|  +--------------------+  |
|  | Charizard VMAX     |  |
|  +--------------------+  |
|                          |
|  Tipo de Juego *        |
|  +--------------------+  |
|  | Pokémon         [▼]|  |
|  +--------------------+  |
|                          |
|  Edición                |
|  +--------------------+  |
|  | Shining Fates      |  |
|  +--------------------+  |
|                          |
|  Rareza *               |
|  +--------------------+  |
|  | Ultra Rara      [▼]|  |
|  +--------------------+  |
|                          |
|  Estado                 |
|  +--------------------+  |
|  | Nuevo (NM)      [▼]|  |
|  +--------------------+  |
|                          |
|  Precio Adquisición     |
|  +--------------------+  |
|  | $ 150.00           |  |
|  +--------------------+  |
|                          |
|  Fecha Adquisición      |
|  +--------------------+  |
|  | 09/09/2026         |  |
|  +--------------------+  |
|                          |
|  Notas                  |
|  +--------------------+  |
|  | Perfecto estado,   |  |
|  | sin rayaduras.     |  |
|  +--------------------+  |
|                          |
|  [Cancelar]  [Agregar]  |
|                          |
+--------------------------+
```

### Mobile - Desde Detalle de Carta

```
+--------------------------+
|  ←   Charizard VMAX      |
+--------------------------+
|                          |
|  +--------------------+  |
|  |                    |  |
|  |   +----------+     |  |
|  |   |          |     |  |
|  |   | CHARIZARD|     |  |
|  |   |   VMAX   |     |  |
|  |   +----------+     |  |
|  |                    |  |
|  |  ← 1 2 3 4 5 →    |  |
|  +--------------------+  |
|                          |
|  Charizard VMAX          |
|  Shining Fates           |
|  Ultra Rara | NM         |
|                          |
|  Vendido por:            |
|  CardMasterMX ⭐ 4.8     |
|                          |
|  Precio: $150.00 MXN    |
|                          |
|  [Agregar a Mi Colección]|
|  [Añadir al Carrito]     |
|  [Comprar Ahora]         |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  ERROR AL SUBIR IMAGEN                                           | |
|  |                                                                     | |
|  |  El archivo excede el tamaño máximo de 5MB.                         | |
|  |  Por favor selecciona una imagen más pequeña.                       | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ✓  CARTA AGREGADA EXITOSAMENTE                                     | |
|  |                                                                     | |
|  |  "Charizard VMAX" ha sido agregada a tu colección.                  | |
|  |                                                                     | |
|  |  [Agregar Otra Carta]      [Ver Mi Colección]                       | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|                    COLECCIÓN VACÍA                                        |
|                                                                           |
|                         +--------+                                        |
|                         |  📋    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    Tu colección está vacía                                |
|                                                                           |
|              Comienza a registrar tus cartas para                         |
|              llevar un control de tu colección.                           |
|                                                                           |
|                    [+ Agregar Primera Carta]                              |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /collection/add, /marketplace/cards/:id (con botón de agregar)
- **Componentes:** AddCardForm, ImageUploader, ImagePreview, CardAutocomplete, GameTypeSelect, RaritySelect, ConditionSelect, SuccessMessage
- **Endpoints:**
  - POST /api/collection/cards - Crear nueva carta en colección
  - POST /api/collection/cards/upload-image - Subir imagen de carta
  - GET /api/cards/search?q=:query - Autocompletado de cartas
  - GET /api/cards/:id - Obtener datos de carta del marketplace para prellenar formulario
