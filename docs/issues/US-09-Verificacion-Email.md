# [US-09] Verificación de Email

## Modelo INVEST
- **Independiente**: Se ejecuta después de US-01 pero es independiente
- **Negociable**: Tiempo de expiración ajustable
- **Valioso**: Asegura que los correos sean válidos
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar envío y recepción de email

---

## Historia de Usuario

**Como** usuario nuevo,
**quiero** verificar mi correo electrónico después del registro,
**para** activar mi cuenta y acceder a todas las funcionalidades.

---

## Criterios de Aceptación

1. Se envía un correo de veración inmediatamente después del registro
2. El correo contiene un enlace de verificación con expiración de 24 horas
3. Al hacer clic en el enlace, la cuenta se activa
4. Se muestra confirmación de cuenta activada
5. Se puede reenviar el correo de verificación (máximo 3 veces por hora)
6. La cuenta no está completamente activa hasta verificar el email

---

## Wireframe

### Correo de Verificación

```
+----------------------------------------------------------+
|  📧 CardTrade Market - Verifica tu correo                |
+----------------------------------------------------------+
|                                                          |
|  ¡Bienvenido a CardTrade Market!                         |
|                                                          |
|  Gracias por registrarte. Para completar tu registro,    |
|  verifica tu correo electrónico haciendo clic en el      |
|  botón de abajo:                                         |
|                                                          |
|  +----------------------------------------------------+ |
|  |        VERIFICAR MI CORREO                          | |
|  +----------------------------------------------------+ |
|                                                          |
|  Si no puedes hacer clic, copia y pega este enlace:     |
|  https://cardtrade.market/verify?token=abc123...        |
|                                                          |
|  Este enlace expirará en 24 horas.                       |
|                                                          |
|  Si no creaste esta cuenta, puedes ignorar este mensaje. |
|                                                          |
+----------------------------------------------------------+
```

### Banner de Verificación Pendiente

```
+----------------------------------------------------------+
|  ⚠️  Tu correo no está verificado.                        |
|  Revisa tu bandeja de entrada o reenvía el enlace.       |
|  [Reenviar Verificación]                                 |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/verify-email/:token`
- **Componentes**: `VerificationBanner`, `VerificationSuccess`
- **Endpoints**:
  - `POST /api/auth/verify-email` - Enviar email de verificación
  - `GET /api/auth/verify-email/:token` - Verificar token
- **Rate limiting**: Máximo 3 reenvíos por hora
- **Email**: Usar servicio transaccional (SendGrid, Mailgun)
