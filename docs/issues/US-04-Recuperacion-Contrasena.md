# [US-04] Recuperación de Contraseña

**Epic:** Gestión de Usuarios
**Prioridad:** Alta
**Estimación:** 4 puntos

---

## Descripción

**Como** usuario que olvidó su contraseña,
**quiero** recuperarla mediante mi email,
**para** poder volver a acceder a mi cuenta de forma segura.

---

## Criterios de Aceptación

1. Se muestra un link "¿Olvidaste tu contraseña?" en el formulario de login.
2. Al hacer clic, se muestra un formulario para ingresar el email registrado.
3. Al enviar el email, se muestra un mensaje genérico: "Si el email existe en nuestro sistema, recibirás un enlace de recuperación".
4. Se envía un email con un enlace de recuperación único y seguro.
5. El enlace de recuperación es válido por 24 horas y se invalida después de un uso.
6. Al acceder al enlace, se muestra un formulario para ingresar la nueva contraseña (mín 8 caracteres).
7. Se requiere confirmación de la nueva contraseña.
8. Al cambiar la contraseña exitosamente, se muestra un mensaje de confirmación.
9. El usuario es redirigido al formulario de login tras el cambio exitoso.
10. Los tokens de recuperación se almacenan de forma segura en la base de datos.
11. Se implementa rate limiting en el endpoint de solicitud de recuperación.
12. El proceso completo funciona correctamente en dispositivos móviles y de escritorio.

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
│                    │  ┌─────────────────┐  │                    │
│                    │  │  Iniciar Sesión │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │ ¿Olvidaste tu         │                    │
│                    │  contraseña? →        │  ← Click aquí      │
│                    └───────────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Paso 1: Solicitar Recuperación

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  ≡                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────────────┐                    │
│                    │ Recuperar Contraseña  │                    │
│                    │                       │                    │
│                    │  Ingresa tu email y   │                    │
│                    │  te enviaremos un     │                    │
│                    │  enlace para         │                    │
│                    │  restablecer tu      │                    │
│                    │  contraseña.         │                    │
│                    │                       │                    │
│                    │  Email                │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │                 │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ Enviar Enlace   │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │ ← Volver al Login     │                    │
│                    └───────────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Paso 2: Mensaje de Confirmación

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  ≡                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────────────┐                    │
│                    │  ✅ ¡Email Enviado!   │                    │
│                    │                       │                    │
│                    │  Si el email          │                    │
│                    │  usuario@email.com    │                    │
│                    │  existe en nuestro    │                    │
│                    │  sistema, recibirás   │                    │
│                    │  un enlace de         │                    │
│                    │  recuperación en      │                    │
│                    │  unos minutos.        │                    │
│                    │                       │                    │
│                    │  Revisa tu bandeja    │                    │
│                    │  de entrada y la      │                    │
│                    │  carpeta de spam.     │                    │
│                    │                       │                    │
│                    │  El enlace expira     │                    │
│                    │  en 24 horas.         │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ Volver al Login │  │                    │
│                    │  └─────────────────┘  │                    │
│                    └───────────────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Paso 3: Nueva Contraseña

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  ≡                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────────────┐                    │
│                    │ Nueva Contraseña      │                    │
│                    │                       │                    │
│                    │  Ingresa tu nueva     │                    │
│                    │  contraseña.          │                    │
│                    │                       │                    │
│                    │  Nueva Contraseña     │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ ••••••••        │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │  Mínimo 8 caracteres  │                    │
│                    │                       │                    │
│                    │  Confirmar Contraseña │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ ••••••••        │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │    Guardar      │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  El enlace expira en  │                    │
│                    │  12 horas restantes   │                    │
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
│  Recuperar Contraseña   │
│                         │
│  Ingresa tu email y te  │
│  enviaremos un enlace.  │
│                         │
│  Email                  │
│  ┌───────────────────┐  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Enviar Enlace    │  │
│  └───────────────────┘  │
│                         │
│  ← Volver al Login      │
│                         │
└─────────────────────────┘
```

### Estado vacío/Error

```
┌───────────────────────────────┐
│     Recuperar Contraseña      │
│                               │
│  Ingresa tu email.            │
│                               │
│  Email                        │
│  ┌─────────────────────────┐  │
│  │                         │  │
│  └─────────────────────────┘  │
│  ❌ Por favor ingresa un      │
│     email válido              │
│                               │
│  ┌─────────────────────────┐  │
│  │      Enviar Enlace      │  │
│  └─────────────────────────┘  │
│                               │
│  ⚠️ Demasiadas solicitudes.   │
│  Intenta de nuevo en 15 min.  │
│                               │
└───────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /forgot-password, /reset-password/:token
- **Componentes:** ForgotPasswordForm, ResetPasswordForm, ConfirmationMessage
- **Endpoints:** POST /api/auth/forgot-password, POST /api/auth/reset-password/:token
- **Token:** crypto.randomBytes para generar tokens seguros, almacenados con hash
- **Expiración:** Token válido por 24 horas, un solo uso
- **Email:** Template HTML para email de recuperación (SendGrid/Nodemailer)
- **Seguridad:** Rate limiting (3 solicitudes por email en 1 hour), tokens de un solo uso
- **Validación:** Verificar que el token no esté expirado ni usado
