# [US-37] Alertas de Precio

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Tipos de alertas ajustables
- **Valioso**: Ayuda al usuario a encontrar buenas ofertas
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que las alertas se envían correctamente

---

## Historia de Usuario

**Like** comprador,
**quiero** recibir alertas cuando una carta baje de precio,
**para** aprovechar ofertas sin revisar constantemente.

---

## Criterios de Aceptación

1. Configurar alerta de precio en cualquier carta
2. Establecer precio objetivo
3. Recibir notificación cuando el precio baje
4. Gestionar alertas activas (editar, eliminar)
5. Recibir alerta por email y notificación in-app

---

## Wireframe

### Configurar Alerta

```
+----------------------------------------------------------+
|  +------+  Charizard ex Full ART                        |
|  |      |  Precio actual: $45.00                        |
|  | [img]|                                               |
|  |      |  [🔔 Configurar Alerta de Precio]             |
|  +------+                                               |
+----------------------------------------------------------+

Modal:
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  🔔 ALERTA DE PRECIO                                | |
|  |                                                     | |
|  |  Notificarme cuando el precio baje a:               | |
|  |  +-----------------------------------------------+  | |
|  |  |  $ [35.00]                                    |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Cancelar]              [Guardar Alerta]           | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

### Lista de Alertas

```
+----------------------------------------------------------+
|  MIS ALERTAS DE PRECIO (5 activas)                       |
|                                                          |
|  Charizard ex Full ART     | Objetivo: $35.00 | Actual: $45.00 |
|  [Editar] [Eliminar]                                    |
|                                                          |
|  Pikachu VMAX Rainbow      | Objetivo: $20.00 | Actual: $28.00 |
|  [Editar] [Eliminar]                                    |
|                                                          |
|  Blue-Eyes White Dragon    | Objetivo: $80.00 | Actual: $95.00 |
|  [Editar] [Eliminar]                                    |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/cards/:id` y `/my-alerts`
- **Componentes**: `PriceAlertButton`, `PriceAlertForm`, `AlertList`
- **Endpoints**:
  - `POST /api/alerts` - Crear alerta
  - `GET /api/alerts` - Obtener alertas
  - `DELETE /api/alerts/:id` - Eliminar alerta
- **Background Job**: Verificar precios cada hora y enviar alertas
