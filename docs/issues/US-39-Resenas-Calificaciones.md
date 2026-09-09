# [US-39] Reseñas y Calificaciones

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Criterios de calificación ajustables
- **Valioso**: Genera confianza en la comunidad
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar crear, editar y eliminar reseñas

---

## Historia de Usuario

**Como** comprador,
**quiero** calificar y reseñar vendedores después de una compra,
**para** ayudar a otros compradores a decidir.

---

## Criterios de Aceptación

1. Solo se puede reseñar después de una compra completada
2. Calificación de 1 a 5 estrellas
3. Comentario de texto opcional
4. Solo una reseña por compra
5. Editar o eliminar la reseña propia
6. Las reseñas son públicas en el perfil del vendedor

---

## Wireframe

### Dejar Reseña

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  DEJAR RESEÑA                                      | |
|  |                                                     | |
|  |  Compra: #CTM-2026-001234                           | |
|  |  Vendedor: CardMaster_MX                            | |
|  |                                                     | |
|  |  Calificación:                                      | |
|  |  ⭐ ⭐ ⭐ ⭐ ⭐                                      | |
|  |                                                     | |
|  |  Tu reseña (opcional):                              | |
|  |  +-----------------------------------------------+  | |
|  |  |  Excelente vendedor, envío rápido y carta     |  | |
|  |  |  en perfecto estado. Totalmente recomendado.   |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Cancelar]              [Publicar Reseña]          | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

### Reseñas en Perfil

```
+----------------------------------------------------------+
|  RESEÑAS (124) - Promedio: ⭐ 4.8                        |
|                                                          |
|  ⭐⭐⭐⭐⭐ "Excelente vendedor"                           |
|  Comprador123 - hace 2 días                              |
|  "Envío rápido y carta en perfecto estado"              |
|                                                          |
|  ⭐⭐⭐⭐⭐ "Muy confiable"                                |
|  TCG_Fan - hace 1 semana                                |
|  "Buen embalaje y comunicación"                         |
|                                                          |
|  ⭐⭐⭐⭐☆ "Buen vendedor"                                |
|  User456 - hace 2 semanas                               |
|  "Todo correcto, algo lento el envío"                   |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/my-purchases/:orderId` y `/seller/:username`
- **Componentes**: `ReviewForm`, `ReviewList`, `StarRating`
- **Endpoints**:
  - `POST /api/reviews` - Crear reseña
  - `PUT /api/reviews/:id` - Actualizar reseña
  - `DELETE /api/reviews/:id` - Eliminar reseña
  - `GET /api/sellers/:username/reviews` - Reseñas del vendedor
