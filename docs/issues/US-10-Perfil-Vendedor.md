# [US-10] Perfil de Vendedor

**Epic:** Publicación y Venta
**Prioridad:** Media
**Estimación:** 3 puntos

---

## Historia de Usuario

**Como** comprador potencial,
**quiero** ver el perfil y las publicaciones de un vendedor específico,
**para** evaluar su confiabilidad y ver qué más tiene disponible.

---

## Criterios de Aceptance

- [ ] Se muestra información del vendedor: nombre, avatar, ubicación
- [ ] Se muestra calificación (estrellas) y número de ventas
- [ ] Se muestra fecha de registro ("Miembro desde...")
- [ ] Lista de todas las publicaciones activas del vendedor
- [ ] Estadísticas: ventas completadas, tiempo promedio de respuesta
- [ ] Botón para contactar al vendedor (chat o mensaje)
- [ ] Reseñas/opiniones de otros compradores
- [ ] Responsive mobile/desktop

---

## Wireframe - Perfil del Vendedor

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  ← Volver                                                |
|                                                          |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |       +-------------+                               | |
|  |       |             |                               | |
|  |       |   [Avatar]  |   CardMaster_MX               | |
|  |       |             |   Ciudad de México             | |
|  |       +-------------+   Miembro desde: Mar 2023     | |
|  |                                                     | |
|  |   ★★★★☆ (4.2)  |  47 ventas completadas            | |
|  |                  |  Responde en < 2 horas           | |
|  |                                                     | |
|  |   "Coleccionista profesional de cartas raras"       | |
|  |                                                     | |
|  |   +------------------+  +------------------+        | |
|  |   | 📨 ENVIAR MENSAJE|  |  Ver reseñas (12)|        | |
|  |   +------------------+  +------------------+        | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  PUBLICACIONES DE CardMaster_MX (12)                 | |
|  |                                                     | |
|  |  +----------+  +----------+  +----------+          | |
|  |  |  [Img]   |  |  [Img]   |  |  [Img]   |          | |
|  |  |Charizard |  | Pikachu  |  | Mewtwo   |          | |
|  |  |ex Full   |  | Full Art |  | Base Set |          | |
|  |  |Art       |  |          |  |          |          | |
|  |  |$45.00    |  |$28.00    |  |$89.00    |          | |
|  |  +----------+  +----------+  +----------+          | |
|  |                                                     | |
|  |  +----------+  +----------+  +----------+          | |
|  |  |  [Img]   |  |  [Img]   |  |  [Img]   |          | |
|  |  |Lugia     |  | Umbreon  |  | Rayquaza |          | |
|  |  |VSTAR     |  | VMAX     |  | MAX      |          | |
|  |  |$67.00    |  |$52.00    |  |$78.00    |          | |
|  |  +----------+  +----------+  +----------+          | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Reseñas del Vendedor

```
+----------------------------------------------------------+
|  RESEÑAS DE CardMaster_MX (12)                            |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  ★★★★★  Comprador123 - 20 Ene 2024                  | |
|  |  "Excelente vendedor, carta en perfecto estado,     | |
|  |   envío rápido. Recomendado!"                       | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ★★★★☆  CollectorPro - 15 Ene 2024                 | |
|  |  "Buena comunicación, carta como se describía.      | |
|  |   Un poco tardó el envío pero bien."                | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ★★★★★  CardFan99 - 10 Ene 2024                    | |
|  |  "Perfecto! Muy profesional."                       | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/seller/:id`
- **Componentes:** `SellerProfile`, `SellerStats`, `SellerListings`, `SellerReviews`
- **Endpoints:**
  - `GET /api/users/:id` - Perfil del vendedor
  - `GET /api/users/:id/listings` - Publicaciones del vendedor
  - `GET /api/users/:id/reviews` - Reseñas del vendedor
