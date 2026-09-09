# [US-28] Reseñas y Calificaciones

**Epic:** Interacción Social
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** comprador,
**quiero** reseñar vendedores después de una compra,
**para** ayudar a otros compradores.

---

## Criterios de Aceptación

1. Después de completar una compra, el sistema muestra un formulario de reseña accesible desde "Mis Compras" o desde un enlace en el correo de confirmación.
2. El formulario permite asignar una calificación de 1 a 5 estrellas y escribir un comentario de hasta 500 caracteres.
3. Solo se puede dejar una reseña por compra. Si ya se reseñó, se muestra la reseña existente con opción de edición.
4. Las reseñas son visibles en el perfil del vendedor, ordenadas por fecha (más recientes primero).
5. El perfil del vendedor muestra el promedio de calificación actualizado en tiempo real y el total de reseñas recibidas.
6. El comprador puede editar su reseña en un plazo de 30 días después de publicarla.
7. Un usuario no puede reseñarse a sí mismo. El botón de reseña no aparece si el comprador y el vendedor son el mismo usuario.
8. Las reseñas no contienen información sensible ni enlaces externos. El sistema filtra contenido inapropiado.

---

## Wireframe

```
+------------------------------------------------------------------+
|  Dejar Reseña - CardMasterShop                                    |
+------------------------------------------------------------------+
|                                                                  |
|  Compra #0045 - 05/09/2026                                       |
|  Artículos: Charizard Base Set, Pikachu VMAX                     |
|  Total: $570.00                                                  |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Calificación:                                                   |
|  ★ ★ ★ ★ ☆  (4 de 5 estrellas)                                  |
|                                                                  |
|  Tu reseña:                                                      |
|  +------------------------------------------------------------+  |
|  | Excelente vendedor, el envío fue rápido y las cartas       |  |
|  | llegaron en perfecto estado. Muy recomendable.             |  |
|  |                                                            |  |
|  |                                              127/500       |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  [x] Publicar reseña también en mi perfil                        |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|         [ Cancelar ]          [  Publicar Reseña  ]              |
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  Dejar Reseña          [←]  |
+-----------------------------+
|                             |
|  Compra #0045               |
|  05/09/2026                 |
|  Charizard + Pikachu VMAX   |
|  Total: $570.00             |
|                             |
|  ───────────────────────    |
|                             |
|  Calificación:              |
|  ★ ★ ★ ★ ☆                 |
|                             |
|  Tu reseña:                 |
|  +-------------------------+|
|  | Excelente vendedor,    ||
|  | el envío fue rápido y  ||
|  | las cartas llegaron en ||
|  | perfecto estado.       ||
|  |                        ||
|  |              127/500   ||
|  +-------------------------+|
|                             |
|  [Cancelar] [Publicar]      |
|                             |
+-----------------------------+
```

### Reseñas en Perfil del Vendedor

```
+------------------------------------------------------------------+
|  Reseñas - CardMasterShop                                         |
+------------------------------------------------------------------+
|                                                                  |
|  ⭐ 4.8  (124 reseñas)                                           |
|  ★★★★★ 78  ★★★★☆ 32  ★★★☆☆ 10  ★★☆☆☆ 3  ★☆☆☆☆ 1              |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  +------------------------------------------------------------------+
|  | ⭐⭐⭐⭐⭐  Juan Pérez - 08/09/2026                              |
|  | Excelente vendedor, el envío fue rápido y las cartas llegaron  |
|  | en perfecto estado. Muy recomendable.                          |
|  +------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------------+
|  | ⭐⭐⭐⭐⭐  María López - 07/09/2026                             |
|  | Todo perfecto, cartas tal como se describían. Recomendado.     |
|  +------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------------+
|  | ⭐⭐⭐⭐☆  Carlos Martínez - 05/09/2026                         |
|  | Buen vendedor, aunque el envío tardó un poco más de lo         |
|  | esperado. Las cartas en buen estado.                           |
|  +------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------------+
|  | ⭐⭐⭐⭐⭐  Ana Rodríguez - 03/09/2026                           |
|  | ¡Súper recomendado! Paquete bien embalado y atención          |
|  | excelente. Volveré a comprar.                                  |
|  +------------------------------------------------------------------+
|                                                                  |
|  Ver todas las reseñas (124) →                                    |
|                                                                  |
+------------------------------------------------------------------+
```

### Estado: Reseña Ya Publicada

```
+------------------------------------------------------------------+
|  Tu Reseña - CardMasterShop                                       |
+------------------------------------------------------------------+
|                                                                  |
|  Compra #0045 - 05/09/2026                                       |
|                                                                  |
|  Calificación: ★ ★ ★ ★ ☆  (4 de 5)                              |
|                                                                  |
|  "Excelente vendedor, el envío fue rápido y las cartas          |
|   llegaron en perfecto estado. Muy recomendable."                |
|                                                                  |
|  Publicada: 06/09/2026                                           |
|  (Puedes editar hasta el 06/10/2026)                             |
|                                                                  |
|  [ Editar Reseña ]                                               |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /reviews/new/{orderId}, /vendor/{id}/reviews, /reviews/{id}/edit
- **Componentes:** ReviewForm, ReviewCard, ReviewList, StarRating, VendorReviewSummary
- **Endpoints:** POST /api/reviews {orderId, rating, comment}, GET /api/vendors/{id}/reviews, PUT /api/reviews/{id}, GET /api/vendors/{id}/reviews/stats
