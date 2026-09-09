# [US-14] Perfil de Vendedor

**Epic:** Publicación y Venta
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Descripción

**Como** comprador potencial,
**quiero** ver el perfil de un vendedor,
**para** evaluar su confiabilidad antes de realizar una compra.

---

## Criterios de Aceptación

1. Se muestra la información básica del vendedor: nombre, avatar e ubicación.
2. Se muestra la calificación promedio en estrellas y el número total de ventas realizadas.
3. Se muestra la fecha de registro del vendedor ("Miembro desde...").
4. Se listan las publicaciones activas del vendedor en su perfil.
5. Se muestran estadísticas del vendedor: ventas completadas y tiempo promedio de respuesta.
6. Existe un botón "Contactar" que permite iniciar una conversación con el vendedor.
7. Se muestra una sección de reseñas de otros compradores con puntuación y comentario.
8. El diseño es completamente responsive.
9. Si el vendedor no tiene ventas, se muestra un mensaje indicando que es nuevo en la plataforma.
10. Las reseñas se ordenan por fecha, mostrando las más recientes primero.
11. Se muestra el total de reseñas recibidas por el vendedor.
12. El perfil es accesible desde la tarjeta de carta y desde los resultados de búsqueda.

---

## Wireframe

### Perfil del Vendedor

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver]                                 Perfil del Vendedor            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │     ┌─────────┐                                                     │   │
│  │     │   👤    │  Carlos Martínez                                    │   │
│  │     │  Avatar │  📍 Ciudad de México, México                        │   │
│  │     └─────────┘                                                     │   │
│  │                                                                     │   │
│  │     ⭐⭐⭐⭐½  4.5/5  (47 reseñas)                                  │   │
│  │                                                                     │   │
│  │     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │   │
│  │     │ 🏆          │  │ 📦          │  │ ⏱️          │             │   │
│  │     │ 128 ventas  │  │ 23 activas  │  │ ~2h resp.   │             │   │
│  │     │ completadas │  │ publicaciones│  │ promedio    │             │   │
│  │     └─────────────┘  └─────────────┘  └─────────────┘             │   │
│  │                                                                     │   │
│  │     📅 Miembro desde Enero 2024                                     │   │
│  │                                                                     │   │
│  │     [💬 Contactar vendedor]                                         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📦 PUBLICACIONES ACTIVAS (23)                                      │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐             │   │
│  │  │  Card    │ │  Card    │ │  Card    │ │  Card    │             │   │
│  │  │  Image   │ │  Image   │ │  Image   │ │  Image   │             │   │
│  │  │ Charizard│ │ Blastoise│ │ Venusaur  │ │ Mewtwo   │             │   │
│  │  │ $150.00  │ │ $95.00   │ │ $80.00   │ │ $60.00   │             │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘             │   │
│  │                                                                     │   │
│  │  [Ver todas las publicaciones →]                                   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  💬 RESEÑAS (47)                                                    │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ⭐⭐⭐⭐⭐  Ana R. — 2 Mar 2026                            │   │   │
│  │  │  "Excelente vendedor! La carta llegó en perfecto estado y  │   │   │
│  │  │   antes de lo esperado. Totalmente recomendado."            │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ⭐⭐⭐⭐½  Pedro L. — 15 Feb 2026                          │   │   │
│  │  │  "Muy buen trato. El envío fue un poco lento pero la carta  │   │   │
│  │  │   estaba tal como describía. Lo recomiendo."                │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ⭐⭐⭐⭐  María G. — 1 Feb 2026                            │   │   │
│  │  │  "Buenas cartas a buenos precios. Volveré a comprar."       │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  « Ver más reseñas »                                               │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mobile - Perfil del Vendedor

```
┌──────────────────────┐
│ [← Volver]           │
├──────────────────────┤
│                      │
│ ┌──────────────────┐ │
│ │       👤         │ │
│ │     Avatar       │ │
│ └──────────────────┘ │
│                      │
│ Carlos Martínez      │
│ 📍 Ciudad de México  │
│                      │
│ ⭐⭐⭐⭐½ 4.5/5        │
│ (47 reseñas)         │
│                      │
│ ┌─────┬─────┬─────┐ │
│ │ 🏆  │ 📦  │ ⏱️  │ │
│ │ 128 │ 23  │ ~2h │ │
│ │ventas│act.│resp.│ │
│ └─────┴─────┴─────┘ │
│                      │
│ 📅 Miembro desde     │
│ Enero 2024           │
│                      │
│ [💬 Contactar]       │
│                      │
├──────────────────────┤
│ PUBLICACIONES (23)   │
│ ┌────────┐ ┌────────┐│
│ │ Card 1 │ │ Card 2 ││
│ │ $150   │ │ $95    ││
│ └────────┘ └────────┘│
│ ┌────────┐ ┌────────┐│
│ │ Card 3 │ │ Card 4 ││
│ │ $80    │ │ $60    ││
│ └────────┘ └────────┘│
│ [Ver todas →]        │
├──────────────────────┤
│ RESEÑAS (47)         │
│                      │
│ ⭐⭐⭐⭐⭐ Ana R.       │
│ 2 Mar 2026           │
│ "Excelente vendedor! │
│  Totalmente          │
│  recomendado."       │
│                      │
│ ⭐⭐⭐⭐½ Pedro L.      │
│ 15 Feb 2026          │
│ "Muy buen trato..."  │
│                      │
│ « Ver más »          │
└──────────────────────┘
```

### Estado - Vendedor Nuevo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📦 PUBLICACIONES ACTIVAS (3)                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                   │
│  │  Card    │ │  Card    │ │  Card    │                                   │
│  │  Image   │ │  Image   │ │  Image   │                                   │
│  │ Card A   │ │ Card B   │ │ Card C   │                                   │
│  │ $XX.XX   │ │ $XX.XX   │ │ $XX.XX   │                                   │
│  └──────────┘ └──────────┘ └──────────┘                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  💬 RESEÑAS (0)                                                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│                      ┌─────────────────────────────┐                       │
│                      │                             │                       │
│                      │       💬  (icono grande)    │                       │
│                      │                             │                       │
│                      │  Este vendedor aún no tiene │                       │
│                      │  reseñas. ¡Sé el primero   │                       │
│                      │  en comprar y dejar tu      │                       │
│                      │  opinión!                   │                       │
│                      │                             │                       │
│                      └─────────────────────────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /vendedor/:id
- **Componentes:** SellerProfile, SellerStats, SellerPublications, SellerReviews, ContactButton
- **Endpoints:** GET /api/sellers/:id, GET /api/sellers/:id/publications, GET /api/sellers/:id/reviews, POST /api/messages/contact/:sellerId
