# [US-02] Inicio de Sesión

**Epic:** Gestión de Usuarios
**Prioridad:** Alta
**Estimación:** 3 puntos

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** iniciar sesión con mi email y contraseña,
**para** acceder a mi cuenta y utilizar todas las funcionalidades de la plataforma.

---

## Criterios de Aceptance

- [ ] El formulario muestra campos: Email y Contraseña
- [ ] Se valida que ambos campos estén completos
- [ ] Las credenciales se verifican contra la base de datos
- [ ] Al autenticarse, se genera token JWT y se almacena
- [ ] El usuario es redirigido al Dashboard tras login exitoso
- [ ] Se muestra mensaje de error si las credenciales son incorrectas
- [ ] Opción "Recordarme" que mantiene la sesión
- [ ] Link "¿Olvidaste tu contraseña?"
- [ ] Link "¿No tienes cuenta? Regístrate"
- [ ] Formulario responsive

---

## Wireframe - Inicio de Sesión

```
+----------------------------------------------------------+
|  [Logo] CardTrade Market                                  |
+----------------------------------------------------------+
|                                                          |
|            +-----------------------------------+         |
|            |      INICIAR SESIÓN               |         |
|            +-----------------------------------+         |
|            |                                   |         |
|            |  Email                            |         |
|            |  +-----------------------------+  |         |
|            |  | usuario@email.com           |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  Contraseña                       |         |
|            |  +-----------------------------+  |         |
|            |  |  ••••••••              [👁] |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  [x] Recordarme                   |         |
|            |                                   |         |
|            |  +-----------------------------+  |         |
|            |  |      INICIAR SESIÓN         |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  ¿Olvidaste tu contraseña?        |         |
|            |                                   |         |
|            |  ─────────── o ───────────        |         |
|            |                                   |         |
|            |  ¿No tienes cuenta? Regístrate    |         |
|            |                                   |         |
|            +-----------------------------------+         |
|                                                          |
+----------------------------------------------------------+
|  Footer                                                   |
+----------------------------------------------------------+
```

---

## Wireframe - Error de Login

```
+-----------------------------------+
|  Email                            |
|  +-----------------------------+  |
|  | usuario@email.com           |  |
|  +-----------------------------+  |
|                                   |
|  Contraseña                       |
|  +-----------------------------+  |
|  | incorrecta            [👁]  |  |
|  +-----------------------------+  |
|                                   |
|  ⚠️ Email o contraseña incorrectos |
|                                   |
|  +-----------------------------+  |
|  |      INICIAR SESIÓN         |  |
|  +-----------------------------+  |
|                                   |
+-----------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/login`
- **Componentes:** `LoginForm`, `InputField`, `RememberMe`
- **Endpoint:** `POST /api/auth/login`
- **Response:** `{ token, user: { id, name, email, avatar } }`
- **Almacenamiento token:** localStorage + httpOnly cookie refresh
