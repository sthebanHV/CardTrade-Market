# [US-04] Página Principal (Home)

**Epic:** Catálogo de Cartas
**Prioridad:** Alta
**Estimación:** 8 puntos

---

## Historia de Usuario

**Como** visitante o usuario,
**quiero** acceder a una página principal que muestre cartas destacadas y me permita navegar fácilmente,
**para** descubrir cartas interesantes y encontrar lo que busco rápidamente.

---

## Criterios de Aceptance

- [ ] Se muestra barra de búsqueda principal con autocompletado
- [ ] Se muestran categorías/tipos de cartas (Pokémon, Magic, Yu-Gi-Oh, etc.)
- [ ] Sección de "Cartas Destacadas" con grid de 6-8 cartas
- [ ] Sección de "Últimas Publicaciones" con cartas recientes
- [ ] Las cartas se muestran con: imagen, nombre, precio, rareza
- [ ] Al hacer clic en una carta, se va al detalle
- [ ] La página carga en menos de 3 segundos
- [ ] Lazy loading de imágenes
- [ ] Diseño responsive (mobile-first)
- [ ] Header fijo con navegación
- [ ] Footer con links útiles

---

## Wireframe - Home Desktop

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market    [🔍 Buscar cartas...]  [≡]  |
|                                                          |
|  [Home] [Pokémon] [Magic] [Yu-Gi-Oh] [Dragon Ball] [+]  |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |           ★★★★★ CARTAS DESTACADAS ★★★★★            | |
|  |                                                     | |
|  |  +----------+  +----------+  +----------+         | |
|  |  |  [Img]   |  |  [Img]   |  |  [Img]   |         | |
|  |  |          |  |          |  |          |         | |
|  |  | Charizar |  | Blue-Eyes|  | Black    |         | |
|  |  | ex       |  | White    |  | Lotus    |         | |
|  |  | ★★★★     |  | Dragon   |  | ★★★★★    |         | |
|  |  | $45.00   |  | $120.00  |  | $890.00  |         | |
|  |  +----------+  +----------+  +----------+         | |
|  |                                                     | |
|  |  +----------+  +----------+  +----------+         | |
|  |  |  [Img]   |  |  [Img]   |  |  [Img]   |         | |
|  |  | Pikachu  |  | Goku SSJ |  | Dark     |         | |
|  |  | Full Art |  | ★★★★     |  | Magician |         | |
|  |  | $28.00   |  | $67.00   |  | $15.00   |         | |
|  |  +----------+  +----------+  +----------+         | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |           📦 ÚLTIMAS PUBLICACIONES                  | |
|  |                                                     | |
|  |  +----------+  +----------+  +----------+         | |
|  |  |  [Img]   |  |  [Img]   |  |  [Img]   |         | |
|  |  | Mega     |  | Vegeta   |  | Exodia   |         | |
|  |  | Rayquaza |  | Ultra    |  | Part     |         | |
|  |  | $55.00   |  | $34.00   |  | $200.00  |         | |
|  |  +----------+  +----------+  +----------+         | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
|  Footer: © 2024 CardTrade Market | About | Contact       |
+----------------------------------------------------------+
```

---

## Wireframe - Home Mobile

```
+---------------------------+
| [≡] CardTrade   [🔍][👤] |
+---------------------------+
| Pokémon | Magic | YuGiOh  |
| Dragon Ball | One Piece   |
+---------------------------+
|                           |
| ★ CARTAS DESTACADAS ★     |
|                           |
| +---------+ +---------+  |
| |  [Img]  | |  [Img]  |  |
| |Charizar | | Blue-   |  |
| |ex       | | Eyes    |  |
| |$45.00   | |$120.00  |  |
| +---------+ +---------+  |
|                           |
| +---------+ +---------+  |
| |  [Img]  | |  [Img]  |  |
| |Pikachu  | | Black   |  |
| |Full Art | | Lotus   |  |
| |$28.00   | |$890.00  |  |
| +---------+ +---------+  |
|                           |
| [Ver todas →]             |
+---------------------------+
| 📦 ÚLTIMAS PUBLICACIONES  |
|                           |
| +---------+ +---------+  |
| |  [Img]  | |  [Img]  |  |
| |Mega     | | Vegeta  |  |
| |Rayquaza | | Ultra   |  |
| |$55.00   | |$34.00   |  |
| +---------+ +---------+  |
+---------------------------+
| Home | Cartas | [+] | 🛒 |
+---------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/`
- **Componentes:** `HomePage`, `SearchBar`, `CategoryNav`, `CardGrid`, `CardItem`
- **Endpoint:** `GET /api/cards/featured`, `GET /api/cards/recent`
- **Optimización:** Lazy loading imágenes, skeleton loading states
