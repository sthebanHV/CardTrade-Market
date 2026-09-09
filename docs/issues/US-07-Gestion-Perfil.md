# [US-07] Gestión de Perfil

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Campos del perfil ajustables
- **Valioso**: Permite al usuario personalizar su información pública
- **Estimable**: 6 puntos de esfuerzo
- **Pequeño**: Se puede completar en un sprint
- **Testable**: Verificar cambios se guardan correctamente

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** editar mi información personal y foto de perfil,
**para** mantener mi información actualizada y personalizar mi cuenta.

---

## Criterios de Aceptación

1. El usuario puede cambiar su nombre de usuario
2. El usuario puede cambiar su foto de perfil (máximo 5MB, JPG/PNG)
3. El usuario puede editar su biografía (máximo 200 caracteres)
4. El usuario puede cambiar su correo electrónico (requiere verificación)
5. Se debe validar que el nuevo nombre de usuario no esté en uso
6. Los cambios se reflejan inmediatamente en el perfil público
7. Se debe guardar un historial de cambios recientes

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MI PERFIL                                          | |
|  |                                                     | |
|  |      +----------+                                   | |
|  |      |          |   Nombre de Usuario               | |
|  |      |  [Foto]  |   [cardmaster_mx]                 | |
|  |      |          |                                   | |
|  |      +----------+   [Cambiar Foto]                  | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  Nombre Completo                                    | |
|  |  +-----------------------------------------------+  | |
|  |  |  Carlos Méndez                                  |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Correo Electrónico                                 | |
|  |  +-----------------------------------------------+  | |
|  |  |  carlos@email.com  [Verificado ✓]              |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Biografía                                          | |
|  |  +-----------------------------------------------+  | |
|  |  |  Coleccionista de Pokémon desde 2010.          |  | |
|  |  |  Especialista en cartas vintage y raras.       |  | |
|  |  |                                                 |  | |
|  |  +-----------------------------------------------+  | |
|  |  148/200 caracteres                                | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |           GUARDAR CAMBIOS                      |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/profile/edit`
- **Componentes**: `ProfileEditor`, `AvatarUploader`, `BioTextarea`
- **Endpoints**:
  - `GET /api/users/profile` - Obtener perfil
  - `PUT /api/users/profile` - Actualizar perfil
  - `POST /api/users/profile/avatar` - Subir avatar
- **Almacenamiento**: AWS S3 o Cloudinary para fotos de perfil
- **Validación**: Validar tamaño y tipo de archivo
