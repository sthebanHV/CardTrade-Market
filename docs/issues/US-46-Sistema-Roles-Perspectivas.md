# HU_46 Sistema de Roles y Perspectivas

## Descripcion

**Como** usuario del sitio,
**quiero** que la plataforma reconozca mis perspectivas de comprador, vendedor y coleccionista sin tener que cambiar de cuenta,
**para** encontrar siempre las secciones que me corresponden y que el administrador pueda gestionar la plataforma.

---

## Criterios de Aceptacion

1. Roles de autorizacion en dos capas. **Capa 1 - autorizacion** (campo role en BD): visitante (sin sesion, no persiste) solo accede a home, busqueda, detalle de carta, catalogo por juego, ofertas y perfil publico de vendedor; usuario registrado (ROLE_USER) accede ademas a carrito, checkout, publicar, mis publicaciones, mis ventas, mis compras, coleccion, favoritos, alertas, resenas, chat, dashboard y notificaciones; administrador (ROLE_ADMIN) accede ademas a /admin. Acceder a una ruta protegida sin sesion redirige a /login; con sesion pero sin rol adecuado muestra pantalla 403 con enlace a home. **Capa 2 - perspectivas** (derivan del rol, NO son excluyentes): comprador (carrito, mis compras, direcciones, tracking), vendedor (publicar, mis publicaciones, mis ventas, perfil de vendedor con rating), coleccionista (mi coleccion, valor y estadisticas, favoritos, lista de deseos, alertas de precio).

2. El menu principal del header agrupa las secciones por perspectiva en dropdowns, visible para cualquier usuario registrado: **Explorar** (Catalogo, Ofertas, Por juego), **Comprar** (Carrito, Mis compras), **Vender** (Publicar carta, Mis publicaciones, Mis ventas), **Coleccion** (Mi coleccion, Favoritos, Alertas, Lista de deseos), mas los enlaces directos Inicio, Dashboard y el avatar con dropdown (Perfil, Configuracion, Cerrar sesion). Un usuario nuevo ve las 4 perspectivas completas desde el registro, sin activacion ni conmutador de modo, porque toda HU asume que quien esta registrado puede comprar, vender y coleccionar a la vez (ver mockup de US-44 donde un solo usuario muestra ventas, compras y coleccion juntas).

3. El registro crea la cuenta con ROLE_USER por defecto y el formulario no pide elegir rol (consistente con US-01). El primer administrador se crea por arranque del servidor con las variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD, o bien un admin promueve a otro usuario desde el panel (US-47). Un administrador no puede quitarse el rol a si mismo ni eliminar su propia cuenta, para evitar quedarse sin administradores.

4. El perfil de usuario (/profile) muestra el distintivo de rol (Usuario o Administrador) y las perspectivas activas con estatus derivados: **Vendedor verificado** cuando tiene ventas completadas > 0, mostrando su calificacion promedio en estrellas (US-19 y US-39); **Coleccionista** cuando tiene cartas en su coleccion. La perspectiva Vendedor incluye el conteo de publicaciones activas y seguidores. El distintivo se recalcula automaticamente a partir de la actividad, nunca se asigna manualmente.

5. Corregir la documentacion existente: la tabla de Roles del README.md (hoy dice solo Visitante/Usuario/Administrador y omite comprador, vendedor y coleccionista) y el modelo de datos en REQUIREMENTS.md (hoy dice role Enum ['user','admin'], debe ser ['ROLE_USER','ROLE_ADMIN'] para ser consistente con el backend).

## Wireframe

```
+------------------------------------------------------------------+
|  🃏 CardTrade Market    [🔍 Buscar cartas...]      🛒(2) 🔔(3) 👤 |
+------------------------------------------------------------------+
| Inicio | Explorar ▾ | Comprar ▾ | Vender ▾ | Colección ▾ | Buscar |
+------------------------------------------------------------------+
|                                                                    |
|  Explorar ▾     Comprar ▾      Vender ▾       Colección ▾          |
|  - Catálogo     - Carrito      - Publicar     - Mi colección       |
|  - Ofertas      - Mis compras  - Mis public.  - Favoritos          |
|  - Por juego    - Direcciones  - Mis ventas   - Alertas precio     |
|                                                  - Lista deseos    |
|                                                                    |
|  👤 Avatar ▾  →  @usuario  [Usuario ●]                             |
|                  - Mi perfil  - Configuración  - Administración*   |
|                  - Cerrar sesión                                   |
|                  (* visible solo con ROLE_ADMIN)                   |
+------------------------------------------------------------------+

+-------------------+        +-------------------+
|  SIN SESIÓN       |        |  SIN PERMISO 403  |
|  Inicio  Catálogo |        |  🔒 No tienes     |
|  Buscar  Ofertas  |        |  acceso a esta     |
|  [Iniciar sesión] |        |  sección           |
|  [Registrarse]    |        |  [Volver al inicio]|
+-------------------+        +-------------------+
```

---

## Informacion Adicional

| Campo | Detalle |
|-------|---------|
| **Categoria** | Gestion de Usuarios |
| **Prioridad** | Alta |
| **Puntos** | 5 |
| **Ruta** | / (header con menu de perspectivas), /profile, /admin (guard) |
| **Componentes** | PerspectiveMenu, RoleBadge, ProtectedRoute, AdminRoute, ForbiddenPage |
| **Endpoints** | GET /api/auth/me, env ADMIN_EMAIL/ADMIN_PASSWORD (bootstrap admin), PUT /api/admin/users/:id/role |