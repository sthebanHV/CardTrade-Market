# [US-17] Publicar Carta en Venta

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Campos del formulario ajustables
- **Valioso**: Permite a los vendedores poner sus cartas a la venta
- **Estimable**: 8 puntos de esfuerzo
- **Pequeño**: Implementación completa pero manejable
- **Testable**: Verificar que la publicación se crea correctamente

---

## Historia de Usuario

**Como** vendedor,
**quiero** publicar una carta a la venta con fotos, precio y descripción,
**para** que otros usuarios puedan comprarla.

---

## Criterios de Aceptación

1. Debe haber un botón "Publicar Carta" accesible
2. Formulario con: nombre, juego, rareza, set, estado, precio, descripción
3. Subir hasta 5 fotos (máximo 10MB cada una)
4. Seleccionar estado: Nuevo (NM), Casi Nuevo (LP), Bueno (MP), Usado (HP)
5. Vista previa antes de publicar
6. Después de publicar, la carta aparece en el catálogo
7. Se puede editar después de publicar

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  PUBLICAR CARTA EN VENTA                             | |
|  |                                                     | |
|  |  Fotos de la Carta                                  | |
|  |  +--------+ +--------+ +--------+ +--------+       | |
|  |  |  📷    | |  📷    | |  📷    | |  +     |       | |
|  |  | + Agreg| | + Agreg| | + Agreg| | Agregar|       | |
|  |  +--------+ +--------+ +--------+ +--------+       | |
|  |  Máximo 5 fotos, 10MB cada una                      | |
|  |                                                     | |
|  |  Nombre de la Carta *                                | |
|  |  +-----------------------------------------------+  | |
|  |  |  Charizard ex Full ART                         |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Juego *              Rareza *                      | |
|  |  +--------------+     +------------------------+    | |
|  |  | Pokémon   ▼ |     | Ultra Rare          ▼ |    | |
|  |  +--------------+     +------------------------+    | |
|  |                                                     | |
|  |  Set                        Estado *                | |
|  |  +------------------------+ +------------------+    | |
|  |  | Evolving Skies      ▼ | | Nuevo (NM)    ▼ |    | |
|  |  +------------------------+ +------------------+    | |
|  |                                                     | |
|  |  Precio (USD) *                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  $ 45.00                                       |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Descripción                                        | |
|  |  +-----------------------------------------------+  | |
|  |  | Carta en excelente estado, perfecta para       |  | |
|  |  | coleccionistas. Envío con tracking incluido.   |  | |
|  |  |                                                 |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Vista Previa]  [Publicar Carta]                   | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/sell/new`
- **Componentes**: `PublishForm`, `ImageUploader`, `PreviewModal`
- **Endpoints**:
  - `POST /api/cards` - Crear publicación
  - `POST /api/upload` - Subir imágenes
- **Almacenamiento**: AWS S3 o Cloudinary para fotos
- **Validación**: Validar todos los campos obligatorios
