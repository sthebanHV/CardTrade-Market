# [US-45] Centro de Notificaciones

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Tipos de notificación ajustables
- **Valioso**: Mantiene al usuario informado de todo
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que se reciben y muestran notificaciones

---

## Historia de Usuario

**Como** usuario,
**quiero** recibir notificaciones de mensajes, ventas y ofertas,
**para** estar al tanto de toda mi actividad.

---

## Criterios de Aceptación

1. Centro de notificaciones accesible desde el menú
2. Badge con número de notificaciones sin leer
3. Tipos: Mensajes, Ventas, Compras, Reseñas, Sistema
4. Marcar como leída individual o todas
5. Eliminar notificaciones
6. Configurar qué notificaciones recibir por email

---

## Wireframe

### Icono de Notificaciones

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍] [🛒] [🔔(5)] [👤]     |
+----------------------------------------------------------+
                                                  ↑ Badge
```

### Centro de Notificaciones

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  🔔 NOTIFICACIONES (5 sin leer)                     | |
|  |                                                     | |
|  |  [Marcar todas como leídas]                         | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  💬 NUEVO MENSAJE - CardMaster_MX                   | |
|  |  "Hola! ¿La Charizard ex sigue disponible?"        | |
|  |  hace 2 horas                    [Marcar como leído] | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  💰 VENTA COMPLETADA                                | |
|  |  Vendiste "Pikachu VMAX" por $28.00                 | |
|  |  hace 5 horas                    [Marcar como leído] | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  ⭐ NUEVA RESEÑA                                    | |
|  |  TCG_Fan te dejó 5 estrellas                        | |
|  |  hace 1 día                      [Marcar como leído] | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  🏷️ ALERTA DE PRECIO                                | |
|  |  "Blue-Eyes White Dragon" bajó a $85.00             | |
|  |  hace 2 días                    [Marcar como leído] | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  📦 ENVÍO ACTUALIZADO                               | |
|  |  Tu pedido #CTM-2026-001234 está en tránsito        | |
|  |  hace 3 días                    [Marcar como leído] | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/notifications`
- **Componentes**: `NotificationCenter`, `NotificationItem`, `NotificationBadge`
- **Endpoints**:
  - `GET /api/notifications` - Obtener notificaciones
  - `PATCH /api/notifications/:id/read` - Marcar como leída
  - `PATCH /api/notifications/read-all` - Marcar todas como leídas
  - `DELETE /api/notifications/:id` - Eliminar notificación
- **WebSocket**: Notificaciones en tiempo real
- **Push**: Implementar push notifications para móvil
