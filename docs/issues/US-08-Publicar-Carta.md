# [US-08] Publicar Carta en Venta

**Epic:** Publicación y Venta
**Prioridad:** Alta
**Estimación:** 8 puntos

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** publicar una carta en venta con su información, precio e imágenes,
**para** que otros usuarios puedan verla y comprarla.

---

## Criterios de Aceptance

- [ ] Formulario con campos: nombre, tipo, edición, rareza, estado, precio, descripción
- [ ] Subida de imágenes (1-5 fotos, mín. 1)
- [ ] Validación de tamaño (máx. 5MB por imagen) y formato (JPG, PNG, WebP)
- [ ] Preview de imágenes antes de publicar
- [ ] Precio mínimo $0.01
- [ ] Validación de todos los campos obligatorios
- [ ] Al publicar, la carta aparece en el catálogo
- [ ] Mensaje de éxito y redirección a la publicación
- [ ] Opción de guardar como borrador
- [ ] Solo usuarios autenticados pueden publicar

---

## Wireframe - Formulario de Publicación

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  PUBLICAR CARTA EN VENTA                             | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |  IMÁGENES (1-5)                                     | |
|  |  +--------+ +--------+ +--------+ +--------+       | |
|  |  |  [+]   | | [img1] | | [img2] | | [img3] |       | |
|  |  | Agregar| |   [X]  | |   [X]  | |   [X]  |       | |
|  |  +--------+ +--------+ +--------+ +--------+       | |
|  |  Arrastra o haz clic para agregar fotos             | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  INFORMACIÓN DE LA CARTA                             | |
|  |                                                     | |
|  |  Nombre de la Carta *                                | |
|  |  +-----------------------------+                    | |
|  |  | Charizard ex Full Art       |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Tipo / Juego *                                     | |
|  |  +-----------------------------+  (select)          | |
|  |  | Pokémon                  ▼  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Edición *                                          | |
|  |  +-----------------------------+                    | |
|  |  | Paldea Evolved            ▼  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Rareza *                                           | |
|  |  +-----------------------------+                    | |
|  |  | Ultra Rare               ▼  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Estado / Condición *                               | |
|  |  (●) Nuevo (NM)  ( ) Ligero (LP)  ( ) Moderado (MP)| |
|  |  ( ) Pesado (HP) ( ) Dañado (D)                     | |
|  |                                                     | |
|  |  Precio (USD) *                                     | |
|  |  +-----------------------------+                    | |
|  |  | $ 45.00                     |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Descripción (opcional)                             | |
|  |  +-----------------------------+                    | |
|  |  | Carta en perfecto estado,   |                    | |
|  |  | sin rayones ni dobleces...  |                    | |
|  |  |                             |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  +-----------------+  +-----------------+           | |
|  |  |  GUARDAR BORRADOR|  | PUBLICAR CARTA  |           | |
|  |  +-----------------+  +-----------------+           | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Preview de Imagen

```
+-----------------------------------+
|  PREVIEW DE IMAGEN          [X]   |
+-----------------------------------+
|                                   |
|  +-----------------------------+  |
|  |                             |  |
|  |                             |  |
|  |      [Imagen Completa]      |  |
|  |                             |  |
|  |                             |  |
|  +-----------------------------+  |
|                                   |
|  Formato: JPG | Tamaño: 2.3 MB   |
|  ✓ Aceptada                      |
|                                   |
+-----------------------------------+
```

---

## Wireframe - Error de Validación

```
+-----------------------------------+
|  ⚠️ Error de Validación           |
+-----------------------------------+
|                                   |
|  Por favor corrige los siguientes |
|  errores:                         |
|                                   |
|  • Nombre de la carta es          |
|    requerido                      |
|  • El precio debe ser mayor a $0  |
|  • Agrega al menos 1 imagen       |
|                                   |
|  [Entendido]                      |
|                                   |
+-----------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/sell` o `/publish`
- **Componentes:** `SellForm`, `ImageUploader`, `ImagePreview`, `FormValidation`
- **Endpoint:** `POST /api/cards` (crear publicación)
- **Upload:** Multer + Cloudinary/S3 para imágenes
- **Validación:** Joi/Express-validator server-side
