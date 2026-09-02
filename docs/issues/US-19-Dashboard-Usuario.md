# [US-19] Dashboard del Usuario

**Epic:** Panel de Control y Extras
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** tener un panel de control central con un resumen de mi actividad,
**para** acceder rápidamente a las funcionalidades más usadas y ver el estado de mi cuenta.

---

## Criterios de Aceptance

- [ ] Bienvenida personalizada con nombre del usuario
- [ ] Resumen de colección (total cartas, valor estimado)
- [ ] Publicaciones activas (conteo)
- [ ] Ventas recientes (últimas 3)
- [ ] Compras recientes (últimas 3)
- [ ] Notificaciones pendientes
- [ ] Accesos rápidos: Publicar carta, Ver colección, Ver carrito
- [ ] Si no hay actividad, se muestra estado vacío con llamado a la acción
- [ ] Responsive mobile/desktop

---

## Wireframe - Dashboard Desktop

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  ¡Hola, Juan! 👋                                     | |
|  |  Bienvenido de vuelta a CardTrade Market             | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  RESUMEN RÁPIDO                                     | |
|  |                                                     | |
|  |  +----------+ +----------+ +----------+ +----------+| |
|  |  | 📥       | | 💰       | | 📦       | | 🛒       || |
|  |  | Colección| | Valor    | | Publica- | | Carrito  || |
|  |  | 48 cartas| | $2,340   | | ciones   | | 2 items  || |
|  |  |          | |          | | 5 activas| |          || |
|  |  +----------+ +----------+ +----------+ +----------+| |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ACCESOS RÁPIDOS                                    | |
|  |                                                     | |
|  |  [📥 Publicar Carta]  [📊 Mi Colección]  [🛒 Carrito]| |
|  +----------------------------------------------------+ |
|                                                          |
|  +---------------------------+  +----------------------+ |
|  |  ÚLTIMAS COMPRAS          |  |  ÚLTIMAS VENTAS      | |
|  |                           |  |                      | |
|  |  Charizard ex    $45.00   |  |  Pikachu     $28.00  | |
|  |  Hace 3 días     ✅       |  |  Hace 5 días  ✅     | |
|  |                           |  |                      | |
|  |  Pikachu Full    $28.00   |  |  Mewtwo       $89.00 | |
|  |  Hace 1 semana   ✅       |  |  Hace 2 semanas ✅   | |
|  |                           |  |                      | |
|  |  [Ver todas →]            |  |  [Ver todas →]       | |
|  +---------------------------+  +----------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  📬 NOTIFICACIONES (3 nuevas)                        | |
|  |                                                     | |
|  |  🔔 Tu carta "Charizard ex" fue vista 12 veces     | |
|  |  🔔 Nueva venta: Pikachu vendido a CardFan99       | |
|  |  🔔 CardMaster_MX te dejó una reseña               | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Dashboard Mobile

```
+---------------------------+
| [≡] CardTrade      [👤]  |
+---------------------------+
|                           |
| ¡Hola, Juan! 👋           |
| Bienvenido de vuelta      |
|                           |
+---------------------------+
| 📥 Colección  | 💰 Valor  |
| 48 cartas     | $2,340    |
+---------------------------+
| 📦 Publica.   | 🛒 Carrito|
| 5 activas     | 2 items   |
+---------------------------+
|                           |
| [📥 Publicar] [📊 Colecc.]|
| [🛒 Carrito]              |
+---------------------------+
| ÚLTIMAS COMPRAS           |
| Charizard ex  $45.00  ✅  |
| Pikachu Full  $28.00  ✅  |
| [Ver todas →]             |
+---------------------------+
| ÚLTIMAS VENTAS            |
| Pikachu       $28.00  ✅  |
| Mewtwo        $89.00  ✅  |
| [Ver todas →]             |
+---------------------------+
| 📬 NOTIFICACIONES (3)      |
| 🔔 Tu carta fue vista     |
| 🔔 Nueva venta            |
| [Ver todas →]             |
+---------------------------+
| Home | Cartas | [+] | 🛒  |
+---------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/dashboard`
- **Componentes:** `Dashboard`, `SummaryCards`, `QuickActions`, `RecentPurchases`, `RecentSales`, `NotificationsPreview`
- **Endpoints:**
  - `GET /api/dashboard` - Datos del dashboard
  - `GET /api/dashboard/stats` - Estadísticas del usuario
