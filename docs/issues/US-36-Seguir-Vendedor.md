# [US-36] Seguir Vendedor

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: No hay elementos negociables
- **Valioso**: Permite enterarse de nuevas publicaciones
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar seguir y dejar de seguir

---

## Historia de Usuario

**Como** usuario,
**quiero** seguir vendedores para enterarme de sus nuevas publicaciones,
**para** no perderme ofertas interesantes.

---

## Criterios de Aceptación

1. Botón "Seguir" en el perfil de cada vendedor
2. Botón "Dejar de Seguir" cuando ya se sigue
3. Lista de vendedores seguidos
4. Notificación cuando un vendedor seguido publica algo nuevo
5. Contador de seguidores en el perfil del vendedor

---

## Wireframe

### Botón de Seguir

```
+----------------------------------------------------------+
|  PERFIL DEL VENDEDOR                                      |
|  +----------+   CardMaster_MX                            |
|  |          |   ⭐ 4.8 (124 reseñas)                    |
|  |  [Foto]  |   856 seguidores                           |
|  |          |   [Seguir] [Contactar]                     |
|  +----------+                                            |
+----------------------------------------------------------+
```

### Lista de Seguidos

```
+----------------------------------------------------------+
|  VENDEDORES QUE SIGO (12)                                |
|                                                          |
|  +------+ CardMaster_MX    ⭐ 4.8  [Dejar de Seguir]    |
|  | [img]| 856 ventas                                  | |
|  +------+                                               |
|                                                          |
|  +------+ PikachuFan        ⭐ 4.5  [Dejar de Seguir]    |
|  | [img]| 234 ventas                                  | |
|  +------+                                               |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/seller/:username` y `/my-followed`
- **Componentes**: `FollowButton`, `FollowedList`
- **Endpoints**:
  - `POST /api/sellers/:username/follow` - Seguir vendedor
  - `DELETE /api/sellers/:username/follow` - Dejar de seguir
  - `GET /api/users/followed` - Vendedores seguidos
