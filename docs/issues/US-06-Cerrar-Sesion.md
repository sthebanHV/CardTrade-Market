# [US-06] Cerrar Sesión

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: No hay elementos negociables
- **Valioso**: Protege la cuenta cuando el usuario comparte dispositivo
- **Estimable**: 2 puntos de esfuerzo
- **Pequeño**: Implementación muy simple
- **Testable**: Verificar que la sesión se cierre correctamente

---

## Historia de Usuario

**Como** usuario registrado,
**quiero** cerrar mi sesión de forma segura,
**para** proteger mi cuenta cuando uso un dispositivo compartido.

---

## Criterios de Aceptación

1. Debe haber un botón "Cerrar Sesión" accesible en el menú
2. Al hacer clic, se elimina la sesión y se redirige al home
3. Se debe limpiar el token de autenticación del navegador
4. Si el usuario tenía "Recordarme", se elimina esa preferencia
5. Se muestra un mensaje de confirmación: "Sesión cerrada exitosamente"

---

## Wireframe

### Menú con Opción de Cerrar Sesión

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Buscar...]  [🛒] [👤]   |
+----------------------------------------------------------+
                                                  [▼]
                                            +----------------+
                                            | Mi Perfil      |
                                            | Mis Compras    |
                                            | Mis Ventas     |
                                            | Favoritos      |
                                            | ─────────────  |
                                            | Cerrar Sesión  |
                                            +----------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde cualquier página
- **Componentes**: `UserMenu`, `LogoutButton`
- **Endpoints**:
  - `POST /api/auth/logout` - Cerrar sesión
- **Seguridad**: Invalidar token JWT en servidor
- **Cookies**: Eliminar cookies de sesión
