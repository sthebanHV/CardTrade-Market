# [US-27] Alertas de Precio

**Epic:** Historial y Seguimiento
**Prioridad:** Baja
**Estimación:** 4 puntos

---

## Descripción

**Como** usuario,
**quiero** recibir alertas cuando una carta de mi interés baja de precio,
**para** aprovechar ofertas.

---

## Criterios de Aceptación

1. El usuario puede hacer clic en el botón "Alertarme" en la página de detalle de cualquier carta.
2. Al activar la alerta, el usuario configura un precio objetivo (precio por debajo del cual desea ser notificado).
3. Cuando el precio de la carta baja al precio objetivo o por debajo, el usuario recibe una notificación in-app y, opcionalmente, un correo electrónico.
4. El usuario tiene una página "Mis Alertas" que lista todas las alertas activas con: nombre de carta, imagen, precio actual, precio objetivo y fecha de creación.
5. El usuario puede eliminar una alerta en cualquier momento desde la lista o desde el detalle de la carta.
6. Existe un límite máximo de 10 alertas activas por usuario. Al intentar crear una alerta once se muestra un mensaje indicando que se debe eliminar una existente.
7. Si el usuario no está autenticado, el botón "Alertarme" redirige a la página de login.
8. Las alertas se evalúan periódicamente (cada 15 minutos) y se envían notificaciones cuando se cumple la condición.

---

## Wireframe

```
+------------------------------------------------------------------+
|  Mis Alertas de Precio (4 de 10)                                  |
+------------------------------------------------------------------+
|                                                                  |
|  +------------------------------------------------------------------+
|  | +----------+  Charizard Base Set         Precio actual: $420   |
|  | | [Imagen] |  Precio objetivo: $400     Estado: ⏳ Pendiente   |
|  | +----------+  Creada: 01/09/2026        [Eliminar Alerta]      |
|  +------------------------------------------------------------------+
|  | +----------+  Pikachu VMAX               Precio actual: $130   |
|  | | [Imagen] |  Precio objetivo: $100     Estado: ⏳ Pendiente   |
|  | +----------+  Creada: 03/09/2026        [Eliminar Alerta]      |
|  +------------------------------------------------------------------+
|  | +----------+  Lugia EX                   Precio actual: $85     |
|  | | [Imagen] |  Precio objetivo: $90      Estado: ✓ Activada     |
|  | +----------+  Creada: 02/09/2026        [Eliminar Alerta]      |
|  +------------------------------------------------------------------+
|  | +----------+  Mewtwo GX                  Precio actual: $300   |
|  | | [Imagen] |  Precio objetivo: $280     Estado: ⏳ Pendiente   |
|  | +----------+  Creada: 05/09/2026        [Eliminar Alerta]      |
|  +------------------------------------------------------------------+
|                                                                  |
|  Puedes crear hasta 10 alertas. Elimina una para crear nuevas.    |
|                                                                  |
+------------------------------------------------------------------+
```

### Mobile

```
+-----------------------------+
|  Mis Alertas (4/10)    [←]  |
+-----------------------------+
|                             |
|  +-------------------------+|
|  | [Img] Charizard BS     ||
|  | Actual: $420            ||
|  | Objetivo: $400          ||
|  | ⏳ Pendiente            ||
|  | [Eliminar]              ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | [Img] Pikachu VMAX     ||
|  | Actual: $130            ||
|  | Objetivo: $100          ||
|  | ⏳ Pendiente            ||
|  | [Eliminar]              ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | [Img] Lugia EX          ||
|  | Actual: $85             ||
|  | Objetivo: $90           ||
|  | ✓ ¡Alerta activada!    ||
|  | [Eliminar]              ||
|  +-------------------------+|
|                             |
|  +-------------------------+|
|  | [Img] Mewtwo GX        ||
|  | Actual: $300            ||
|  | Objetivo: $280          ||
|  | ⏳ Pendiente            ||
|  | [Eliminar]              ||
|  +-------------------------+|
|                             |
+-----------------------------+
```

### Configurar Alerta (Modal)

```
+------------------------------------------------------------------+
|  Configurar Alerta de Precio                          [X Cerrar] |
+------------------------------------------------------------------+
|                                                                  |
|  +----------+                                                    |
|  | [Imagen] |  Charizard Base Set - Holo Rare                    |
|  |          |  Colección: Base Set                                |
|  +----------+  Precio actual: $420.00                            |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|  Precio objetivo:                                                |
|  +------------------------------------------------------------+  |
|  | $ [400.00]                                                 |  |
|  +------------------------------------------------------------+  |
|  Te notificaremos cuando el precio baje de $400.00               |
|                                                                  |
|  Notificaciones:                                                 |
|  [x] Notificación in-app                                         |
|  [x] Correo electrónico (cardtrade@email.com)                    |
|                                                                  |
|  ────────────────────────────────────────────                    |
|                                                                  |
|         [ Cancelar ]          [  Activar Alerta  ]               |
|                                                                  |
+------------------------------------------------------------------+
```

### Notificación de Alerta Activada

```
+------------------------------------------------------------------+
| 🔔 ¡Alerta de precio activada!                                    |
+------------------------------------------------------------------+
|                                                                  |
| La carta "Charizard Base Set" ha bajado de precio                |
|                                                                  |
| Precio anterior: $450.00  →  Precio actual: $399.00             |
| Tu precio objetivo: $400.00                                      |
|                                                                  |
| [  Ver Carta  ]                               Hace 10 minutos   |
|                                                                  |
+------------------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** /alerts, /alerts/create/{cardId}
- **Componentes:** AlertList, AlertCard, AlertConfigModal, AlertButton, NotificationItem
- **Endpoints:** GET /api/alerts, POST /api/alerts {cardId, targetPrice}, DELETE /api/alerts/{id}, GET /api/alerts/check (cron job)
- **Cron Job:** Ejecutar cada 15 minutos para comparar precios actuales con precios objetivo de alertas activas.
