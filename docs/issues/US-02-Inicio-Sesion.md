# [US-02] Inicio de Sesión

**Epic:** Gestión de Usuarios
**Prioridad:** Alta
**Estimación:** 4 puntos

---

## Descripción

**Como** usuario registrado,
**quiero** iniciar sesión con mi email y contraseña,
**para** acceder a mi cuenta y utilizar todas las funcionalidades de la plataforma.

---

## Criterios de Aceptación

1. Se muestra un formulario de login con los campos: email y contraseña.
2. Se valida que ambos campos estén completos antes de enviar.
3. Las credenciales se validan contra el backend de forma segura.
4. Al autenticarse exitosamente, se genera un token JWT válido por 24 horas.
5. El usuario es redirigido al Dashboard tras el login exitoso.
6. Si las credenciales son incorrectas, se muestra un mensaje genérico: "Email o contraseña incorrectos" (sin revelar cuál falla).
7. Se ofrece una opción "Recordarme" que guarda la sesión en el navegador por 30 días.
8. Se muestra un link "¿Olvidaste tu contraseña?" que redirige al formulario de recuperación.
9. Se muestra un link "¿No tienes cuenta? Regístrate" que redirige al formulario de registro.
10. El formulario es completamente responsive y funcional en dispositivos móviles y de escritorio.
11. Se implementa rate limiting: máximo 5 intentos fallidos por cuenta en 15 minutos.
12. Se bloquea temporalmente la cuenta después de 10 intentos fallidos consecutivos.

---

## Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market          Iniciar Sesión    Registrarse    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────────────┐                    │
│                    │    Iniciar Sesión     │                    │
│                    │                       │                    │
│                    │  Email                │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │                 │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  Contraseña           │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ ••••••••        │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  ☐ Recordarme         │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │   Iniciar Sesión│  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │ ¿Olvidaste tu         │                    │
│                    │  contraseña? →        │                    │
│                    │                       │                    │
│                    │ ¿No tienes cuenta?    │                    │
│                    │    Regístrate →       │                    │
│                    └───────────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────────┐
│  🃏 CardTrade    ≡      │
├─────────────────────────┤
│                         │
│    Iniciar Sesión       │
│                         │
│  Email                  │
│  ┌───────────────────┐  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  Contraseña             │
│  ┌───────────────────┐  │
│  │ ••••••••          │  │
│  └───────────────────┘  │
│                         │
│  ☐ Recordarme           │
│                         │
│  ┌───────────────────┐  │
│  │  Iniciar Sesión   │  │
│  └───────────────────┘  │
│                         │
│  ¿Olvidaste tu          │
│    contraseña? →        │
│                         │
│  ¿No tienes cuenta?     │
│    Regístrate →         │
│                         │
└─────────────────────────┘
```

### Estado vacío/Error

```
┌───────────────────────────────┐
│       Iniciar Sesión          │
│                               │
│  Email                        │
│  ┌─────────────────────────┐  │
│  │ usuario@email.com       │  │
│  └─────────────────────────┘  │
│                               │
│  Contraseña                   │
│  ┌─────────────────────────┐  │
│  │ incorrecta123           │  │
│  └─────────────────────────┘  │
│                               │
│  ☐ Recordarme                 │
│                               │
│  ┌─────────────────────────┐  │
│  │     Iniciar Sesión      │  │
│  └─────────────────────────┘  │
│                               │
│  ⚠️ Email o contraseña        │
│     incorrectos               │
│                               │
│  ── Intentos restantes: 3/5 ──│
│                               │
│  ¿Olvidaste tu contraseña?    │
│  ¿No tienes cuenta? Regístrate│
└───────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /login
- **Componentes:** LoginForm, FormField, RememberMe, ForgotPasswordLink
- **Endpoints:** POST /api/auth/login
- **Autenticación:** JWT (jsonwebtoken) con refresh token opcional
- **Seguridad:** Rate limiting (express-rate-limit), helmet para headers de seguridad
- **Cookies:** HttpOnly cookie para "Recordarme" con Secure flag
- **Estado:** Manejo de sesión en Context o Zustand
