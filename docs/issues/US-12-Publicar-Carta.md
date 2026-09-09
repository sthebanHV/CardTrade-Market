# [US-12] Publicar Carta en Venta

**Epic:** Publicación y Venta
**Prioridad:** Alta
- **Estimación:** 8 puntos

---

## Descripción

**Como** usuario registrado,
**quiero** publicar una carta en venta con su información e imágenes,
**para** que otros usuarios puedan comprarla.

---

## Criterios de Aceptación

1. Se muestra un formulario de publicación con los campos: nombre, tipo, edición, rareza, estado, precio y descripción.
2. El usuario puede subir imágenes de la carta (mínimo 1, máximo 5 imágenes).
3. Cada imagen tiene un límite de tamaño de 5MB y acepta formatos JPG, PNG y WebP.
4. Se muestra una vista previa de las imágenes subidas antes de publicar.
5. El precio mínimo permitido es $0.01 USD.
6. Se valida que todos los campos obligatorios estén completos antes de permitir la publicación.
7. Al publicar exitosamente, la carta aparece visible en el catálogo de forma inmediata.
8. Se muestra un mensaje de confirmación de publicación exitosa.
9. El usuario puede guardar la publicación como borrador y completarla después.
10. Solo los usuarios autenticados pueden acceder al formulario de publicación.
11. Se muestran mensajes de error claros para cada campo con validación fallida.
12. Las imágenes se comprimen automáticamente antes de almacenarse para optimizar el rendimiento.

---

## Wireframe

### Formulario de Publicación

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver]                                Publicar Carta en Venta         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📸 IMÁGENES DE LA CARTA                                           │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │   │
│  │  │         │ │         │ │         │ │         │ │         │     │   │
│  │  │  [Img1] │ │  [Img2] │ │  [Img3] │ │  [Img4] │ │  [Img5] │     │   │
│  │  │    ✕    │ │    ✕    │ │    ✕    │ │    ✕    │ │    ✕    │     │   │
│  │  │         │ │         │ │         │ │         │ │         │     │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │   │
│  │                                                                     │   │
│  │  ┌──────────────────────────────────────────────────────────┐      │   │
│  │  │  📷 + Agregar imagen (máx. 5, 5MB c/u, JPG/PNG/WebP)  │      │   │
│  │  └──────────────────────────────────────────────────────────┘      │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📋 INFORMACIÓN DE LA CARTA                                        │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  Nombre de la carta *                                               │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Charizard                                                   │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Tipo *                                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Pokémon  ▼                                                  │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Edición *                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Base Set                                                    │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Rareza *                          Estado *                        │   │
│  │  ┌────────────────────────────┐  ┌────────────────────────────┐   │   │
│  │  │ Holo Rare  ▼               │  │ NM (Near Mint)  ▼         │   │   │
│  │  └────────────────────────────┘  └────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Precio (USD) *                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ $ 150.00                                                    │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Descripción (opcional)                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ Carta en excelente estado, sin rayones visibles. Envío     │   │   │
│  │  │ con sobre burbujas y carta de protección incluida.         │   │   │
│  │  │                                                             │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────┐  ┌────────────────────────────┐  │
│  │  💾 Guardar como borrador            │  │  🚀 Publicar carta         │  │
│  └──────────────────────────────────────┘  └────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Preview de Imagen

```
┌─────────────────────────────────────┐
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │                             │   │
│  │     [Imagen en grande]      │   │
│  │                             │   │
│  │     Archivo: charizard.jpg  │   │
│  │     Tamaño: 2.4 MB          │   │
│  │     Dimensiones: 800x600    │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [✕ Cerrar]  [🗑️ Eliminar imagen]  │
│                                     │
└─────────────────────────────────────┘
```

### Error de Validación

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📋 INFORMACIÓN DE LA CARTA                                                │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Nombre de la carta *                                                       │
│  ┌─────────────────────────────────────────────────────────────┐           │
│  │                                                             │           │
│  └─────────────────────────────────────────────────────────────┘           │
│  ⚠️ El nombre de la carta es obligatorio                                    │
│                                                                             │
│  Tipo *                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐           │
│  │ Pokémon  ▼                                                  │           │
│  └─────────────────────────────────────────────────────────────┘           │
│                                                                             │
│  Precio (USD) *                                                            │
│  ┌─────────────────────────────────────────────────────────────┐           │
│  │ $ -5.00                                                     │           │
│  └─────────────────────────────────────────────────────────────┘           │
│  ⚠️ El precio debe ser mayor a $0.01                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /publicar
- **Componentes:** PublishForm, ImageUploader, ImagePreview, FormField, ValidationMessage, BorradorButton
- **Endpoints:** POST /api/cards, POST /api/upload/image, PUT /api/cards/:id
