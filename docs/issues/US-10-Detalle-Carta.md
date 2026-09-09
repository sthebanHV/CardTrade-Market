# [US-10] Detalle de Carta

**Epic:** Catálogo de Cartas
**Prioridad:** Alta
**Estimación:** 8 puntos

---

## Descripción

**Como** usuario del catálogo de cartas,
**quiero** ver la información detallada de una carta,
**para** tomar una decisión informada antes de comprar.

---

## Criterios de Aceptación

1. Se muestra la imagen de la carta en alta resolución con funcionalidad de zoom al pasar el cursor o hacer clic.
2. Se muestra la información completa: nombre, tipo, edición, rareza y estado de la carta.
3. El precio se muestra de forma destacada y visible sin necesidad de hacer scroll.
4. Se muestra información del vendedor con enlace directo a su perfil.
5. Se muestra la fecha de publicación de la carta.
6. Se muestra la descripción proporcionada por el vendedor.
7. Existe un botón "Agregar al carrito" que añade la carta al carrito de compras.
8. Existe un botón "Agregar a favoritos" con ícono de corazón que cambia de estado.
9. Existe un botón "Compartir" que permite copiar el enlace o compartir en redes sociales.
10. Se muestra una sección "Cartas similares" con un máximo de 4 recomendaciones basadas en tipo y edición.
11. El diseño es completamente responsive y se adapta a cualquier tamaño de pantalla.
12. Si la carta no existe o fue eliminada, se muestra un mensaje de error con enlace al catálogo.

---

## Wireframe

### Desktop - Detalle de Carta

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver al catálogo]                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────┐   ┌─────────────────────────────────────────┐   │
│  │                       │   │                                         │   │
│  │                       │   │  Charizard                              │   │
│  │                       │   │  ─────────────────────────────────────  │   │
│  │    [Imagen de la      │   │  Tipo: Pokémon                          │   │
│  │     carta en alta     │   │  Edición: Base Set (1999)               │   │
│  │     resolución]       │   │  Rareza: ⭐⭐⭐⭐⭐ Holo Rare             │   │
│  │                       │   │  Estado: NM (Near Mint)                 │   │
│  │    [Hover para zoom]  │   │                                         │   │
│  │                       │   │  ┌─────────────────────────────────┐   │   │
│  │                       │   │  │  $150.00 USD                    │   │   │
│  │                       │   │  └─────────────────────────────────┘   │   │
│  │                       │   │                                         │   │
│  │                       │   │  Publicado por:                         │   │
│  └───────────────────────┘   │  ┌─────┐                              │   │
│                              │  │ 👤  │  Carlos M.                    │   │
│                              │  └─────┘  ⭐⭐⭐⭐½ (128 ventas)        │   │
│                              │           Ver perfil →                  │   │
│                              │                                         │   │
│                              │  📅 Publicado: 15 Mar 2026              │   │
│                              │                                         │   │
│                              │  Descripción del vendedor:              │   │
│                              │  "Carta en excelente estado, sin        │   │
│                              │   rayones visibles. Envío con           │   │
│                              │   sobre burbujas y carta de             │   │
│                              │   protección incluida."                  │   │
│                              │                                         │   │
│                              │  [🛒 Agregar al carrito]               │   │
│                              │  [♡ Favoritos] [🔗 Compartir]          │   │
│                              │                                         │   │
│                              └─────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  CARTAS SIMILARES                                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                      │
│  │  Card    │ │  Card    │ │  Card    │ │  Card    │                      │
│  │  Image   │ │  Image   │ │  Image   │ │  Image   │                      │
│  │ Blastoise│ │ Venusaur  │ │ Mewtwo   │ │ Arcanine  │                      │
│  │ $95.00   │ │ $80.00   │ │ $60.00   │ │ $35.00   │                      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mobile - Detalle de Carta

```
┌──────────────────────┐
│ [← Volver]           │
├──────────────────────┤
│                      │
│ ┌──────────────────┐ │
│ │                  │ │
│ │  [Imagen de la   │ │
│ │   carta en alta  │ │
│ │   resolución]    │ │
│ │                  │ │
│ └──────────────────┘ │
│                      │
│ Charizard            │
│ Pokémon · Base Set   │
│ Rareza: ⭐⭐⭐⭐⭐      │
│ Estado: NM           │
│                      │
│ ┌──────────────────┐ │
│ │  $150.00 USD     │ │
│ └──────────────────┘ │
│                      │
│ 👤 Carlos M.         │
│ ⭐⭐⭐⭐½ (128 ventas)  │
│ Ver perfil →         │
│                      │
│ 📅 15 Mar 2026       │
│                      │
│ Descripción:         │
│ "Carta en excelente  │
│  estado, sin rayones │
│  visibles..."        │
│                      │
│ [🛒 Agregar al       │
│    carrito]          │
│                      │
│ [♡ Favoritos]        │
│ [🔗 Compartir]       │
│                      │
├──────────────────────┤
│ CARTAS SIMILARES     │
│ ┌───────┐ ┌───────┐ │
│ │ Card  │ │ Card  │ │
│ │ $XX.XX│ │ $XX.XX│ │
│ └───────┘ └───────┘ │
│ ┌───────┐ ┌───────┐ │
│ │ Card  │ │ Card  │ │
│ │ $XX.XX│ │ $XX.XX│ │
│ └───────┘ └───────┘ │
└──────────────────────┘
```

### Estado de Error

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver al catálogo]                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                      ┌─────────────────────────────┐                       │
│                      │                             │                       │
│                      │       ⚠️  (icono grande)    │                       │
│                      │                             │                       │
│                      │  Carta no encontrada        │                       │
│                      │                             │                       │
│                      │  La carta que buscas no     │                       │
│                      │  existe o fue eliminada     │                       │
│                      │  del catálogo.              │                       │
│                      │                             │                       │
│                      │  [Volver al catálogo]       │                       │
│                      │                             │                       │
│                      └─────────────────────────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /carta/:id
- **Componentes:** CardDetail, CardImage, CardInfo, SellerCard, SimilarCards, AddToCartButton, FavoriteButton, ShareButton
- **Endpoints:** GET /api/cards/:id, GET /api/cards/:id/similar, POST /api/cart/add, POST /api/favorites/:cardId
