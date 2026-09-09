# [US-01] Registro de Usuario

**Epic:** Gestión de Usuarios
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Descripción

**Como** visitante de la plataforma,
**quiero** registrarme con mi nombre, email y contraseña,
**para** crear una cuenta y acceder a las funcionalidades de compra y venta de cartas.

---

## Criterios de Aceptación

1. Se muestra un formulario de registro con los campos: nombre, email, contraseña y confirmación de contraseña.
2. El campo nombre acepta entre 2 y 50 caracteres, sin caracteres especiales peligrosos.
3. El campo email debe ser válido y único en el sistema (no permite duplicados).
4. La contraseña debe tener un mínimo de 8 caracteres, incluir al menos una mayúscula, una minúscula y un número.
5. La confirmación de contraseña debe coincidir exactamente con la contraseña ingresada.
6. Se realizan validaciones en tiempo real mientras el usuario completa cada campo (no solo al enviar).
7. Los mensajes de error son específicos y descriptivos (ej: "El email ya está registrado", "La contraseña debe tener al menos 8 caracteres").
8. Al completar el registro exitosamente, el usuario es redirigido al Dashboard de la aplicación.
9. Se muestra un link "¿Ya tienes cuenta? Inicia sesión" que redirige al formulario de login.
10. El formulario es completamente responsive y funcional en dispositivos móviles y de escritorio.
11. Se envía un email de bienvenida al registrarse.
12. La contraseña se almacena de forma segura con hash (bcrypt o similar).

---

## Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market          Iniciar Sesión    Registrarse    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌───────────────────────┐                    │
│                    │     Crear Cuenta      │                    │
│                    │                       │                    │
│                    │  Nombre               │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │                 │  │                    │
│                    │  └─────────────────┘  │                    │
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
│                    │  Confirmar Contraseña │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │ ••••••••        │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │  ┌─────────────────┐  │                    │
│                    │  │   Registrarse   │  │                    │
│                    │  └─────────────────┘  │                    │
│                    │                       │                    │
│                    │ ¿Ya tienes cuenta?    │                    │
│                    │    Inicia sesión →    │                    │
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
│     Crear Cuenta        │
│                         │
│  Nombre                 │
│  ┌───────────────────┐  │
│  │                   │  │
│  └───────────────────┘  │
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
│  Confirmar Contraseña   │
│  ┌───────────────────┐  │
│  │ ••••••••          │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │   Registrarse     │  │
│  └───────────────────┘  │
│                         │
│  ¿Ya tienes cuenta?     │
│    Inicia sesión →      │
│                         │
└─────────────────────────┘
```

### Estado vacío/Error

```
┌───────────────────────────────┐
│         Crear Cuenta          │
│                               │
│  Nombre                       │
│  ┌─────────────────────────┐  │
│  │ A                       │  │
│  └─────────────────────────┘  │
│  ❌ El nombre debe tener      │
│     al menos 2 caracteres     │
│                               │
│  Email                        │
│  ┌─────────────────────────┐  │
│  │ usuario@existente.com   │  │
│  └─────────────────────────┘  │
│  ❌ Este email ya está         │
│     registrado en la plataforma│
│                               │
│  Contraseña                   │
│  ┌─────────────────────────┐  │
│  │ 123                     │  │
│  └─────────────────────────┘  │
│  ❌ Mínimo 8 caracteres,      │
│     1 mayúscula, 1 número     │
│                               │
│  Confirmar Contraseña         │
│  ┌─────────────────────────┐  │
│  │ 456                     │  │
│  └─────────────────────────┘  │
│  ❌ Las contraseñas no coinciden│
│                               │
│  ┌─────────────────────────┐  │
│  │       Registrarse       │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /register
- **Componentes:** RegisterForm, FormField, PasswordStrengthIndicator, ErrorMessage
- **Endpoints:** POST /api/auth/register
- **Validación:** Express-validator o Joi en backend
- **Seguridad:** Rate limiting en endpoint de registro (max 5 intentos/min)
- **Email:** Servicio de envío de email de bienvenida (SendGrid/Nodemailer)
