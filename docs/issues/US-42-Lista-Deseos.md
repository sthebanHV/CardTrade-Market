# [US-42] Lista de Deseos

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Categorías de deseo ajustables
- **Valioso**: Comunica qué busca el usuario
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación manejable
- **Testable**: Verificar crear, editar y eliminar deseos

---

## Historia de Usuario

**Como** coleccionista,
**quiero** crear una lista de deseos para que otros sepan qué busco,
**para** recibir ofertas de cartas que necesito.

---

## Criterios de Aceptación

1. Crear lista de deseos con cartas específicas
2. Categorías: "Busco", "Intercambio", "Comprar"
3. Prioridad: Alta, Media, Baja
4. Nota opcional por cada deseo
5. Lista visible en el perfil público
6. Otros usuarios pueden ofrecer cartas de tu lista

---

## Wireframe

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  MI LISTA DE DESEOS                                 | |
|  |                                                     | |
|  |  BUSCO (3)                                          | |
|  |  ─────────────────────────────────────────────────  | |
|  |  Charizard Base Set  | Prioridad: Alta  | Comprar   | |
|  |  "Busco en buen estado o mejor"                     | |
|  |                                                     | |
|  |  Pikachu Illustrator  | Prioridad: Alta  | Intercambio | |
|  |  "Ofrezco otras cartas raras"                       | |
|  |                                                     | |
|  |  Black Lotus (Reprint) | Prioridad: Media | Comprar  | |
|  |                                                     | |
|  |  [+ Agregar Deseo]                                  | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  (+) Agregar Nueva Carta a Lista de Deseos    |  | |
|  |  +-----------------------------------------------+  | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/wishlist`
- **Componentes**: `WishList`, `WishItem`, `AddWishForm`
- **Endpoints**:
  - `GET /api/wishlist` - Obtener lista de deseos
  - `POST /api/wishlist` - Agregar deseo
  - `PUT /api/wishlist/:id` - Actualizar deseo
  - `DELETE /api/wishlist/:id` - Eliminar deseo
