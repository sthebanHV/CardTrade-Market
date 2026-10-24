# [US-29] Agregar Carta a Colección

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Campos adicionales ajustables
- **Valioso**: Permite llevar registro de cartas propias
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que la carta se agrega correctamente

---

## Historia de Usuario

**Como** coleccionista,
**quiero** agregar cartas a mi colección personal,
**para** llevar un registro de todas las cartas que poseo.

---

## Criterios de Aceptación

1. Botón "Agregar a Mi Colección" en cada carta
2. Formulario con: nombre, juego, rareza, estado, fecha de adquisición
3. Campo opcional: precio pagado
4. Campo opcional: notas personales
5. Opción de subir foto propia de la carta
6. La carta aparece en mi colección después de guardar

---

## Wireframe

### Botón de Agregar

```
+----------------------------------------------------------+
|  +------+  Charizard ex Full ART                        |
|  |      |  Pokémon | Ultra Rare | Nuevo (NM)            |
|  | [img]|  $45.00 USD                                   |
|  |      |  [Agregar al Carrito] [♥ Favorito]            |
|  |      |  [📚 Agregar a Mi Colección]                  |
|  +------+                                               |
+----------------------------------------------------------+
```

### Formulario de Agregar

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  AGREGAR A MI COLECCIÓN                             | |
|  |                                                     | |
|  |  Nombre: Charizard ex Full ART                      | |
|  |  Juego: Pokémon                                     | |
|  |  Rareza: Ultra Rare                                 | |
|  |                                                     | |
|  |  Estado de la Carta                                 | |
|  |  +--------------+                                   | |
|  |  | Nuevo (NM) ▼|                                   | |
|  |  +--------------+                                   | |
|  |                                                     | |
|  |  Fecha de Adquisición                               | |
|  |  +--------------+                                   | |
|  |  | 2026-09-09  |                                   | |
|  |  +--------------+                                   | |
|  |                                                     | |
|  |  Precio Pagado (Opcional)                           | |
|  |  +-----------------------------------------------+  | |
|  |  |  $ 42.00                                       |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Notas Personales (Opcional)                        | |
|  |  +-----------------------------------------------+  | |
|  |  |  Comprada en feria de coleccionistas            |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Cancelar]              [Agregar a Colección]      | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/cards/:id` o desde menú
- **Componentes**: `AddToCollectionButton`, `CollectionForm`
- **Endpoints**:
  - `POST /api/collection` - Agregar carta a colección
- **Validación**: Evitar duplicados en la colección
