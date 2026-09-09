# [US-30] Favoritos

**Epic:** Interacción Social
**Prioridad:** Media
**Estimación:** 3 puntos

---

## Descripción

**Como** usuario,
**quiero** guardar cartas en favoritos,
**para** encontrarlas fácilmente después.

---

## Criterios de Aceptación

1. El usuario puede agregar/quitar cartas de favoritos haciendo clic en el ícono de corazón en la tarjeta del catálogo o en la página de detalle de la carta.
2. El ícono de corazón cambia de estado: vacío (no favorito) a relleno (favorito) con animación de transición.
3. El usuario tiene una página "Mis Favoritos" que muestra todas las cartas guardadas en formato de cuadrícula o lista.
4. Se muestra el contador total de favoritos en la página y en el ícono del header.
5. Si una carta en favoritos baja de precio, el usuario recibe una notificación in-app.
6. La funcionalidad de favoritos está disponible solo para usuarios autenticados. No autenticados ven el corazón pero al hacer clic se redirigen a login.
7. Los favoritos se sincronizan entre dispositivos; al iniciar sesión en otro dispositivo se conservan.
8. La página de favoritos permite ordenar por: fecha agregado, precio (mayor/menor), nombre (A-Z).

---

## Wireframe

```
+------------------------------------------------------------------+
|  Mis Favoritos (12 cartas)                                        |
+------------------------------------------------------------------+
|                                                                  |
|  Ordenar: [Más recientes ▼]     [Vista: ▦ Cuadrícula | ☰ Lista] |
|                                                                  |
|  +------------+ +------------+ +------------+ +------------+     |
|  | [Imagen]   | | [Imagen]   | | [Imagen]   | | [Imagen]   |     |
|  | ❤️         | | ❤️         | | ❤️         | | ❤️         |     |
|  | Charizard  | | Pikachu    | | Lugia EX   | | Mewtwo GX  |     |
|  | Base Set   | | VMAX       | |            | |            |     |
|  | $420.00    | | $130.00    | | $85.00     | | $300.00    |     |
|  | Vendedor:  | | Vendedor:  | | Vendedor:  | | Vendedor:  |     |
|  | CardMaster | | VintageC.  | | RarePulls  | | MegaCards  |     |
|  +------------+ +------------+ +------------+ +------------+     |
|                                                                  |
|  +------------+ +------------+ +------------+ +------------+     |
|  | [Imagen]   | | [Imagen]   | | [Imagen]   | | [Imagen]   |     |
|  | ❤️         | | ❤️         | | ❤️         | | ❤️         |     |
|  | Rayquaza   | | Gengar     | | Umbreon    | | Espeon     |     |
|  | VMAX       | | VSTAR      | | VMAX       | | VMAX       |     |
|  | $780.00    | | $250.00    | | $190.00    | | $210.00    |     |
|  | Vendedor:  | | Vendedor:  | | Vendedor:  | | Vendedor:  |     |
|  | CardMaster | | PokeColl.  | | VintageC.  | | RarePulls  |     |
|  +------------+ +------------+ +------------+ +------------+     |
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  Mis Favoritos (12)    [←]  |
+-----------------------------+
|  [Más recientes ▼] [▦ ☰]   |
|                             |
|  +-------------------------+|
|  | ❤️ [Imagen]             ||
|  | Charizard Base Set      ||
|  | $420.00                 ||
|  | CardMasterShop          ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | ❤️ [Imagen]             ||
|  | Pikachu VMAX            ||
|  | $130.00                 ||
|  | VintageCards            ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | ❤️ [Imagen]             ||
|  | Lugia EX                ||
|  | $85.00                  ||
|  | RarePulls               ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | ❤️ [Imagen]             ||
|  | Mewtwo GX               ||
|  | $300.00                 ||
|  | MegaCards               ||
|  +-------------------------+|
|                             |
|  Ver más...                 |
|                             |
+-----------------------------+
```

### Favoritos Vacíos

```
+------------------------------------------------------------------+
|  Mis Favoritos                                                    |
+------------------------------------------------------------------+
|                                                                  |
|                  +------------------+                             |
|                  |                  |                             |
|                  |    (corazón      |                             |
|                  |     vacío)       |                             |
|                  |                  |                             |
|                  +------------------+                             |
|                                                                  |
|          Aún no tienes cartas favoritas                           |
|                                                                  |
|    Explora el catálogo y guarda las cartas que más te gusten     |
|    para encontrarlas fácilmente después.                         |
|                                                                  |
|                  [  Explorar Catálogo  ]                          |
|                                                                  |
+------------------------------------------------------------------+
```

### Botón Favorito (Detalle de Carta)

```
+------------------------------------------------------------------+
|  Charizard Base Set - Holo Rare                                   |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+    Nombre: Charizard Base Set              |
|  |                  |    Rarity: Holo Rare                       |
|  |    [Imagen       |    Colección: Base Set                     |
|  |     Grande]      |    Estado: Near Mint                       |
|  |                  |    Precio: $420.00                         |
|  +------------------+    Vendedor: CardMasterShop (⭐ 4.8)       |
|                                                                  |
|                              [  ❤️ Agregar a Favoritos  ]        |
|                         ó  [  ❤️ En tus Favoritos  ]             |
|                                                                  |
|  [  Comprar Ahora  ]     [  Agregar al Carrito  ]               |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /favorites, /favorites/{cardId} (POST/DELETE)
- **Componentes:** FavoriteButton, FavoriteList, FavoriteCard, FavoriteCounter
- **Endpoints:** POST /api/favorites/{cardId}, DELETE /api/favorites/{cardId}, GET /api/favorites?sort={}&order={}&page={}&limit=20, GET /api/favorites/count
