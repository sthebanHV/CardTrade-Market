# HU_47 Panel de Administracion

## Descripcion

**Como** administrador,
**quiero** gestionar usuarios, revisar publicaciones reportadas y ver estadisticas de la plataforma,
**para** mantener la comunidad segura y controlar el crecimiento de la plataforma.

---

## Criterios de Aceptacion

1. La ruta /admin y el enlace Administracion en el menu del avatar solo son visibles y accesibles para usuarios con ROLE_ADMIN. Un usuario con ROLE_USER que acceda manualmente a /admin recibe una pantalla 403 (No tienes acceso a esta seccion) con enlace de vuelta al home, sin mostrar ningun dato del panel. La carga del panel toma menos de 2 segundos.

2. Pestana **Usuarios**: tabla paginada con todas las cuentas (avatar, nombre de usuario, email, rol actual, fecha de registro, estado activo/suspendido, numero de publicaciones). Buscador por nombre o email y filtro por rol. Desde cada fila el admin puede: cambiar el rol entre Usuario y Administrador, y suspender o reactivar la cuenta (un usuario suspendido no puede iniciar sesion). Un admin no puede cambiar su propio rol ni suspenderse a si mismo; la accion muestra confirmacion: Cambiar el rol de [usuario] a Administrador?. Toda accion queda registrada en el historial de auditoria.

3. Pestana **Reportes**: cola de publicaciones reportadas (US-20) ordenadas por fecha, cada una con preview de la carta, motivo (Fraude, Falso, Precio abusivo, Otro), cantidad de reportes y reportante(s) anonimo(s). Acciones: Descartar el reporte, Ocultar la publicacion (cambia status a INACTIVO y desaparece del catalogo) y Suspender al vendedor. Al resolver, el reporte pasa a estado Resuelto con fecha y admin responsable. Badge con el numero de reportes pendientes en la pestaña.

4. Pestana **Estadisticas**: tarjetas con usuarios totales, publicaciones activas, ventas del mes e ingresos del mes; grafica de lineas con registros de usuarios de los ultimos 30 dias; grafica de barras con publicaciones por juego (Pokemon, Magic, Yu-Gi-Oh, Otros); tabla de los 5 vendedores con mas ventas y la de los 5 con mas publicaciones activas. Los datos se refrescan al recargar el panel.

5. **Auditoria**: seccion dentro del panel con el registro de acciones administrativas (fecha, admin, accion, objetivo), por ejemplo: admin1 cambio rol de user2 a ADMIN, admin1 suspendio a user3, admin1 oculto publicacion X. Historial inmutable visible solo para administradores.

## Wireframe

```
+------------------------------------------------------------------+
|  🃏 CardTrade Market                              🔔 👤 Admin ▾   |
+------------------------------------------------------------------+
|  PANEL DE ADMINISTRACIÓN                                           |
|  Usuarios (128) | Reportes (3●) | Estadísticas | Auditoría        |
+------------------------------------------------------------------+
|                                                                    |
|  [🔍 Buscar usuario...]        Rol: [Todos ▾]                     |
|  +--------+-------------+-------------------+----------+--------+  |
|  | Avatar | Usuario     | Email             | Rol      | Estado |  |
|  +--------+-------------+-------------------+----------+--------+  |
|  | (img)  | cardmaster  | cm@mail.com       | Usuario  | Activo |  |
|  |        |             |                   | [Cambiar]| [Susp] |  |
|  | (img)  | pikachu99   | p99@mail.com      | Admin    | Activo |  |
|  +--------+-------------+-------------------+----------+--------+  |
|                                                                    |
|  REPORTES PENDIENTES (3)                                           |
|  +--------+----------------+---------------+-------------------+  |
|  | [img]  | Charizard ex   | Fraude (4x)   | [Descartar]       |  |
|  |        | $999           | hace 2h       | [Ocultar] [Susp.] |  |
|  +--------+----------------+---------------+-------------------+  |
|                                                                    |
|  ESTADÍSTICAS                                                      |
|  +-----------+ +-----------+ +-----------+ +-----------+          |
|  | 1,250     | | 3,480     | | 212       | | $8,940    |          |
|  | Usuarios  | | Cartas    | | Ventas/mes| | Ingresos  |          |
|  +-----------+ +-----------+ +-----------+ +-----------+          |
|  [grafica registros 30 dias]  [barras publicaciones por juego]    |
+------------------------------------------------------------------+
```

---

## Informacion Adicional

| Campo | Detalle |
|-------|---------|
| **Categoria** | Panel de Control y Extras |
| **Prioridad** | Media |
| **Puntos** | 8 |
| **Ruta** | /admin (pestanas: usuarios, reportes, estadisticas, auditoria) |
| **Componentes** | AdminLayout, UsersTable, ReportsQueue, AdminStats, AuditLog, AdminRoute |
| **Endpoints** | GET /api/admin/users, PUT /api/admin/users/:id/role, PUT /api/admin/users/:id/status, GET /api/admin/reports, POST /api/admin/reports/:id/resolve, GET /api/admin/stats, GET /api/admin/audit |