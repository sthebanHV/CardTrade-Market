# [US-08] Autenticación de Dos Factores

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Se pueden agregar más métodos de verificación
- **Valioso**: Aumenta significativamente la seguridad de la cuenta
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar de 2FA
- **Testable**: Verificar con código correcto e incorrecto

---

## Historia de Usuario

**Como** usuario preocupado por la seguridad,
**quiero** activar la autenticación de dos factores en mi cuenta,
**para** proteger mis datos y transacciones con una capa adicional de seguridad.

---

## Criterios de Aceptación

1. Debe haber una opción para activar 2FA en configuración de seguridad
2. Se puede usar autenticador (Google Authenticator, Authy) o SMS
3. Al activar, se muestra un código QR para vincular con la app
4. Se debe ingresar un código de verificación para confirmar la activación
5. Se generan códigos de respaldo para usar si se pierde el teléfono
6. Se puede desactivar 2FA ingresando la contraseña actual
7. En cada inicio de sesión, se solicita el código de verificación

---

## Wireframe

### Activar 2FA

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  AUTENTICACIÓN DE DOS FACTORES                       | |
|  |                                                     | |
|  |  Escanea este código QR con tu app de autenticación: | |
|  |                                                     | |
|  |         +------------------+                         | |
|  |         |  ██████████████  |                         | |
|  |         |  ██ QR CODE  ██  |                         | |
|  |         |  ██████████████  |                         | |
|  |         +------------------+                         | |
|  |                                                     | |
|  |  Código manual: JBSWY3DPEHPK3PXP                    | |
|  |                                                     | |
|  |  Ingresa el código de 6 dígitos:                    | |
|  |  +---+ +---+ +---+  -  +---+ +---+ +---+           | |
|  |  | 5 | | 2 | | 7 |     | 1 | | 9 | | 4 |           | |
|  |  +---+ +---+ +---+     +---+ +---+ +---+           | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |        ACTIVAR 2FA                            |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

### Códigos de Respaldo

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  TUS CÓDIGOS DE RESPALDO                             | |
|  |                                                     | |
|  |  Guarda estos códigos en un lugar seguro.           | |
|  |  Cada código solo se puede usar una vez.            | |
|  |                                                     | |
|  |  • A7X9-K2M4-N8P2-Q5R1                              | |
|  |  • B3Y6-L8N1-P4T7-W9V2                              | |
|  |  • C5Z2-M6Q4-R8S1-X3Y5                              | |
|  |  • D1A8-O2P6-T4U7-Z9B3                              | |
|  |  • E7C4-Q5R9-V2W8-A6D1                              | |
|  |                                                     | |
|  |  [Descargar como PDF]  [Copiar Todos]               | |
|  |                                                     | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/settings/security`
- **Componentes**: `TwoFactorSetup`, `QRCodeDisplay`, `BackupCodes`
- **Endpoints**:
  - `POST /api/auth/2fa/enable` - Activar 2FA
  - `POST /api/auth/2fa/verify` - Verificar código
  - `POST /api/auth/2fa/disable` - Desactivar 2FA
  - `GET /api/auth/2fa/backup-codes` - Obtener códigos de respaldo
- **Librerías**: `speakeasy` para generar secretos, `qrcode` para QR
