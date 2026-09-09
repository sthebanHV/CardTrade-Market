# [US-03] Inicio de Sesión

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Se pueden agregar opciones de login
- **Valioso**: Acceso seguro a la cuenta del usuario
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar con credenciales válidas e inválidas

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** iniciar sesión con mi correo electrónico y contraseña,
**para** acceder a mi cuenta y utilizar todas las funcionalidades.

---

## Criterios de Aceptación

1. El formulario debe solicitar correo electrónico y contraseña
2. Se debe validar que ambos campos estén completos
3. Si las credenciales son correctas, redirigir a la página principal
4. Si son incorrectas, mostrar mensaje de error sin revelar qué campo falla
5. Se debe mostrar opción "¿Olvidaste tu contraseña?"
6. Se debe mostrar opción de iniciar sesión con redes sociales
7. Implementar bloqueo temporal después de 5 intentos fallidos
8. La sesión debe persistir durante 7 días si se marca "Recordarme"

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market                                |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |           INICIAR SESIÓN                            | |
|  |                                                     | |
|  |  Correo Electrónico                                | |
|  |  +-----------------------------------------------+  | |
|  |  |  📧                                             |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Contraseña                                         | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔒                    [Mostrar] [Ocultar]    |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [x] Recordarme en este dispositivo                 | |
|  |                                                     | |
|  |  ¿Olvidaste tu contraseña?                          | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |           INICIAR SESIÓN                       |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  ¿No tienes una cuenta? Regístrate                  | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  --- O inicia sesión con ---                             |
|                                                          |
|  [🔵 Google]  [🔵 Facebook]                             |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/login`
- **Componentes**: `LoginPage`, `LoginForm`, `SocialButtons`
- **Endpoints**:
  - `POST /api/auth/login` - Iniciar sesión
- **Seguridad**: JWT tokens, rate limiting, account lockout
- **Cookies**: HttpOnly cookies para sesión persistente
