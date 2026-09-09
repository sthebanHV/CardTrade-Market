# [US-26] Seguir Vendedor

**Epic:** Historial y Seguimiento
**Prioridad:** Baja
**Estimación:** 3 puntos

---

## Descripción

**Como** usuario,
**quiero** seguir vendedores de confianza,
**para** enterarme de sus nuevas publicaciones.

---

## Criterios de Aceptación

1. El usuario puede hacer clic en el botón "Seguir vendedor" en el perfil de cualquier vendedor para comenzar a seguirlo.
2. El botón cambia a "Siguiendo" con opción de dejar de seguir al hacer clic nuevamente.
3. El usuario tiene acceso a una página "Vendedores Seguidos" que muestra todos los vendedores que sigue con sus datos básicos (nombre, foto, reputación, total de publicaciones activas).
4. El usuario recibe una notificación in-app cuando un vendedor que sigue publica nuevas cartas.
5. En el catálogo de cartas existe un filtro "De vendedores que sigues" que muestra únicamente publicaciones de vendedores seguidos.
6. El usuario puede dejar de seguir a un vendedor desde la página de seguidos o desde el perfil del vendedor.
7. El contador de seguidores es visible en el perfil del vendedor (solo la cantidad, no los nombres).
8. La funcionalidad está disponible solo para usuarios autenticados. No autenticados ven el botón pero al hacer clic se redirigen a login.

---

## Wireframe

```
+------------------------------------------------------------------+
|  Perfil del Vendedor: CardMasterShop                              |
+------------------------------------------------------------------+
|                                                                  |
|  +-----------+                                                   |
|  |           |  CardMasterShop                                    |
|  |  [Foto]   |  ⭐ 4.8 (124 reseñas)                             |
|  |           |  Miembro desde Ene 2025                            |
|  +-----------+  89 publicaciones activas                          |
|               156 ventas completadas                              |
|                                                                  |
|  [  Seguir Vendedor  ]  ó  [✓ Siguiendo]                        |
|                                                                  |
|  ────────────────────────────────────────────                    |
|  Publicaciones activas (89)                                      |
|  ────────────────────────────────────────────                    |
|  +------------+ +------------+ +------------+                    |
|  | [Carta 1]  | | [Carta 2]  | | [Carta 3]  |                    |
|  | $120.00    | | $85.00     | | $340.00    |                    |
|  +------------+ +------------+ +------------+                    |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  CardMasterShop        [←]  |
+-----------------------------+
|                             |
|       +-----------+         |
|       |           |         |
|       |  [Foto]   |         |
|       |           |         |
|       +-----------+         |
|                             |
|  CardMasterShop             |
|  ⭐ 4.8 (124 reseñas)      |
|  Miembro desde Ene 2025     |
|  89 publicaciones activas   |
|  156 ventas completadas     |
|                             |
|  [  Seguir Vendedor  ]      |
|                             |
|  ───────────────────────    |
|  Publicaciones (89)         |
|  ───────────────────────    |
|  +-------------------------+|
|  | [Carta 1] - $120.00    ||
|  +-------------------------+|
|  +-------------------------+|
|  | [Carta 2] - $85.00     ||
|  +-------------------------+|
|  +-------------------------+|
|  | [Carta 3] - $340.00    ||
|  +-------------------------+|
|                             |
+-----------------------------+
```

### Página de Vendedores Seguidos

```
+------------------------------------------------------------------+
|  Vendedores Seguidos                                              |
+------------------------------------------------------------------+
|                                                                  |
|  Siguiendo a 5 vendedores                                        |
|                                                                  |
|  +------------------------------------------------------------------+
|  | +------+  CardMasterShop                  ⭐ 4.8   89 activas  |
|  | | Foto |  156 ventas completadas          [Dejar de seguir]    |
|  +------------------------------------------------------------------+
|  | +------+  VintageCards                   ⭐ 4.9   203 activas  |
|  | | Foto |  312 ventas completadas          [Dejar de seguir]    |
|  +------------------------------------------------------------------+
|  | +------+  PokeCollector                  ⭐ 4.6   45 activas   |
|  | | Foto |  78 ventas completadas           [Dejar de seguir]    |
|  +------------------------------------------------------------------+
|  | +------+  RarePulls                      ⭐ 4.7   120 activas  |
|  | | Foto |  201 ventas completadas          [Dejar de seguir]    |
|  +------------------------------------------------------------------+
|  | +------+  MegaCards                      ⭐ 4.5   67 activas   |
|  | | Foto |  98 ventas completadas           [Dejar de seguir]    |
|  +------------------------------------------------------------------+
|                                                                  |
+------------------------------------------------------------------+
```

### Notificación de Nueva Publicación

```
+------------------------------------------------------------------+
| 🔔 Nueva publicación                                              |
+------------------------------------------------------------------+
|                                                                  |
| CardMasterShop acaba de publicar 3 nuevas cartas                 |
|                                                                  |
| +------------+ +------------+ +------------+                     |
| | [Carta 1]  | | [Carta 2]  | | [Carta 3]  |                     |
| | $95.00     | | $210.00    | | $78.00     |                     |
| +------------+ +------------+ +------------+                     |
|                                                                  |
| [Ver publicaciones]                              Hace 5 minutos  |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /vendors/{id}/follow (POST/DELETE), /following, /catalog?following=true
- **Componentes:** FollowButton, FollowingList, VendorCard, NotificationBadge
- **Endpoints:** POST /api/vendors/{id}/follow, DELETE /api/vendors/{id}/follow, GET /api/users/following, GET /api/catalog?following=true
