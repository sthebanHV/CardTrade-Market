# [US-06] Cerrar Sesión

**Epic:** Gestión de Usuarios
**Prioridad:** Alta
**Estimación:** 2 puntos

---

## Descripción

**Como** usuario autenticado,
**quiero** cerrar mi sesión de forma segura,
**para** proteger mi cuenta cuando uso un dispositivo compartido o público.

---

## Criterios de Aceptación

1. Se muestra un botón o link "Cerrar sesión" en el menú de navegación o header.
2. Al hacer clic, se muestra un diálogo de confirmación: "¿Estás seguro de que deseas cerrar sesión?".
3. El usuario puede confirmar o cancelar la acción.
4. Al confirmar, se invalida el token JWT actual en el servidor.
5. Se eliminan todos los datos de sesión del navegador (localStorage, cookies).
6. El usuario es redirigido a la página principal (Home) o al login.
7. Se muestra un breve mensaje de confirmación: "Has cerrado sesión correctamente".
8. La acción es rápida y no causa bloqueos en la interfaz.
9. En caso de error al cerrar sesión, se muestra un mensaje y se fuerza la limpieza local.
10. El proceso funciona correctamente en dispositivos móviles y de escritorio.

---

## Wireframe

### Menú con opción de cerrar sesión

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  Mis Cartas  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │                              ┌─────────────────────┐     │  │
│  │                              │ Mi Perfil           │     │  │
│  │                              │ Mis Cartas          │     │  │
│  │                              │ Configuración       │     │  │
│  │  ────────────────────────────│─────────────────────│───  │  │
│  │                              │ 🔓 Cerrar Sesión    │ ←── │  │
│  │                              └─────────────────────┘     │  │
│  │                                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Diálogo de confirmación

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  Mis Cartas  👤 Juan │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │         ┌─────────────────────────────────────┐          │  │
│  │         │       🔒 Cerrar Sesión              │          │  │
│  │         │                                     │          │  │
│  │         │  ¿Estás seguro de que deseas        │          │  │
│  │         │  cerrar sesión?                      │          │  │
│  │         │                                     │          │  │
│  │         │  Si cierras sesión, tendrás que     │          │  │
│  │         │  volver a iniciar sesión para       │          │  │
│  │         │  acceder a tu cuenta.               │          │  │
│  │         │                                     │          │  │
│  │         │  ┌──────────┐  ┌────────────────┐  │          │  │
│  │         │  │ Cancelar │  │ Cerrar Sesión  │  │          │  │
│  │         │  └──────────┘  └────────────────┘  │          │  │
│  │         └─────────────────────────────────────┘          │  │
│  │                                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────────┐
│  🃏 CardTrade    👤  ≡  │
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │ Mi Perfil         │  │
│  │ Mis Cartas        │  │
│  │ Configuración     │  │
│  │───────────────────│  │
│  │ 🔓 Cerrar Sesión  │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

### Diálogo de confirmación Mobile

```
┌─────────────────────────┐
│                         │
│   🔒 Cerrar Sesión      │
│                         │
│   ¿Estás seguro de      │
│   que deseas cerrar     │
│   sesión?               │
│                         │
│   Tendrás que volver a  │
│   iniciar sesión.       │
│                         │
│  ┌─────────┐ ┌────────┐ │
│  │ Cancelar│ │ Cerrar │ │
│  └─────────┘ └────────┘ │
│                         │
└─────────────────────────┘
```

### Mensaje de confirmación tras cerrar

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market          Iniciar Sesión    Registrarse    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────────────┐                    │
│                    │  ✅ Sesión Cerrada    │                    │
│                    │                       │                    │
│                    │  Has cerrado sesión   │                    │
│                    │  correctamente.       │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │   Iniciar Sesión│  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │  Volver al Inicio│ │                    │
│                    │  └─────────────────┘  │                    │
│                    └───────────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** N/A (acción global desde el header)
- **Componentes:** LogoutButton, ConfirmDialog, UserMenu
- **Endpoints:** POST /api/auth/logout
- **Tokens:** Invalidar token JWT en el servidor (blacklist o revocación)
- **Almacenamiento:** Limpiar localStorage, sessionStorage y cookies HttpOnly
- **Estado:** Resetear estado global de autenticación (Context/Zustand)
- **UX:** Usar modal del sistema o componente personalizado para confirmación
