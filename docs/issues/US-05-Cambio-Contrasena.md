# [US-05] Cambio de Contraseña

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Se pueden agregar más opciones de seguridad
- **Valioso**: Mejora la seguridad de la cuenta
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar cambio con contraseña actual correcta e incorrecta

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** cambiar mi contraseña desde mi perfil,
**para** mantener mi cuenta segura.

---

## Criterios de Aceptación

1. Se debe solicitar la contraseña actual antes de cambiar
2. Se debe ingresar la nueva contraseña dos veces para confirmar
3. La nueva contraseña debe cumplir los requisitos de seguridad
4. Si la contraseña actual es incorrecta, mostrar error
5. Después del cambio, cerrar sesión y solicitar nuevo login
6. Enviar notificación por email del cambio de contraseña

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  CAMBIAR CONTRASEÑA                                 | |
|  |                                                     | |
|  |  Contraseña Actual                                  | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔒                                             |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Nueva Contraseña                                   | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔒                              [Mostrar]    |  | |
|  |  +-----------------------------------------------+  | |
|  |  Mínimo 8 caracteres, 1 mayúscula, 1 número        | |
|  |                                                     | |
|  |  Confirmar Nueva Contraseña                         | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔒                                             |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |        GUARDAR CAMBIOS                         |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/settings/change-password`
- **Componentes**: `ChangePasswordForm`
- **Endpoints**:
  - `PUT /api/auth/change-password` - Cambiar contraseña
- **Seguridad**: Reautenticación requerida, hash con bcrypt
- **Email**: Notificación de cambio de contraseña
