# [US-04] Recuperación de Contraseña

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Se puede ajustar el tiempo de expiración
- **Valioso**: Permite al usuario recuperar acceso a su cuenta
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar envío de email y cambio de contraseña

---

## Historia de Usuario

**Como** usuario que olvidó su contraseña,
**quiero** solicitar un enlace de recuperación por correo electrónico,
**para** poder restablecer mi contraseña y acceder nuevamente a mi cuenta.

---

## Criterios de Aceptación

1. Debe existir un enlace "¿Olvidaste tu contraseña?" en la página de login
2. Al hacer clic, se solicita el correo electrónico registrado
3. Se envía un enlace de recuperación con expiración de 1 hora
4. El enlace debe llevar a un formulario para crear nueva contraseña
5. La nueva contraseña debe cumplir los mismos requisitos que el registro
6. Después del cambio exitoso, se cierran todas las sesiones anteriores
7. Se muestra confirmación del cambio exitoso

---

## Wireframe

### Paso 1: Solicitar Recuperación

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |        RECUPERAR CONTRASEÑA                         | |
|  |                                                     | |
|  |   Ingresa tu correo electrónico y te enviaremos     | |
|  |   un enlace para restablecer tu contraseña.         | |
|  |                                                     | |
|  |   Correo Electrónico                                | |
|  |   +-----------------------------------------------+ | |
|  |   |  📧                                             | | |
|  |   +-----------------------------------------------+ | |
|  |                                                     | |
|  |   +-----------------------------------------------+ | |
|  |   |        ENVIAR ENLACE DE RECUPERACIÓN           | | |
|  |   +-----------------------------------------------+ | |
|  |                                                     | |
|  |   [Volver al inicio de sesión]                      | |
|  |                                                     | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

### Paso 2: Correo Recibido

```
+----------------------------------------------------------+
|  📧 Nuevo correo de CardTrade Market                     |
+----------------------------------------------------------+
|                                                          |
|  Asunto: Restablece tu contraseña                        |
|                                                          |
|  Hola [Nombre],                                          |
|                                                          |
|  Recibimos una solicitud para restablecer tu             |
|  contraseña. Haz clic en el botón de abajo:              |
|                                                          |
|  +----------------------------------------------------+ |
|  |        RESTABLECER MI CONTRASEÑA                    | |
|  +----------------------------------------------------+ |
|                                                          |
|  Este enlace expirará en 1 hora.                         |
|  Si no solicitaste este cambio, ignora este mensaje.     |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/forgot-password` y `/reset-password/:token`
- **Componentes**: `ForgotPasswordPage`, `ResetPasswordPage`
- **Endpoints**:
  - `POST /api/auth/forgot-password` - Enviar email de recuperación
  - `POST /api/auth/reset-password` - Cambiar contraseña
- **Seguridad**: Tokens de un solo uso, expiración de 1 hora
- **Email**: Usar servicio de email transaccional (SendGrid, Mailgun)
