# [US-20] Sistema de Notificaciones

**Epic:** Panel de Control y Extras
**Prioridad:** Baja
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** recibir notificaciones sobre actividad relevante en mi cuenta,
**para** estar informado sobre ventas, compras y mensajes importantes.

---

## Criterios de Aceptance

- [ ] Centro de notificaciones accesible desde el header
- [ ] Badge con contador de notificaciones no leídas
- [ ] Lista de notificaciones ordenadas por fecha (más reciente primero)
- [ ] Cada notificación muestra: icono, mensaje, fecha, link
- [ ] Tipos de notificación:
  - Nueva venta realizada
  - Nueva compra recibida
  - Carta en favoritos con precio reducido
  - Mensaje de un usuario
  - Recordatorios
- [ ] Marcar como leída (individual y todas)
- [ ] Eliminar notificación
- [ ] Configuración de notificaciones (activar/desactivar por tipo)
- [ ] Notificaciones push (opcional, futuro)

---

## Wireframe - Centro de Notificaciones

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Buscar...]  [🔔(3)] [≡] |
+----------------------------------------------------------+
                                              ↑
                                              | Click aquí
                                              ▼
                                    +-------------------+
                                    | NOTIFICACIONES    |
                                    | (3 nuevas)        |
                                    +-------------------+
                                    |                   |
                                    | 🔔 [img]          |
                                    | Tu carta "Charizar|
                                    | ex" fue vista 12  |
                                    | veces             |
                                    | Hace 2 horas  [×] |
                                    |                   |
                                    | ───────────────── |
                                    |                   |
                                    | 💰 [img]          |
                                    | ¡Nueva venta!     |
                                    | Pikachu vendido a |
                                    | CardFan99         |
                                    | Hace 5 horas  [×] |
                                    |                   |
                                    | ───────────────── |
                                    |                   |
                                    | ⭐ [img]          |
                                    | CardMaster_MX te  |
                                    | dejó una reseña   |
                                    | ★★★★★             |
                                    | Hace 1 día    [×] |
                                    |                   |
                                    | ───────────────── |
                                    |                   |
                                    | [Marcar todas     |
                                    |  como leídas]     |
                                    |                   |
                                    | [Ver todas →]     |
                                    |                   |
                                    +-------------------+
```

---

## Wireframe - Notificaciones (Mobile)

```
+---------------------------+
| [≡] CardTrade    [🔔(3)] |
+---------------------------+
|                           |
| NOTIFICACIONES (3 nuevas) |
|                           |
| 🔔 Tu carta "Charizard"  |
| fue vista 12 veces       |
| Hace 2 horas         [×] |
|                           |
| ─────────────────────────|
|                           |
| 💰 ¡Nueva venta!         |
| Pikachu vendido a        |
| CardFan99                |
| Hace 5 horas         [×] |
|                           |
| ─────────────────────────|
|                           |
| ⭐ CardMaster_MX te      |
| dejó una reseña ★★★★★    |
| Hace 1 día           [×] |
|                           |
| ─────────────────────────|
|                           |
| [Marcar todas como leídas]|
|                           |
+---------------------------+
```

---

## Wireframe - Configuración de Notificaciones

```
+----------------------------------------------------------+
|  CONFIGURACIÓN DE NOTIFICACIONES                          |
+----------------------------------------------------------+
|                                                          |
|  NOTIFICACIONES IN-APP                                   |
|  ──────────────────────────────────────────────────────  |
|  Nuevas ventas                          [  ON  ]        |
|  Nuevas compras                         [  ON  ]        |
|  Cartas favoritas con precio reducido   [  ON  ]        |
|  Mensajes de usuarios                   [  ON  ]        |
|  Recordatorios                          [ OFF  ]        |
|                                                          |
|  NOTIFICACIONES POR EMAIL                                |
|  ──────────────────────────────────────────────────────  |
|  Resumen semanal de actividad           [  ON  ]        |
|  Ofertas y promociones                  [ OFF  ]        |
|                                                          |
|  +-----------------------------+                        |
|  |      GUARDAR CAMBIOS        |                        |
|  +-----------------------------+                        |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Notificación Push (Futuro)

```
+-----------------------------------+
|  📱 CardTrade Market              |
|                                   |
|  ¡Nueva venta!                    |
|  Tu carta "Pikachu Full Art"      |
|  fue comprada por CardFan99       |
|  por $28.00                       |
|                                   |
|  [Ver]  [Cerrar]                  |
+-----------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/notifications`
- **Componentes:** `NotificationCenter`, `NotificationItem`, `NotificationBadge`, `NotificationSettings`
- **Endpoints:**
  - `GET /api/notifications` - Obtener notificaciones
  - `PATCH /api/notifications/:id/read` - Marcar como leída
  - `PATCH /api/notifications/read-all` - Marcar todas como leídas
  - `DELETE /api/notifications/:id` - Eliminar notificación
  - `GET /api/notifications/count` - Conteo de no leídas
  - `PUT /api/notifications/settings` - Configuración
- **Tiempo real:** WebSocket o Server-Sent Events (opcional)
