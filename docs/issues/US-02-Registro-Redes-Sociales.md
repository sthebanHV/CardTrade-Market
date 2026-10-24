# [US-02] Registro con Redes Sociales

## Modelo INVEST
- **Independiente**: Funciona sin dependencia de US-01
- **Negociable**: Se pueden agregar más redes sociales
- **Valioso**: Reduce la fricción al registrarse
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación relativamente simple
- **Testable**: Verificar login con cada proveedor

---

## Historia de Usuario

**Como** visitante del sitio,
**quiero** registrarme usando mi cuenta de Google o Facebook,
**para** no tener que crear otra contraseña y ahorrar tiempo.

---

## Criterios de Aceptación

1. Debe haber botones de "Registrar con Google" y "Registrar con Facebook"
2. Al hacer clic, se abre la ventana de autenticación del proveedor
3. Si el usuario acepta, se crea una cuenta vinculada automáticamente
4. El perfil se completa con nombre y foto del proveedor
5. Si el email ya está registrado, se muestra un mensaje informativo
6. El usuario puede luego agregar una contraseña desde su perfil

---

## Wireframe

```
+----------------------------------------------------------+
|  --- O regístrate con ---                                |
|                                                          |
|  [🔵 Google]  [🔵 Facebook]                             |
|                                                          |
+----------------------------------------------------------+

Ventana emergente de Google:

+----------------------------------------------------------+
|  🔐 Google - Selecciona una cuenta                       |
+----------------------------------------------------------+
|                                                          |
|  +------+  usuario@gmail.com                             |
|  | 📷  |  Nombre del Usuario                             |
|  +------+                                                 |
|                                                          |
|  +------+  otro.usuario@gmail.com                        |
|  | 📷  |  Otro Usuario                                   |
|  +------+                                                 |
|                                                          |
|          [Cancelar]              [Continuar]              |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/register`
- **Componentes**: `SocialAuthButtons`, `OAuthCallback`
- **Endpoints**:
  - `GET /api/auth/google` - Iniciar flujo Google
  - `GET /api/auth/google/callback` - Callback de Google
  - `GET /api/auth/facebook` - Iniciar flujo Facebook
  - `GET /api/auth/facebook/callback` - Callback de Facebook
- **Librerías**: Passport.js con strategies de Google y Facebook
- **Variables de entorno**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
