# [US-16] Carrito de Compras

**Epic:** Proceso de Compra
**Prioridad:** Alta
**Estimación:** 8 puntos

---

## Descripción

**Como** cliente del sistema,
**quiero** visualizar y gestionar mi carrito de compras,
**para** revisar los productos seleccionados antes de continuar con el pedido.

---

## Criterios de Aceptación

1. El carrito muestra todos los productos con: nombre de la carta, imagen, precio unitario y subtotal.
2. Existen botones +/- para modificar la cantidad de cada producto.
3. Si la cantidad llega a 1 y el usuario presiona "-", se muestra una confirmación antes de eliminar el producto.
4. Existe un botón "Eliminar" por cada producto con confirmación antes de proceder.
5. El total del carrito se recalcula en tiempo real al modificar cantidades o eliminar productos.
6. Si el carrito está vacío, se muestra el mensaje: "Tu carrito está vacío. Agrega productos del catálogo para continuar."
7. El botón "Continuar pedido" solo se habilita si hay al menos un producto en el carrito.
8. El carrito persiste entre sesiones del usuario (almacenado en base de datos).
9. Cada carta tiene un máximo de 1 unidad (producto único/no repetible).
10. Se verifica la disponibilidad de cada carta al cargar el carrito.
11. Si una carta ya no está disponible, se muestra un aviso y se deshabilita esa línea del carrito.
12. Se muestra un badge en el header con el número total de artículos en el carrito.

---

## Wireframe

### Carrito con Productos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏠 CardTrade   [🔍 Buscar...]   [♡ Favoritos]   [🛒 Carrito (3)]  [👤]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Mi Carrito de Compras                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ┌─────────┐                                                │   │   │
│  │  │  │ 🖼️     │  Charizard - Base Set              $150.00     │   │   │
│  │  │  │  Img    │  Rareza: Holo Rare · Estado: NM                │   │   │
│  │  │  └─────────┘  Vendedor: Carlos M.                           │   │   │
│  │  │                                                             │   │   │
│  │  │  Cantidad: [ - ] 1 [ + ]          Subtotal: $150.00        │   │   │
│  │  │  [🗑️ Eliminar]                                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ┌─────────┐                                                │   │   │
│  │  │  │ 🖼️     │  Pikachu - Promo                    $25.00     │   │   │
│  │  │  │  Img    │  Rareza: Rare · Estado: LP                     │   │   │
│  │  │  └─────────┘  Vendedor: Ana R.                              │   │   │
│  │  │                                                             │   │   │
│  │  │  Cantidad: [ - ] 1 [ + ]          Subtotal: $25.00         │   │   │
│  │  │  [🗑️ Eliminar]                                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ┌─────────┐                                                │   │   │
│  │  │  │ 🖼️     │  Blue-Eyes White Dragon - LOB       $85.00     │   │   │
│  │  │  │  Img    │  Rareza: Ultra Rare · Estado: NM               │   │   │
│  │  │  └─────────┘  Vendedor: Pedro L.                            │   │   │
│  │  │                                                             │   │   │
│  │  │  Cantidad: [ - ] 1 [ + ]          Subtotal: $85.00         │   │   │
│  │  │  [🗑️ Eliminar]                                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  Resumen del pedido                                                 │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  Subtotal (3 artículos):                      $260.00              │   │
│  │  Envío estimado:                               $15.00              │   │
│  │  ───────────────────────────────────────────────────────────────    │   │
│  │  Total:                                       $275.00              │   │
│  │                                                                     │   │
│  │  [🛒 Continuar con el pedido →]                                   │   │
│  │                                                                     │   │
│  │  [← Seguir comprando]                                              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Carrito Vacío

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🏠 CardTrade   [🔍 Buscar...]   [♡ Favoritos]   [🛒 Carrito (0)]  [👤]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Mi Carrito de Compras                                                      │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│                      ┌─────────────────────────────┐                       │
│                      │                             │                       │
│                      │       🛒  (icono grande)    │                       │
│                      │                             │                       │
│                      │  Tu carrito está vacío.     │                       │
│                      │                             │                       │
│                      │  Agrega productos del       │                       │
│                      │  catálogo para continuar.   │                       │
│                      │                             │   ┌───────────────┐  │
│                      │                             │   │               │  │
│                      │                             │   │ Explorar      │  │
│                      │                             │   │ catálogo →    │  │
│                      │                             │   │               │  │
│                      │                             │   └───────────────┘  │
│                      │                             │                       │
│                      └─────────────────────────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Carta No Disponible

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ┌─────────┐                                                │   │   │
│  │  │  │ 🖼️     │  Charizard - Base Set              $150.00     │   │   │
│  │  │  │  Img    │  Rareza: Holo Rare · Estado: NM                │   │   │
│  │  │  └─────────┘  Vendedor: Carlos M.                           │   │   │
│  │  │                                                             │   │   │
│  │  │  ⚠️ Esta carta ya no está disponible                       │   │   │
│  │  │  La carta fue vendida o eliminada por el vendedor.          │   │   │
│  │  │                                                             │   │   │
│  │  │  [🗑️ Eliminar del carrito]                                  │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ┌─────────┐                                                │   │   │
│  │  │  │ 🖼️     │  Pikachu - Promo                    $25.00     │   │   │
│  │  │  │  Img    │  Rareza: Rare · Estado: LP                     │   │   │
│  │  │  └─────────┘  Vendedor: Ana R.                              │   │   │
│  │  │                                                             │   │   │
│  │  │  Cantidad: [ - ] 1 [ + ]          Subtotal: $25.00         │   │   │
│  │  │  [🗑️ Eliminar]                                              │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Resumen del pedido                                                 │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ⚠️ 1 artículo no disponible será removido del pedido              │   │
│  │                                                                     │   │
│  │  Subtotal (1 artículo disponible):              $25.00              │   │
│  │  Envío estimado:                                $8.00               │   │
│  │  ───────────────────────────────────────────────────────────────    │   │
│  │  Total:                                        $33.00              │   │
│  │                                                                     │   │
│  │  [🛒 Continuar con el pedido →]                                   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Header con Badge del Carrito

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  🏠 CardTrade   [🔍 Buscar...]   [♡ Favoritos]   [🛒 📍]  [👤]    │   │
│  │                                                        ▲            │   │
│  │                                           Badge con número          │   │
│  │                                           de artículos              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Ejemplos de badge:                                                        │
│                                                                             │
│  Sin artículos:  [🛒]     │  1 artículo:  [🛒 📍]     │  3 artículos: [🛒 3]  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Confirmación de Eliminación

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ⚠️  Eliminar producto del carrito                                 │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ¿Estás seguro de que deseas eliminar "Charizard - Base Set"       │   │
│  │  de tu carrito?                                                     │   │
│  │                                                                     │   │
│  │  ┌────────────────────────────────┐  ┌──────────────────────────┐  │   │
│  │  │  [Cancelar]                   │  │  [🗑️ Sí, eliminar]       │  │   │
│  │  └────────────────────────────────┘  └──────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /carrito
- **Componentes:** CartPage, CartItem, CartSummary, CartBadge, EmptyCart, UnavailableItem, QuantitySelector, DeleteConfirmationModal
- **Endpoints:** GET /api/cart, PUT /api/cart/:itemId/quantity, DELETE /api/cart/:itemId, GET /api/cart/availability
