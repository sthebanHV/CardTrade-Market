# [US-44] Dashboard de Usuario

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Métricas mostradas ajustables
- **Valioso**: Proporciona un resumen rápido de actividad
- **Estimable**: 6 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar que se muestran todas las métricas

---

## Historia de Usuario

**Como** usuario activo,
**quiero** ver un resumen de mi actividad, ventas y compras,
**para** tener control de todo en un solo lugar.

---

## Criterios de Aceptación

1. Resumen de actividad reciente
2. Ventas del mes con monto total
3. Compras del mes con cantidad
4. Publicaciones activas
5. Mensajes sin leer
6. Favoritos guardados
7. Accesos rápidos a secciones principales

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  Hola, Carlos 👋                                         |
|  Aquí está tu resumen de actividad:                      |
|                                                          |
|  +----------------------------------------------------+ |
|  |  +-----------+ +-----------+ +-----------+          | |
|  |  | 💰 $450   | | 📦 12     | | 🛒 8      |          | |
|  |  | Ventas    | | Compras   | | Publicac. |          | |
|  |  | este mes  | | este mes  | | Activas   |          | |
|  |  +-----------+ +-----------+ +-----------+          | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ACCESOS RÁPIDOS                                    | |
|  |                                                     | |
|  |  [📦 Mis Publicaciones]  [🛒 Mis Compras]           | |
|  |  [📚 Mi Colección]       [💬 Mensajes (3)]          | |
|  |  [⭐ Favoritos]          [🔔 Notificaciones (5)]   | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ACTIVIDAD RECIENTE                                 | |
|  |                                                     | |
|  |  • Vendiste "Charizard ex" por $45.00  hace 2h      | |
|  |  • Nuevo mensaje de PikachuFan          hace 4h      | |
|  |  • Compraste "Blue-Eyes" por $120.00   hace 1d      | |
|  |  • Reseña recibida de TCG_Fan           hace 2d      | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/dashboard`
- **Componentes**: `DashboardPage`, `StatsCards`, `QuickActions`, `ActivityFeed`
- **Endpoints**:
  - `GET /api/dashboard/stats` - Estadísticas del usuario
  - `GET /api/dashboard/activity` - Actividad reciente
