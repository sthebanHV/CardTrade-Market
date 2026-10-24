# [US-23] Carrito de Compras

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Funcionalidades del carrito ajustables
- **Valioso**: Permite comprar múltiples artículos a la vez
- **Estimable**: 8 puntos de esfuerzo
- **Pequeño**: Implementación completa pero manejable
- **Testable**: Verificar agregar, eliminar y actualizar cantidades

---

## Historia de Usuario

**Como** comprador,
**quiero** agregar cartas a un carrito de compras para comprar varias a la vez,
**para** ahorrar tiempo y consolidar mis compras.

---

## Criterios de Aceptación

1. Botón "Agregar al Carrito" en cada publicación
2. Badge con número de artículos en el ícono del carrito
3. Página del carrito muestra todos los artículos
4. Se puede modificar cantidad o eliminar artículos
5. Se muestra resumen con subtotal y total
6. El carrito persiste entre sesiones (7 días)
7. Se verifica disponibilidad antes de proceder al pago

---

## Wireframe

### Carrito con Productos

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [🛒(2)] [≡]     |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MI CARRITO (2 artículos)                            | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |  +------+  Charizard ex Full ART                    | |
|  |  |      |  Pokémon | Ultra Rare | Nuevo (NM)        | |
|  |  | [img]|  Vendedor: CardMaster_MX ⭐ 4.8           | |
|  |  |      |  $45.00 USD                               | |
|  |  +------+  [Eliminar]                               | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  +------+  PIKACHU FULL ART                         | |
|  |  |      |  Pokémon | Rare | Nuevo (NM)              | |
|  |  | [img]|  Vendedor: PikachuFan ⭐ 4.5              | |
|  |  |      |  $28.00 USD                               | |
|  |  +------+  [Eliminar]                               | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  RESUMEN DE COMPRA                                  | |
|  |  Subtotal (2 artículos):        $73.00              | |
|  |  Envío:                         $5.99               | |
|  |  ────────────────────────────────                   | |
|  |  TOTAL:                         $78.99              | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |         PROCEDER AL PAGO                       |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Seguir comprando]                                 | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

### Carrito Vacío

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |              🛒                                      | |
|  |                                                     | |
|  |        Tu carrito está vacío                         | |
|  |                                                     | |
|  |   Explora nuestro catálogo y encuentra cartas        | |
|  |   increíbles para tu colección.                      | |
|  |                                                     | |
|  |   +-----------------------------+                   | |
|  |   |    VER CATÁLOGO DE CARTAS   |                   | |
|  |   +-----------------------------+                   | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/cart`
- **Componentes**: `CartPage`, `CartItem`, `CartSummary`, `EmptyCart`
- **Endpoints**:
  - `GET /api/cart` - Obtener carrito
  - `POST /api/cart` - Agregar item
  - `DELETE /api/cart/:cardId` - Eliminar item
  - `PATCH /api/cart` - Actualizar (verificar disponibilidad)
- **Estado global**: Context API o Redux para el carrito
