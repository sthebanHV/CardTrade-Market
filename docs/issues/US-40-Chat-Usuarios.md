# [US-40] Chat entre Usuarios

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Funcionalidades del chat ajustables
- **Valioso**: Facilita la comunicación entre compradores y vendedores
- **Estimable**: 8 puntos de esfuerzo
- **Pequeño**: Implementación completa pero manejable
- **Testable**: Verificar envío y recepción de mensajes

---

## Historia de Usuario

**Como** usuario,
**quiero** chatear con vendedores para preguntar sobre cartas,
**para** obtener más información antes de comprar.

---

## Criterios de Aceptación

1. Botón "Contactar Vendedor" en cada publicación
2. Chat en tiempo real con WebSocket
3. Historial de mensajes persistentes
4. Notificación de nuevos mensajes
5. Ver estado de conexión del vendedor
6. Enviar imágenes adjuntas

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [💬(3)] [≡]     |
+----------------------------------------------------------+
|                                                          |
|  +-------------------+  +------------------------------+ |
|  | CHATS             |  | CardMaster_MX  ● En línea    | |
|  |                   |  |                              | |
|  | CardMaster_MX  ●  |  | +--------------------------+ | |
|  | Hola, interested  |  | | Hola! ¿La Charizard ex   | | |
|  |                   |  | | está disponible?          | | |
|  | PikachuFan     ○  |  | |                          | | |
|  | Gracias por...    |  | | Sí, está disponible.     | | |
|  |                   |  | | ¿Tienes alguna pregunta? | | |
|  | TCG_Masters    ○  |  | |                          | | |
|  | El envío incl...  |  | +--------------------------+ | |
|  |                   |  |                              | |
|  +-------------------+  | +--------------------------+ | |
|                         | | [Escribe un mensaje...]   | | |
|                         | +--------------------------+ | |
|                         | [📎] [Enviar]                | |
|                         +------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/chat` y `/chat/:conversationId`
- **Componentes**: `ChatList`, `ChatWindow`, `MessageInput`
- **Endpoints**:
  - `GET /api/chat/conversations` - Obtener conversaciones
  - `GET /api/chat/:conversationId/messages` - Obtener mensajes
  - `POST /api/chat/:conversationId/messages` - Enviar mensaje
- **WebSocket**: Socket.IO para chat en tiempo real
- **Almacenamiento**: MongoDB para mensajes
