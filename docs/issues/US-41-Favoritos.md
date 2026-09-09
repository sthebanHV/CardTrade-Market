# [US-41] Sistema de Favoritos

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: No hay elementos negociables
- **Valioso**: Permite guardar cartas de interés
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar agregar y eliminar favoritos

---

## Historia de Usuario

**Como** usuario,
**quiero** guardar cartas favoritas para verlas después,
**para** no perder el seguimiento de cartas que me interesan.

---

## Criterios de Aceptación

1. Botón de corazón en cada carta
2. Heart se llena cuando es favorito
3. Lista de todas las cartas favoritas
4. Eliminar de favoritos con un clic
5. Contador de favoritos en el menú
6. Notificación si un favorito cambia de precio

---

## Wireframe

### Botón de Favorito

```
+----------------------------------------------------------+
|  +--------+                                              |
|  | [img]  |  Charizard ex Full ART                       |
|  |        |  $45.00  [♥ Favorito]                       |
|  +--------+                                              |
+----------------------------------------------------------+
```

### Lista de Favoritos

```
+----------------------------------------------------------+
|  MIS FAVORITOS (12 cartas guardadas)                      |
|                                                          |
|  +------+  Charizard ex Full ART                         |
|  |      |  $45.00  [Quitar]                              |
|  | [img]|                                                |
|  +------+                                                |
|                                                          |
|  +------+  Pikachu VMAX Rainbow                          |
|  |      |  $28.00  [Quitar]                              |
|  | [img]|                                                |
|  +------+                                                |
|                                                          |
|  +------+  Blue-Eyes White Dragon                        |
|  |      |  $120.00  [Quitar]                             |
|  | [img]|                                                |
|  +------+                                                |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/favorites`
- **Componentes**: `FavoriteButton`, `FavoriteList`
- **Endpoints**:
  - `POST /api/favorites` - Agregar a favoritos
  - `DELETE /api/favorites/:cardId` - Quitar de favoritos
  - `GET /api/favorites` - Obtener favoritos
