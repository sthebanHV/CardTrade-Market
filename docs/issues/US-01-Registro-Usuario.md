# [US-01] Registro de Usuario Nuevo

**Epic:** Gestión de Usuarios
**Prioridad:** Alta
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** visitante,
**quiero** poder registrarme en la plataforma con mi nombre, email y contraseña,
**para** poder crear una cuenta y acceder a funcionalidades como comprar, vender y gestionar mi colección.

---

## Criterios de Aceptance

- [ ] El formulario de registro muestra campos: Nombre, Email, Contraseña, Confirmar Contraseña
- [ ] El nombre debe tener entre 2 y 50 caracteres
- [ ] El email debe ser válido y no estar registrado previamente
- [ ] La contraseña debe tener mínimo 8 caracteres
- [ ] La confirmación de contraseña debe coincidir
- [ ] Se muestra mensaje de error específico por campo inválido
- [ ] Al registrarse exitosamente, el usuario es redirigido al Dashboard
- [ ] El usuario queda automáticamente autenticado tras registro
- [ ] Existe link "¿Ya tienes cuenta? Inicia sesión"
- [ ] Formulario responsive (mobile y desktop)

---

## Wireframe - Registro

```
+----------------------------------------------------------+
|  [Logo] CardTrade Market              [Iniciar Sesión]   |
+----------------------------------------------------------+
|                                                          |
|            +-----------------------------------+         |
|            |      CREAR CUENTA                 |         |
|            +-----------------------------------+         |
|            |                                   |         |
|            |  Nombre                           |         |
|            |  +-----------------------------+  |         |
|            |  |                             |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  Email                            |         |
|            |  +-----------------------------+  |         |
|            |  |                             |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  Contraseña                       |         |
|            |  +-----------------------------+  |         |
|            |  |  ••••••••              [👁] |  |         |
|            |  +-----------------------------+  |         |
|            |  Mínimo 8 caracteres              |         |
|            |                                   |         |
|            |  Confirmar Contraseña             |         |
|            |  +-----------------------------+  |         |
|            |  |  ••••••••              [👁] |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  +-----------------------------+  |         |
|            |  |      REGISTRARSE            |  |         |
|            |  +-----------------------------+  |         |
|            |                                   |         |
|            |  ¿Ya tienes cuenta? Inicia sesión|         |
|            |                                   |         |
|            +-----------------------------------+         |
|                                                          |
+----------------------------------------------------------+
|  Footer                                                   |
+----------------------------------------------------------+
```

---

## Wireframe - Validación de Errores

```
+-----------------------------------+
|  Nombre                           |
|  +-----------------------------+  |
|  | Juan Pérez                  |  |
|  +-----------------------------+  |
|                                   |
|  Email                            |
|  +-----------------------------+  |
|  | juan@email.com              |  |
|  +-----------------------------+  |
|  ⚠️ Este email ya está registrado |
|                                   |
|  Contraseña                       |
|  +-----------------------------+  |
|  | 12345                [👁]   |  |
|  +-----------------------------+  |
|  ⚠️ Mínimo 8 caracteres          |
|                                   |
+-----------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/register`
- **Componentes:** `RegisterForm`, `InputField`, `ErrorMessage`
- **Validación:** React Hook Form + Express-validator
- **Endpoint:** `POST /api/auth/register`
