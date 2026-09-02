# [US-11] Carrito de Compras

**Epic:** Proceso de Compra
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** agregar cartas a un carrito de compras y revisarlas antes de pagar,
**para** comprar múltiples cartas en una sola transacción.

---

## Criterios de Aceptance

- [ ] Botón "Agregar al carrito" en detalle de carta
- [ ] Icono del carrito en el header con contador de artículos
- [ ] Página del carrito muestra: imagen, nombre, precio, vendedor
- [ ] Puedo eliminar artículos del carrito
- [ ] Se muestra el total a pagar
- [ ] Se verifica disponibilidad de cada carta
- [ ] Si una carta ya no está disponible, se indica y se puede eliminar
- [ ] Carrito persiste entre sesiones (guardado en BD)
- [ ] Máximo 1 unidad por carta (cada carta es única)
- [ ] Botón "Proceder al pago"

---

## Wireframe - Icono del Carrito (Header)

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Buscar...]  [🛒(2)] [≡] |
+----------------------------------------------------------+
                                              ↑ Badge con
                                                número de
                                                artículos
```

---

## Wireframe - Carrito de Compras

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MI CARRITO (2 artículos)                            | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |  +------+  CHARIZARD EX FULL ART                    | |
|  |  |      |  Tipo: Pokémon | Ultra Rare | Nuevo (NM)  | |
|  |  | [img]|  Vendedor: CardMaster_MX                  | |
|  |  |      |  $45.00 USD                               | |
|  |  +------+  [Eliminar]                               | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  +------+  PIKACHU FULL ART                         | |
|  |  |      |  Tipo: Pokémon | Rare | Nuevo (NM)        | |
|  |  | [img]|  Vendedor: PikachuFan                     | |
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
|  |  |         PROCEDER AL PAGO                      |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Seguir comprando]                                 | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Carrito Vacío

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |                                                     | |
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
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Carta No Disponible en Carrito

```
+------+  CHARIZARD EX FULL ART
|      |  Tipo: Pokémon | Ultra Rare | Nuevo (NM)
| [img]|  Vendedor: CardMaster_MX
|      |  $45.00 USD
+------+  ⚠️ Esta carta ya no está disponible
          [Eliminar del carrito]
```

---

## Notas Técnicas

- **Ruta:** `/cart`
- **Componentes:** `CartPage`, `CartItem`, `CartSummary`, `EmptyCart`, `UnavailableItem`
- **Endpoints:**
  - `GET /api/cart` - Obtener carrito
  - `POST /api/cart` - Agregar item
  - `DELETE /api/cart/:cardId` - Eliminar item
  - `PATCH /api/cart` - Actualizar (verificar disponibilidad)
- **Estado global:** Context API o Redux para el carrito
