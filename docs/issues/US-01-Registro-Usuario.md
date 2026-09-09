# [US-01] Registro de Usuario Nuevo

## Modelo INVEST
- **Independiente**: No depende de otras historias para completarse
- **Negociable**: Los campos exactos del formulario pueden ajustarse
- **Valioso**: Permite al usuario acceder a funcionalidades exclusivas
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Se puede completar en un sprint
- **Testable**: Criterios de aceptación claros y verificables

---

## Historia de Usuario

**Como** visitante del sitio,
**quiero** crear una cuenta usando mi correo electrónico y contraseña,
**para** poder acceder a funcionalidades como comprar, vender y gestionar mi colección.

---

## Criterios de Aceptación

1. El formulario debe solicitar: nombre de usuario, correo electrónico y contraseña
2. La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial
3. El correo electrónico debe ser válido y no estar registrado previamente
4. Se debe enviar un correo de verificación después del registro
5. El usuario debe poder verificar su email para activar la cuenta
6. Si el registro es exitoso, el usuario debe ser redirigido a la página principal
7. Se debe mostrar un mensaje de error claro si el correo ya está registrado
8. Se debe aceptar la política de privacidad y términos de uso

---

## Wireframe

### Formulario de Registro

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market                                |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |           CREAR CUENTA                              | |
|  |                                                     | |
|  |  Nombre de Usuario                                  | |
|  |  +-----------------------------------------------+  | |
|  |  |                                               |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Correo Electrónico                                | |
|  |  +-----------------------------------------------+  | |
|  |  |                                               |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Contraseña                                         | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔒                              [Mostrar]    |  | |
|  |  +-----------------------------------------------+  | |
|  |  Mínimo 8 caracteres, 1 mayúscula, 1 número        | |
|  |                                                     | |
|  |  Confirmar Contraseña                               | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔒                                             |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [ ] Acepto la Política de Privacidad y             | |
|  |      Términos de Uso                                | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |           CREAR CUENTA                        |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  ¿Ya tienes una cuenta? Iniciar sesión              | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  --- O regístrate con ---                                |
|                                                          |
|  [🔵 Google]  [🔵 Facebook]                             |
|                                                          |
+----------------------------------------------------------+
```

### Registro Exitoso

```
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |           ✅ ¡Cuenta Creada!                        | |
|  |                                                     | |
|  |   Hemos enviado un correo de verificación a:        | |
|  |   usuario@correo.com                                | |
|  |                                                     | |
|  |   Revisa tu bandeja de entrada y haz clic en        | |
|  |   "Verificar mi cuenta" para activar tu cuenta.     | |
|  |                                                     | |
|  |   +-----------------------------------------------+ | |
|  |  |        REENVIAR CORREO DE VERIFICACIÓN         | | |
|  |  +-----------------------------------------------+ | |
|  |                                                     | |
|  |  [Ir a la Página Principal]                         | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/register`
- **Componentes**: `RegisterPage`, `RegisterForm`, `SocialButtons`
- **Endpoints**:
  - `POST /api/auth/register` - Crear cuenta
  - `POST /api/auth/verify-email` - Verificar email
- **Validación**: Implementar validación en cliente y servidor
- **Seguridad**: Hashear contraseñas con bcrypt, rate limiting en intentos
