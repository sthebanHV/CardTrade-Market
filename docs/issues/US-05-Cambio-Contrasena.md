# [US-05] Cambio de Contraseña

**Epic:** Gestión de Usuarios
**Prioridad:** Media
**Estimación:** 3 puntos

---

## Descripción

**Como** usuario registrado,
**quiero** cambiar mi contraseña desde mi perfil,
**para** mantener mi cuenta segura y proteger mi información.

---

## Criterios de Aceptación

1. Se muestra una sección dedicada "Cambiar Contraseña" dentro del perfil del usuario.
2. Los campos son: contraseña actual, nueva contraseña y confirmar nueva contraseña.
3. Se valida que la contraseña actual sea correcta antes de permitir el cambio.
4. La nueva contraseña debe tener un mínimo de 8 caracteres, incluir al menos una mayúscula, una minúscula y un número.
5. La confirmación de contraseña debe coincidir exactamente con la nueva contraseña.
6. Al cambiar la contraseña exitosamente, se muestra un mensaje de confirmación visual.
7. Se ofrece la opción de cerrar otras sesiones activas tras el cambio (checkbox).
8. Si la contraseña actual es incorrecta, se muestra un mensaje de error específico.
9. La nueva contraseña no puede ser igual a las 3 últimas contraseñas utilizadas.
10. El formulario es responsive y funciona correctamente en dispositivos móviles y de escritorio.
11. Se muestra un indicador de fortaleza de la nueva contraseña en tiempo real.
12. Después del cambio, el usuario puede seguir navegando sin necesidad de re-login (excepto si eligió cerrar otras sesiones).

---

## Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  Mis Cartas  ≡      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Mi Perfil                               │  │
│  │  ... (información del perfil)                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              🔒 Cambiar Contraseña                        │  │
│  │                                                           │  │
│  │  Para cambiar tu contraseña, primero verifica tu          │  │
│  │  contraseña actual.                                       │  │
│  │                                                           │  │
│  │  Contraseña Actual                                        │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ ••••••••                                          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  Nueva Contraseña                                         │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ ••••••••                                          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  Fortaleza: ▓▓▓▓░░░░░░ Regular                           │  │
│  │  Requisitos: 8+ chars, mayúscula, minúscula, número      │  │
│  │                                                           │  │
│  │  Confirmar Nueva Contraseña                               │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ ••••••••                                          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ☐ Cerrar todas las otras sesiones activas                │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │            Actualizar Contraseña                     │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────────┐
│  🃏 CardTrade    ≡      │
├─────────────────────────┤
│                         │
│  🔒 Cambiar Contraseña  │
│                         │
│  Verifica tu contraseña │
│  actual primero.        │
│                         │
│  Contraseña Actual      │
│  ┌───────────────────┐  │
│  │ ••••••••          │  │
│  └───────────────────┘  │
│                         │
│  Nueva Contraseña       │
│  ┌───────────────────┐  │
│  │ ••••••••          │  │
│  └───────────────────┘  │
│  ▓▓▓▓░░░░ Regular       │
│  8+ chars, A-z, 0-9     │
│                         │
│  Confirmar Nueva        │
│  ┌───────────────────┐  │
│  │ ••••••••          │  │
│  └───────────────────┘  │
│                         │
│  ☐ Cerrar otras sesiones│
│                         │
│  ┌───────────────────┐  │
│  │ Actualizar        │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

### Estado vacío/Error

```
┌───────────────────────────────┐
│   🔒 Cambiar Contraseña       │
│                               │
│  Contraseña Actual            │
│  ┌─────────────────────────┐  │
│  │ incorrecta123           │  │
│  └─────────────────────────┘  │
│  ❌ La contraseña actual es   │
│     incorrecta                │
│                               │
│  Nueva Contraseña             │
│  ┌─────────────────────────┐  │
│  │ NuevaPass123            │  │
│  └─────────────────────────┘  │
│  Fortaleza: ▓▓▓▓▓▓░░ Fuerte  │
│                               │
│  Confirmar Nueva Contraseña   │
│  ┌─────────────────────────┐  │
│  │ NuevaPass123            │  │
│  └─────────────────────────┘  │
│                               │
│  ☐ Cerrar otras sesiones      │
│                               │
│  ┌─────────────────────────┐  │
│  │   Actualizar Contraseña │  │
│  └─────────────────────────┘  │
│                               │
└───────────────────────────────┘
```

### Confirmación de Éxito

```
┌───────────────────────────────┐
│   🔒 Cambiar Contraseña       │
│                               │
│  ✅ ¡Contraseña Actualizada!  │
│                               │
│  Tu contraseña ha sido        │
│  cambiada exitosamente.       │
│                               │
│  Las demás sesiones han sido  │
│  cerradas por seguridad.      │
│                               │
│  ┌─────────────────────────┐  │
│  │     Volver al Perfil    │  │
│  └─────────────────────────┘  │
│                               │
└───────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /profile (sección de cambio de contraseña)
- **Componentes:** PasswordChangeForm, PasswordStrengthIndicator, FormField
- **Endpoints:** PUT /api/auth/change-password
- **Validación:** Verificar contraseña actual con bcrypt.compare
- **Historial:** Almacenar hashes de las 3 últimas contraseñas para evitar reutilización
- **Tokens:** Opción de invalidar todos los refresh tokens del usuario
- **Seguridad:** Rate limiting en endpoint de cambio de contraseña
