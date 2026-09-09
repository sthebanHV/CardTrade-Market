# [US-03] Perfil de Usuario

**Epic:** Gestión de Usuarios
**Prioridad:** Media
**Estimación:** 6 puntos

---

## Descripción

**Como** usuario registrado,
**quiero** ver y editar mi perfil con mi nombre, avatar y biografía,
**para** personalizar mi presencia en la plataforma y construir confianz con otros usuarios.

---

## Criterios de Aceptación

1. Se muestra la información del perfil: nombre, avatar, biografía, ubicación, fecha de registro y calificación promedio.
2. El usuario puede editar su nombre (debe ser único en el sistema).
3. El usuario puede subir y cambiar su avatar (formato jpg/png, máx 2MB).
4. El usuario puede agregar/editar una biografía de máximo 200 caracteres.
5. El usuario puede establecer/editar su ubicación.
6. El usuario puede cambiar su contraseña desde una sección dedicada del perfil.
7. Los cambios se guardan con un botón "Guardar cambios" y se muestra una confirmación visual.
8. El perfil es visible públicamente para otros usuarios (con información limitada).
9. La vista de perfil propio muestra botones de edición, la vista de otro usuario muestra botón de contacto.
10. El formulario de edición es responsive en dispositivos móviles y de escritorio.
11. Se valida que el nombre no esté en uso por otro usuario antes de guardar.
12. Se muestra un indicador de carga durante la subida del avatar.

---

## Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Mi Perfil  Mis Cartas  ≡      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Mi Perfil                               │  │
│  │                                                           │  │
│  │           ┌─────────┐                                     │  │
│  │           │  Avatar │  ← Cambiar foto                     │  │
│  │           │  👤     │                                     │  │
│  │           └─────────┘                                     │  │
│  │                                                           │  │
│  │  Nombre del Usuario                                       │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Juan Pérez                                        ✏️│  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  Biografía                                               │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ Coleccionista de cartas Pokémon desde 2005.        │  │  │
│  │  │ Especialista en cartas raras y promo.              ✏️│  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │  156/200 caracteres                                       │  │
│  │                                                           │  │
│  │  Ubicación        Fecha de Registro    Calificación       │  │
│  │  Buenos Aires     15 Ene 2024          ⭐ 4.8             │  │
│  │  ┌─────────────┐                                         │  │
│  │  │ Buenos Aires│                                         │  │
│  │  └─────────────┘                                         │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │               Guardar Cambios                        │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Cambiar Contraseña                            │  │
│  │  Contraseña actual    ┌──────────────────────────────┐    │  │
│  │                       │                              │    │  │
│  │  Nueva contraseña     └──────────────────────────────┘    │  │
│  │                       ┌──────────────────────────────┐    │  │
│  │  Confirmar nueva      │                              │    │  │
│  │                       └──────────────────────────────┘    │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              Actualizar Contraseña                   │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────────┐
│  🃏 CardTrade    ≡      │
├─────────────────────────┤
│                         │
│      Mi Perfil          │
│                         │
│       ┌───────┐         │
│       │Avatar │         │
│       │  👤   │         │
│       └───────┘         │
│   Cambiar foto          │
│                         │
│  Nombre                 │
│  ┌───────────────────┐  │
│  │ Juan Pérez        │  │
│  └───────────────────┘  │
│                         │
│  Biografía              │
│  ┌───────────────────┐  │
│  │ Coleccionista de  │  │
│  │ cartas Pokémon... │  │
│  └───────────────────┘  │
│  156/200                │
│                         │
│  Ubicación              │
│  ┌───────────────────┐  │
│  │ Buenos Aires      │  │
│  └───────────────────┘  │
│                         │
│  Registro: 15 Ene 2024  │
│  Calificación: ⭐ 4.8   │
│                         │
│  ┌───────────────────┐  │
│  │  Guardar Cambios  │  │
│  └───────────────────┘  │
│                         │
│  ─────────────────────  │
│  Cambiar Contraseña     │
│  ┌───────────────────┐  │
│  │ Contraseña actual │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ Nueva contraseña  │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ Confirmar nueva   │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ Actualizar        │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

### Perfil Público (otro usuario)

```
┌─────────────────────────────────────────────────────────────────┐
│  🃏 CardTrade Market    Inicio  Buscar  Mis Cartas  ≡         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  Perfil de Juan Pérez                      │  │
│  │                                                           │  │
│  │           ┌─────────┐                                     │  │
│  │           │  Avatar │                                     │  │
│  │           │  👤     │                                     │  │
│  │           └─────────┘                                     │  │
│  │                                                           │  │
│  │  Nombre: Juan Pérez                                       │  │
│  │  Ubicación: Buenos Aires                                  │  │
│  │  Miembro desde: 15 Ene 2024                               │  │
│  │  Calificación: ⭐ 4.8 (23 reseñas)                        │  │
│  │                                                           │  │
│  │  "Coleccionista de cartas Pokémon desde 2005.            │  │
│  │   Especialista en cartas raras y promo."                 │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────────┐ │  │
│  │  │              💬 Contactar                            │ │  │
│  │  └──────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                Cartas de Juan (12)                         │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │  │
│  │  │ Carta 1 │ │ Carta 2 │ │ Carta 3 │ │ Carta 4 │         │  │
│  │  │ $25.00  │ │ $12.50  │ │ $45.00  │ │ $8.00   │         │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘         │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /profile (mi perfil), /profile/:id (perfil público)
- **Componentes:** ProfileView, ProfileEdit, AvatarUpload, PasswordChange, PublicProfile
- **Endpoints:** GET /api/users/me, PUT /api/users/me, GET /api/users/:id, POST /api/users/me/avatar
- **Almacenamiento:** Multer para uploads, Cloudinary o S3 para almacenamiento de imágenes
- **Validación:** Unique constraint en nombre, validación de tipo y tamaño de archivo
- **Cache:** Invalidación de cache de perfil tras actualización
