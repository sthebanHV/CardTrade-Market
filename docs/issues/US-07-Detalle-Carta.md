# [US-07] Detalle de Carta

**Epic:** Catálogo de Cartas
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** ver la información detallada de una carta incluyendo imagen, edición, rareza, precio y vendedor,
**para** tomar una decisión informada antes de comprar.

---

## Criterios de Aceptance

- [ ] Se muestra imagen de alta resolución con zoom al hacer clic
- [ ] Información completa: nombre, tipo, edición, rareza, estado
- [ ] Precio actual destacado
- [ ] Nombre del vendedor con link a su perfil
- [ ] Fecha de publicación
- [ ] Descripción del vendedor (si existe)
- [ ] Botón "Agregar al carrito"
- [ ] Botón "Agregar a favoritos"
- [ ] Botón "Compartir"
- [ ] Sección "Cartas similares" (máx. 4)
- [ ] Historial de precios (si hay datos)
- [ ] Responsive (mobile/desktop)

---

## Wireframe - Detalle Carta Desktop

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  ← Volver a resultados                                   |
|                                                          |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |  +------------------+   CHARIZARD EX FULL ART       | |
|  |  |                  |                               | |
|  |  |                  |   Tipo: Pokémon               | |
|  |  |    [Imagen       |   Edición: Paldea Evolved     | |
|  |  |     Grande]      |   Rareza: Ultra Rare ★★★★     | |
|  |  |                  |   Estado: Nuevo (NM)          | |
|  |  |    [Zoom 🔍]     |                               | |
|  |  |                  |   ──────────────────────────  | |
|  |  +------------------+   PRECIO                      | |
|  |                           $45.00 USD                | |
|  |  [←] [img1] [img2] [img3] [→]                       | |
|  |                           ──────────────────────────  | |
|  |                           Vendedor                   | |
|  |                           +--------+                 | |
|  |                           |Avatar  | CardMaster_MX   | |
|  |                           +--------+ ★★★★☆ (4.2)    | |
|  |                           Ver perfil →               | |
|  |                           ──────────────────────────  | |
|  |                           DESCRIPCIÓN                | |
|  |                           Carta en perfecto estado,  | |
|  |                           sin rayones, protección... | |
|  |                           ──────────────────────────  | |
|  |                           Publicada: 15 Ene 2024     | |
|  |                                                     | |
|  |  +------------------+  +-------------------------+  | |
|  |  |  🛒 AGREGAR AL   |  |  ♡ FAVORITO  |  ↗ COMPARTIR| |
|  |  |     CARRITO      |  +-------------------------+  | |
|  |  +------------------+                               | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  CARTAS SIMILARES                                    | |
|  |  +----------+  +----------+  +----------+          | |
|  |  | [Img]    |  | [Img]    |  | [Img]    |          | |
|  |  |Charizard |  |Charizard |  |Charizard |          | |
|  |  |VMAX      |  |GX        |  |Mega      |          | |
|  |  |$89.00    |  |$25.00    |  |$120.00   |          | |
|  |  +----------+  +----------+  +----------+          | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Detalle Carta Mobile

```
+---------------------------+
| [←] CardTrade      [🛒]  |
+---------------------------+
|                           |
| +-----------------------+|
| |                       ||
| |    [Imagen Grande]    ||
| |                       ||
| |      [Zoom 🔍]        ||
| |                       ||
| +-----------------------+|
| [1] [2] [3] [4]         |
|                           |
| CHARIZARD EX FULL ART     |
|                           |
| Tipo: Pokémon             |
| Edición: Paldea Evolved   |
| Rareza: Ultra Rare ★★★★  |
| Estado: Nuevo (NM)        |
|                           |
| $45.00 USD                |
|                           |
| +-----------------------+|
| | 🛒 AGREGAR AL CARRITO ||
| +-----------------------+|
|                           |
| ♡ Favorito  |  ↗ Compartir|
|                           |
| Vendedor                  |
| +------+ CardMaster_MX    |
| |Avatar| ★★★★☆ (4.2)    |
| +------+ Ver perfil →     |
|                           |
| Descripción               |
| Carta en perfecto estado, |
| sin rayones...            |
|                           |
| Publicada: 15 Ene 2024    |
|                           |
+---------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/card/:id`
- **Componentes:** `CardDetail`, `ImageGallery`, `ZoomModal`, `SellerInfo`, `SimilarCards`
- **Endpoint:** `GET /api/cards/:id`
- **Galería:** Carrusel de imágenes con zoom modal
