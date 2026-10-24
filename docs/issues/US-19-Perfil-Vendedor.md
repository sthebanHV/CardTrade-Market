# [US-19] Perfil de Vendedor

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Información mostrada ajustable
- **Valioso**: Genera confianza en los compradores
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar de perfil
- **Testable**: Verificar que se muestra toda la información

---

## Historia de Usuario

**Como** comprador,
**quiero** ver el perfil de un vendedor con sus reseñas y estadísticas,
**para** decidir si compro de forma segura.

---

## Criterios de Aceptación

1. Mostrar nombre de usuario, foto y biografía
2. Mostrar rating promedio y cantidad de reseñas
3. Mostrar estadísticas: ventas realizadas, miembro desde
4. Mostrar publicaciones activas del vendedor
5. Mostrar reseñas recientes de otros compradores
6. Permitir seguir al vendedor
7. Permitir contactar al vendedor

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  PERFIL DEL VENDEDOR                                | |
|  |                                                     | |
|  |  +----------+   CardMaster_MX                       | |
|  |  |          |   ⭐ 4.8 (124 reseñas)               | |
|  |  |  [Foto]  |   Miembro desde Enero 2023            | |
|  |  |          |                                       | |
|  |  +----------+   [Seguir] [Contactar]                | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  ESTADÍSTICAS                                       | |
|  |  +-----------+ +-----------+ +-----------+          | |
|  |  | 856       | | 98%       | | 2.3 días  |          | |
|  |  | Ventas    | | Positivas | | Envío      |          | |
|  |  | realizadas| |           | | promedio   |          | |
|  |  +-----------+ +-----------+ +-----------+          | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  PUBLICACIONES ACTIVAS (12)                         | |
|  |  +--------+ +--------+ +--------+ +--------+       | |
|  |  | [img]  | | [img]  | | [img]  | | [img]  |       | |
|  |  | Card 1 | | Card 2 | | Card 3 | | Card 4 |       | |
|  |  +--------+ +--------+ +--------+ +--------+       | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  RESEÑAS RECIENTES                                  | |
|  |  ⭐⭐⭐⭐⭐ "Excelente vendedor, envío rápido"        | |
|  |  - Comprador123, hace 2 días                        | |
|  |                                                     | |
|  |  ⭐⭐⭐⭐⭐ "Carta en perfecto estado"                | |
|  |  - TCG_Fan, hace 1 semana                           | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/seller/:username`
- **Componentes**: `SellerProfile`, `SellerStats`, `SellerReviews`, `SellerListings`
- **Endpoints**:
  - `GET /api/sellers/:username` - Perfil del vendedor
  - `GET /api/sellers/:username/listings` - Publicaciones del vendedor
  - `GET /api/sellers/:username/reviews` - Reseñas del vendedor
  - `POST /api/sellers/:username/follow` - Seguir vendedor
