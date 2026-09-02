# [US-03] Perfil de Usuario

**Epic:** Gestión de Usuarios
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** poder ver y editar mi perfil con información como nombre, avatar y biografía,
**para** personalizar mi presencia en la plataforma y que otros usuarios me identifiquen.

---

## Criterios de Aceptance

- [ ] El perfil muestra: nombre de usuario, avatar, biografía, ubicación, fecha de registro, calificación
- [ ] Puedo editar mi nombre, avatar, biografía y ubicación
- [ ] El nombre de usuario es único (validación al editar)
- [ ] La biografía tiene un límite de 200 caracteres con contador
- [ ] Puedo subir/cambiar mi foto de avatar
- [ ] Puedo cambiar mi contraseña (requiere contraseña actual)
- [ ] Los cambios se guardan exitosamente con mensaje de confirmación
- [ ] Otros usuarios pueden ver mi perfil público
- [ ] Mi perfil público muestra: nombre, avatar, bio, publicaciones activas, calificación

---

## Wireframe - Mi Perfil (Edición)

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [Mi Perfil] [≡]  |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MI PERFIL                                          | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |       +-------------+                               | |
|  |       |             |                               | |
|  |       |   [Avatar]  |   Mi Nombre de Usuario        | |
|  |       |             |   usuario@email.com           | |
|  |       |   [Cambiar] |   Miembro desde: Ene 2024     | |
|  |       +-------------+   Calificación: ★★★★☆ (4.2)   | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  Nombre de Usuario                                  | |
|  |  +-----------------------------+                    | |
|  |  | MiNombreUsuario             |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Biografía (0/200)                                  | |
|  |  +-----------------------------+                    | |
|  |  | Coleccionista de cartas     |                    | |
|  |  | desde 2020...               |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Ubicación                                          | |
|  |  +-----------------------------+                    | |
|  |  | Ciudad de México            |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  +-----------------------------+                    | |
|  |  |      GUARDAR CAMBIOS       |                     | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  [Cambiar Contraseña]                               | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Perfil Público

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  PERFIL DE USUARIO                                  | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |       +-------------+                               | |
|  |       |             |                               | |
|  |       |   [Avatar]  |   Nombre del Vendedor         | |
|  |       |             |   Ubicación                   | |
|  |       +-------------+   Calificación: ★★★★★ (4.8)  | |
|  |                             Miembro desde: Mar 2023 | |
|  |                                                     | |
|  |  "Coleccionista apasionado de cartas Pokémon"       | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  PUBLICACIONES ACTIVAS (12)                         | |
|  |                                                     | |
|  |  +----------+  +----------+  +----------+          | |
|  |  | [Img]    |  | [Img]    |  | [Img]    |          | |
|  |  | Charizar |  | Pikachu  |  | Mewtwo   |          | |
|  |  | $45.00   |  | $12.00   |  | $89.00   |          | |
|  |  +----------+  +----------+  +----------+          | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Rutas:** `/profile` (mi perfil), `/user/:id` (perfil público)
- **Componentes:** `ProfilePage`, `ProfileForm`, `AvatarUpload`, `PublicProfile`
- **Endpoints:**
  - `GET /api/users/:id` - Obtener perfil
  - `PUT /api/users/profile` - Actualizar perfil
  - `POST /api/users/avatar` - Subir avatar
