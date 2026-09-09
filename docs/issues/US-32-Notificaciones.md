# [US-32] Centro de Notificaciones

**Epic:** Panel de Control y Extras
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** usuario,
**quiero** recibir notificaciones sobre actividad relevante,
**para** estar informado sobre ventas y compras.

---

## Criterios de Aceptación

1. El centro de notificaciones está accesible desde el header de la aplicación mediante un ícono de campana con badge del contador de notificaciones no leídas.
2. Al hacer clic en el ícono se despliega un panel con la lista de notificaciones ordenadas por fecha (más recientes primero).
3. Los tipos de notificación son: nueva venta realizada, compra recibida, precio reducido en favorito, nuevo mensaje de chat y recordatorio de publicación.
4. Cada notificación muestra: ícono del tipo, mensaje descriptivo, marca de tiempo y estado (leída/no leída).
5. El usuario puede marcar una notificación como leída haciendo clic sobre ella, o marcar todas como leídas con un botón dedicado.
6. El usuario puede eliminar notificaciones individualmente con botón de eliminar.
7. El usuario puede acceder a la configuración de notificaciones para activar/desactivar cada tipo por separado.
8. Las notificaciones no leídas se resaltan visualmente (fondo diferente o punto indicador).
9. Las notificaciones se actualizan en tiempo real a través de WebSockets.
10. Se muestra un máximo de 50 notificaciones. Las más antiguas se archivan automáticamente.

---

## Wireframe

```
+------------------------------------------------------------------+
|  [🏠] [🔍] [📦] [🛒] [🔔 3]  [👤 Carlos]                       |
+------------------------------------------------------------------+
|                                                                  |
|                    (Panel de Notificaciones)                      |
|  +--------------------------------------------------------------+|
|  |  Notificaciones                          [Marcar todas como  ||
|  |                                           leídas] [⚙ Config] ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  🔔  Nueva venta realizada                                   ||
|  |      Has vendido "Charizard Base Set" por $450.00            ||
|  |      Hace 5 minutos                                          ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  💬  Nuevo mensaje                                           ||
|  |      Juan Pérez te ha enviado un mensaje                    ||
|  |      Hace 15 minutos                          ● (no leído)   ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  💰  Precio reducido                                         ||
|  |      "Pikachu VMAX" bajó de $150 a $120                     ||
|  |      Hace 1 hora                                             ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  📦  Compra recibida                                         ||
|  |      Tu compra de "Lugia EX" está en camino                 ||
|  |      Hace 3 horas                             ● (no leído)   ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  ⏰  Recordatorio                                            ||
|  |      Tu publicación "Mewtwo GX" lleva 7 días sin vistas     ||
|  |      Ayer                                                  ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  📦  Compra recibida                                         ||
|  |      Tu compra de "Gengar VSTAR" fue entregada              ||
|  |      06/09/2026                                             ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |  💰  Precio reducido                                         ||
|  |      "Umbreon VMAX" bajó de $220 a $190                     ||
|  |      05/09/2026                                             ||
|  +--------------------------------------------------------------+|
|  |                                                              ||
|  |               Cargar más notificaciones...                   ||
|  |                                                              ||
|  +--------------------------------------------------------------+|
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  Notificaciones        [←]  |
+-----------------------------+
|  [Marcar leídas] [⚙]       |
|                             |
|  +-------------------------+|
|  | 🔔 Nueva venta          ||
|  | Vendiste Charizard $450 ||
|  | Hace 5m                 ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | 💬 Nuevo mensaje        ||
|  | Juan P. te escribió    ||
|  | Hace 15m          ●    ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | 💰 Precio reducido      ||
|  | Pikachu VMAX: $150→$120 ||
|  | Hace 1h                 ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | 📦 Compra recibida      ||
|  | Lugia EX en camino      ||
|  | Hace 3h           ●    ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | ⏰ Recordatorio         ||
|  | Mewtwo GX sin vistas    ||
|  | Ayer                    ||
|  +-------------------------+|
|                             |
|  Cargar más...              |
|                             |
+-----------------------------+
```

### Configuración de Notificaciones

```
+------------------------------------------------------------------+
|  Configuración de Notificaciones                                  |
+------------------------------------------------------------------+
|                                                                  |
|  Notificaciones In-App                                           |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Nuevas ventas realizadas                                        |
|  [x] Activar  (cuando vendas una carta)                          |
|                                                                  |
|  Compras recibidas                                               |
|  [x] Activar  (actualizaciones de tus compras)                   |
|                                                                  |
|  Precio reducido en favoritos                                    |
|  [x] Activar  (cuando una carta guardada baja de precio)         |
|                                                                  |
|  Nuevos mensajes de chat                                         |
|  [x] Activar  (cuando recibas un mensaje)                        |
|                                                                  |
|  Recordatorios                                                   |
|  [x] Activar  (recordatorios de publicaciones y pagos)           |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Notificaciones por Correo                                       |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Nuevas ventas realizadas                                        |
|  [x] Activar  cardtrade@email.com                                |
|                                                                  |
|  Compras recibidas                                               |
|  [x] Activar  cardtrade@email.com                                |
|                                                                  |
|  Precio reducido en favoritos                                    |
|  [ ] Activar                                                     |
|                                                                  |
|  Nuevos mensajes de chat                                         |
|  [ ] Activar                                                     |
|                                                                  |
|  Recordatorios                                                   |
|  [x] Activar  cardtrade@email.com                                |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Notificaciones Push (Próximamente)                              |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  [ ] Activar notificaciones push                                 |
|  (Disponible próximamente para dispositivos móviles)             |
|                                                                  |
|              [  Guardar Configuración  ]                         |
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile - Configuración

```
+-----------------------------+
|  Config Notificaciones [←]  |
+-----------------------------+
|                             |
|  In-App                     |
|  ───────────────────────    |
|                             |
|  Nuevas ventas    [x]      |
|  Compras recib.   [x]      |
|  Precio favoritos [x]      |
|  Mensajes chat    [x]      |
|  Recordatorios    [x]      |
|                             |
|  Correo                    |
|  ───────────────────────    |
|                             |
|  Nuevas ventas    [x]      |
|  Compras recib.   [x]      |
|  Precio favoritos [ ]      |
|  Mensajes chat    [ ]      |
|  Recordatorios    [x]      |
|                             |
|  Push (Próximamente)        |
|  ───────────────────────    |
|  [ ] Activar push           |
|                             |
|  [ Guardar Configuración ]  |
|                             |
+-----------------------------+
```

---

## Notas Técnicas

- **Ruta:** /notifications, /notifications/settings
- **Componentes:** NotificationBell, NotificationPanel, NotificationItem, NotificationSettings, NotificationBadge
- **Endpoints:** GET /api/notifications?page={}&limit=50, PUT /api/notifications/{id}/read, PUT /api/notifications/read-all, DELETE /api/notifications/{id}, GET /api/notifications/settings, PUT /api/notifications/settings
- **WebSocket:** Conexión para recibir notificaciones en tiempo real. Eventos: new_notification, notification_read, notification_deleted.
