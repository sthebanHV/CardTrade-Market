# [US-29] Chat entre Usuarios

**Epic:** Interacción Social
**Prioridad:** Baja
**Estimación:** 8 puntos

---

## Descripción

**Como** usuario,
**quiero** comunicarme con vendedores/compradores por chat,
**para** coordinar detalles de la transacción.

---

## Criterios de Aceptación

1. El usuario puede iniciar una conversación haciendo clic en el botón "Contactar" en el perfil de un vendedor o en la página de detalle de una carta.
2. Se muestra una lista de todas las conversaciones activas, ordenadas por el último mensaje recibido, con nombre del otro usuario, foto, último mensaje y marca de tiempo.
3. Los mensajes se envían y reciben en tiempo real utilizando WebSockets sin necesidad de recargar la página.
4. El chat soporta envío de texto y, opcionalmente, imágenes (capturas, fotos de estado de carta).
5. Los mensajes no leídos se marcan con un indicador visual (punto azul o negrita) tanto en la lista como en la conversación.
6. El usuario recibe una notificación in-app y push cuando recibe un nuevo mensaje de un usuario con quien tiene conversación activa.
7. El historial de chat es persistente; al cerrar y volver a abrir la aplicación, los mensajes anteriores siguen disponibles.
8. El usuario puede bloquear a otro usuario, lo que impide el envío y recepción de mensajes entre ambos. Opción de bloquear accesible desde la conversación o el perfil.

---

## Wireframe

```
+------------------------------------------------------------------+
|  Mensajes                                                         |
+------------------------------------------------------------------+
|  Buscar conversación...                           [Nueva chats]  |
|  +------------------------------------------------------------------+
|  | +------+  Juan Pérez                              Hace 5 min  |
|  | | Foto |  "¿La carta sigue disponible?"           ●          |
|  | +------+                                                    |
|  +------------------------------------------------------------------+
|  | +------+  María López                            Hace 1 hora  |
|  | | Foto |  "Perfecto, quedo en el punto de..."     ✓✓         |
|  | +------+                                                    |
|  +------------------------------------------------------------------+
|  | +------+  Carlos Martínez                        Ayer        |
|  | | Foto |  "Recibí el paquete, todo bien"          ✓✓         |
|  | +------+                                                    |
|  +------------------------------------------------------------------+
|  | +------+  Ana Rodríguez                          06/09       |
|  | | Foto |  "¿Tienes más cartas de la serie?"       ✓✓         |
|  | +------+                                                    |
|  +------------------------------------------------------------------+
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  Mensajes              [←]  |
+-----------------------------+
|  Buscar...                  |
|                             |
|  +-------------------------+|
|  | +---+ Juan Pérez       ||
|  | | F | "¿Sigue dispo?" ||
|  | +---+ Hace 5m     ●   ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | +---+ María López      ||
|  | | F | "Perfecto, quedo" ||
|  | +---+ Hace 1h     ✓✓  ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | +---+ Carlos M.        ||
|  | | F | "Recibí el paq." ||
|  | +---+ Ayer         ✓✓  ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | +---+ Ana Rodríguez    ||
|  | | F | "¿Más cartas?"   ||
|  | +---+ 06/09        ✓✓  ||
|  +-------------------------+|
|                             |
+-----------------------------+
```

### Ventana de Chat

```
+------------------------------------------------------------------+
|  [←]  +------+  Juan Pérez              [Bloquear] [⋮]           |
+------------------------------------------------------------------+
|               |                                                    |
|  ─────────────┼────────────────────────────────────────────────   |
|               |                                                    |
|  08/09 10:30  |  Hola, ¿la carta "Charizard Base Set" sigue      |
|               |  disponible?                                      |
|               |                                                    |
|  ─────────────┼────────────────────────────────────────────────   |
|               |                                                    |
|  Hola Juan,   |  Sí, sigue disponible. Está en perfecto          |
|  10:32        |  estado y con funda protectora.                   |
|               |                                                    |
|  ─────────────┼────────────────────────────────────────────────   |
|               |                                                    |
|  08/09 10:35  |  ¿Aceptas $430?                                   |
|               |                                                    |
|  ─────────────┼────────────────────────────────────────────────   |
|               |                                                    |
|  Precio       |  El precio mínimo es $440, pero puedo incluir    |
|  firmado:     |  envío gratis si aceptas.                        |
|  $450         |                                                    |
|               |                                                    |
|  ─────────────┼────────────────────────────────────────────────   |
|               |                                                    |
|  08/09 10:38  |  ¡Deal! ¿Cómo pago?                               |
|               |                                                    |
|  ─────────────┼────────────────────────────────────────────────   |
|               |                                                    |
|               |                                                    |
+------------------------------------------------------------------+
|  [Escribe un mensaje...                        ]  [📎]  [Enviar] |
+------------------------------------------------------------------+
```

### Chat Vacío

```
+------------------------------------------------------------------+
|  Mensajes                                                         |
+------------------------------------------------------------------+
|                                                                  |
|                  +------------------+                             |
|                  |                  |                             |
|                  |  (burbuja de     |                             |
|                  |   chat)          |                             |
|                  |                  |                             |
|                  +------------------+                             |
|                                                                  |
|          Aún no tienes conversaciones                             |
|                                                                  |
|    Contacta a un vendedor desde el perfil o la página            |
|    de detalle de una carta para iniciar una conversación.        |
|                                                                  |
|                  [  Explorar Cartas  ]                            |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /chat, /chat/{conversationId}
- **Componentes:** ChatList, ChatWindow, MessageBubble, ChatInput, BlockUserModal
- **Endpoints:** GET /api/conversations, GET /api/conversations/{id}/messages, POST /api/conversations/{id}/messages, POST /api/users/{id}/block, WebSocket /ws/chat
- **WebSocket:** Conexión persistente para recibir mensajes en tiempo real. Eventos: new_message, message_read, user_blocked.
