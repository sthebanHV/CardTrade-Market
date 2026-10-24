# [US-13] Detalle de Carta

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Información mostrada ajustable
- **Valioso**: Proporciona toda la información para tomar una decisión de compra
- **Estimable**: 8 puntos de esfuerzo
- **Pequeño**: Implementación completa pero manejable
- **Testable**: Verificar que toda la información se muestra correctamente

---

## Historia de Usuario

**Como** comprador potencial,
**quiero** ver toda la información de una carta antes de comprarla,
**para** tomar una decisión informada sobre mi compra.

---

## Criterios de Aceptación

1. Mostrar imagen principal de la carta (con opción de ampliar)
2. Mostrar imágenes adicionales si existen
3. Mostrar nombre, juego, rareza y set de la carta
4. Mostrar estado/condición de la carta (NM, LP, MP, HP)
5. Mostrar precio y opción de agregar al carrito
6. Mostrar información del vendedor con rating
7. Mostrar descripción detallada de la carta
8. Mostrar fecha de publicación y stock disponible

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  Charizard ex Full ART - Pokémon                         |
|                                                          |
|  +-------------------+  +-----------------------------+ |
|  |                   |  | INFORMACIÓN DE LA CARTA     | |
|  |                   |  |                             | |
|  |    +----------+   |  | Nombre: Charizard ex        | |
|  |    |          |   |  | Juego: Pokémon              | |
|  |    |  [img]   |   |  | Rareza: Ultra Rare          | |
|  |    | Charizard|   |  | Set: Evolving Skies         | |
|  |    |          |   |  | Estado: Nuevo (NM)          | |
|  |    +----------+   |  |                             | |
|  |                   |  | ─────────────────────────── | |
|  |  [1] [2] [3]      |  |                             | |
|  |  Miniaturas        |  | PRECIO                      | |
|  |                   |  | $45.00 USD                   | |
|  |                   |  |                             | |
|  |                   |  | Stock: 1 disponible         | |
|  |                   |  |                             | |
|  |                   |  | [Agregar al Carrito]        | |
|  |                   |  | [Comprar Ahora]             | |
|  |                   |  | [♥ Agregar a Favoritos]     | |
|  +-------------------+  +-----------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  VENDEDOR                                           | |
|  |  +------+  CardMaster_MX                           | |
|  |  | [img]|  ⭐ 4.8 (124 ventas)                     | |
|  |  +------+  Miembro desde 2023                      | |
|  |                                                     | |
|  |  [Ver Perfil del Vendedor]                          | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  DESCRIPCIÓN                                        | |
|  |  Carta en excelente estado, perfecta para           | |
|  |  coleccionistas. Envío con tracking incluido.       | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/cards/:id`
- **Componentes**: `CardDetail`, `ImageGallery`, `SellerInfo`, `AddToCart`
- **Endpoints**:
  - `GET /api/cards/:id` - Detalle de carta
  - `POST /api/cart` - Agregar al carrito
  - `POST /api/favorites` - Agregar a favoritos
- **SEO**: Implementar meta tags para redes sociales
