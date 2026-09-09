# [US-31] Dashboard de Usuario

**Epic:** Panel de Control y Extras
**Prioridad:** Media
**Estimación:** 6 puntos

---

## Descripción

**Como** usuario registrado,
**quiero** tener un panel central con resumen de mi actividad,
**para** acceder rápidamente a las funcionalidades más usadas.

---

## Criterios de Aceptación

1. El dashboard muestra un mensaje de bienvenida personalizado con el nombre del usuario.
2. Se muestra un resumen de la colección: total de cartas en inventario y valor estimado total del inventario.
3. Se muestran las publicaciones activas del usuario con conteo y acceso rápido para gestionarlas.
4. Se listan las últimas 3 ventas recientes con fecha, monto y estado.
5. Se listan las últimas 3 compras recientes con fecha, monto y estado.
6. Se muestra el contador de notificaciones pendientes (no leídas) con acceso al centro de notificaciones.
7. Se incluyen accesos rápidos: botón para publicar, ir a colección y ver carrito.
8. Si el usuario no tiene actividad (nueva cuenta), se muestra un estado vacío con llamado a la acción para empezar a usar la plataforma (publicar primera carta, explorar catálogo, completar perfil).
9. El dashboard es responsive y se adapta correctamente a desktop, tablet y móvil.

---

## Wireframe

```
+------------------------------------------------------------------+
|  ¡Bienvenido, Carlos! 🎴                                          |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------+  +------------------+  +------------------+|
|  | Mi Colección     |  | Mis Ventas       |  | Notificaciones   ||
|  | 156 cartas       |  | $12,450.00       |  | 3 sin leer       ||
|  | Valor: $8,230.00 |  | Este mes: 8      |  |                  ||
|  +------------------+  +------------------+  +------------------+|
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Accesos Rápidos                                                 |
|  +------------------+  +------------------+  +------------------+|
|  |  📝 Publicar     |  |  📦 Colección    |  |  🛒 Carrito     ||
|  |  Nueva Carta     |  |  Ver Inventario  |  |  Ver Carrito     ||
|  +------------------+  +------------------+  +------------------+|
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Publicaciones Activas (12)                                       |
|  +------------------------------------------------------------------+
|  | #012  Charizard Base Set - Holo      $450.00   ✓ Activa       |
|  | #015  Pikachu VMAX Full Art          $180.00   ✓ Activa       |
|  | #018  Lugia EX Rainbow               $320.00   ✓ Activa       |
|  +------------------------------------------------------------------+
|  Ver todas mis publicaciones (12) →                               |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Ventas Recientes                     Compras Recientes          |
|  +------------------------------+  +------------------------------+
|  | 08/09 - Charizard BS         |  | 07/09 - Mew VMAX            |
|  | $450.00 ✓ Completada         |  | $95.00 ✓ Recibida           |
|  | Comprador: Juan P.           |  | Vendedor: RarePulls         |
|  +------------------------------+  +------------------------------+
|  | 06/09 - Pikachu VMAX         |  | 05/09 - Gengar VSTAR        |
|  | $120.00 ✓ Completada         |  | $250.00 ✓ Recibida          |
|  | Comprador: Ana L.            |  | Vendedor: PokeCollector     |
|  +------------------------------+  +------------------------------+
|  | 03/09 - Lugia EX + 2 más     |  | 01/09 - Umbreon VMAX        |
|  | $890.00 ⏳ Pendiente         |  | $190.00 ⏳ Enviado          |
|  | Comprador: Carlos M.         |  | Vendedor: VintageCards      |
|  +------------------------------+  +------------------------------+
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  ¡Bienvenido, Carlos!  [≡]  |
+-----------------------------+
|                             |
|  +-------------------------+|
|  | Mi Colección            ||
|  | 156 cartas              ||
|  | Valor: $8,230.00        ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | Mis Ventas              ||
|  | $12,450.00 este mes     ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | Notificaciones          ||
|  | 3 sin leer        🔴   ||
|  +-------------------------+|
|                             |
|  ───────────────────────    |
|  Accesos Rápidos            |
|  ───────────────────────    |
|                             |
|  [📝 Publicar] [📦 Colecc.] |
|  [🛒 Carrito]               |
|                             |
|  ───────────────────────    |
|  Publicaciones (12)         |
|  ───────────────────────    |
|  #012 Charizard $450 ✓      |
|  #015 Pikachu $180 ✓        |
|  #018 Lugia EX $320 ✓       |
|  Ver todas →                |
|                             |
|  ───────────────────────    |
|  Ventas Recientes           |
|  ───────────────────────    |
|  08/09 Charizard $450 ✓    |
|  06/09 Pikachu $120 ✓     |
|  03/09 Lugia EX $890 ⏳    |
|                             |
|  Compras Recientes          |
|  ───────────────────────    |
|  07/09 Mew VMAX $95 ✓     |
|  05/09 Gengar $250 ✓      |
|  01/09 Umbreon $190 ⏳     |
|                             |
+-----------------------------+
```

### Estado Vacío (Nueva Cuenta)

```
+------------------------------------------------------------------+
|  ¡Bienvenido, Carlos! 🎴                                          |
+------------------------------------------------------------------+
|                                                                  |
|                  +------------------+                             |
|                  |                  |                             |
|                  |   (ilustración   |                             |
|                  |    de bienvenida)|                             |
|                  |                  |                             |
|                  +------------------+                             |
|                                                                  |
|          ¡Empieza tu aventura en CardTrade Market!               |
|                                                                  |
|    Tu panel se llenará de actividad a medida que publiques       |
|    cartas, realices compras y vendas en la plataforma.          |
|                                                                  |
|  +------------------+  +------------------+  +------------------+|
|  |  📝 Publicar     |  |  🔍 Explorar     |  |  👤 Mi Perfil   ||
|  |  Mi Primera Carta|  |  Catálogo        |  |  Completar      ||
|  +------------------+  +------------------+  +------------------+|
|                                                                  |
|  Guía rápida:                                                    |
|  1. Publica tu primera carta para empezar a vender               |
|  2. Explora el catálogo para encontrar cartas que buscas         |
|  3. Completa tu perfil para generar confianza                    |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /dashboard
- **Componentes:** DashboardPage, WelcomeCard, StatsCard, QuickActions, RecentSalesList, RecentPurchasesList, ActivePublicationsList, EmptyState
- **Endpoints:** GET /api/dashboard, GET /api/dashboard/stats, GET /api/dashboard/recent-sales, GET /api/dashboard/recent-purchases
