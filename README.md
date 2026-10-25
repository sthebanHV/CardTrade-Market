# CardTrade Market

[![CI](https://github.com/sthebanHV/CardTrade-Market/actions/workflows/ci.yml/badge.svg)](https://github.com/sthebanHV/CardTrade-Market/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/sthebanHV/CardTrade-Market)](https://github.com/sthebanHV/CardTrade-Market/releases)

Plataforma web completa para la compra y venta de cartas coleccionables: catálogo con búsqueda y filtros, publicaciones, carrito y checkout, colección personal, reseñas, chat, alertas de precio, dashboard y panel de administración.

**Producción**

| | URL |
|---|---|
| Frontend (Vercel) | https://cardtrade-market.vercel.app |
| API (Render) | https://cardtrademarket-backend.onrender.com |
| Admin local (dev) | `admin` / `Test1234!` |
| Admin producción | `admin` / `AdminCTM2026!` |

**Estado:** 47/47 historias de usuario implementadas, verificadas con smokes locales y de producción (91/91 PASS), desplegadas. Ver [Estado de implementación](#estado-de-implementación).

## Descripción

CardTrade Market permite a los coleccionistas buscar, comparar, comprar y vender cartas de distintos juegos (Magic, Pokémon, Yu-Gi-Oh!, Lorcana…). Cada carta muestra edición, rareza, idioma, condición, idioma y precio de mercado; los usuarios pueden publicar sus propias cartas, gestionar su colección y valoración, seguir a vendedores, recibir alertas de precio y consultar su historial de transacciones.

## Funcionalidades

- **Autenticación** — registro, login (usuario o email), recuperación/cambio de contraseña, verificación de email, 2FA con códigos TOTP, JWT de 7 días, cuenta suspendida bloqueada en login
- **Catálogo** — home con destacados/ofertas, búsqueda instantánea, filtros avanzados (juego, rareza, condición, precio, idioma), comparar hasta 3 cartas, catálogo por juego, ficha pública de vendedor
- **Publicar y vender** — crear/editar publicación con fotos (compresión cliente), pausar, editar precio, marcar vendido, mis publicaciones
- **Comprar** — carrito con persistencia (Zustand, TTL 7 días), checkout con direcciones y métodos de pago (tarjetas guardadas solo con brand/last4/expiry, nunca CVV), compra como invitado, confirmación de orden, tracking de envío
- **Colección** — agregar/quitar cartas, mi colección con estadísticas y valor de mercado, exportar CSV, colecciones temáticas (públicas/privadas)
- **Historiales** — compras, ventas y valoraciones con detalle de orden y reseñas (1 por compra, solo tras entrega)
- **Social** — favoritos y lista de deseos con backend, seguir/viendo vendedores, alertas de precio, chat en tiempo real (polling 5 s), compartir en redes sociales, reportar publicaciones
- **Panel de usuario** — dashboard con métricas, actividad reciente y perspectivas; centro de notificaciones con badge de no leídas (polling 60 s)
- **Precios de mercado** — página `/market` con búsqueda de cartas reales (imagen + precio USD) de Magic, Pokémon y Yu-Gi-Oh!; autocompletado al publicar con foto, edición y rareza prellenadas + botón "usar precio de mercado"; badge de precio de mercado vs. tu precio en la ficha de la carta; caché 24 h, circuit breaker y degradación elegante cuando una fuente cae
- **Administración** — usuarios (buscar, cambiar rol/estado sin auto-modificación), reportes (resolver → ocultar carta / suspender vendedor), estadísticas (serie 30 días, top juegos/vendedores) y auditoría inmutable

### Precios de mercado — fuentes y atribución

Los datos de precios e imágenes provienen de APIs públicas de terceros y se muestran con fines informativos (no comerciales), sin paywall ni alteración de las imágenes:

| Juego | Fuente | Notas |
|-------|--------|-------|
| Magic: The Gathering | [Scryfall](https://scryfall.com) — API | Uso sujeto a la [Scryfall Fan Content Policy](https://scryfall.com/docs/fan-content-policy); atribución visible en `/market` y fichas de detalle |
| Yu-Gi-Oh! | [YGOPRODeck](https://ygoprodeck.com/api/) — API | Cortesía de YGOPRODeck; precios TCGPlayer/Cardmarket/eBay/Amazon |
| Pokémon | [Pokémon TCG API](https://pokemontcg.io) (fallback [TCGdex](https://api.tcgdex.dev)) | Fuente sujeta a cambios de disponibilidad; el juego se degrada con aviso `unavailable` si todas las fuentes fallan |

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 18 + Vite, MUI (Material UI), Zustand, React Router v6 |
| Backend | Spring Boot 3.2 (Java 17), Spring Security, Spring Data JPA |
| Base de datos | PostgreSQL |
| Autenticación | JWT (jjwt) + TOTP 2FA |
| Precios de mercado | Scryfall (MTG), YGOPRODeck (Yu-Gi-Oh!), Pokémon TCG API + TCGdex (fallback) |
| Despliegue | Vercel (frontend), Render (API + Postgres), Docker |
| Calidad | Smoke scripts PowerShell (end-to-end local y producción) |

## Estructura del Proyecto

Monorepo con frontend y backend en la raíz:

```
CardTrade-Market/
├── src/
│   ├── main/java/com/cardtrademarket/   # Backend Spring Boot
│   │   ├── config/                      # SecurityConfig, CORS, SchemaFixup
│   │   ├── controller/                  # REST: auth, cards, orders, chat, admin…
│   │   ├── model/                       # JPA: User, Card, Order, Review, Report…
│   │   ├── repository/                  # Spring Data JPA
│   │   ├── security/                    # JWT filter, utilidades
│   │   └── service/                     # Lógica de negocio
│   ├── main/resources/application.properties
│   ├── api/apiClient.js                 # Cliente REST (fetch + token)
│   ├── components/                      # Vistas React por dominio
│   │   ├── auth/ dashboard/ cards/ checkout/ purchases/ sales/
│   │   ├── collection/ favorites/ wishlist/ chat/ admin/ ...
│   ├── store.jsx                        # Estado global (Zustand)
│   ├── router.jsx                       # Rutas + guardas de rol
│   └── theme.js                         # Design tokens (MUI)
├── docs/
│   ├── REQUIREMENTS.md                  # Requerimientos + 47 HU
│   ├── issues/US-01…US-47-*.md          # Historias de usuario
│   └── mockups/
├── build.gradle                         # Backend (Spring Boot 3.2.2)
├── package.json                         # Frontend (Vite)
├── Dockerfile / render.yaml             # Despliegue backend
└── vercel.json                          # SPA rewrites en Vercel
```

## Arranque Local

### Prerrequisitos

- Java 17+, Node.js 18+, PostgreSQL 15+ (o el cluster local del proyecto)

### Backend

```bash
# La app espera Postgres en SPRING_DATASOURCE_URL (default jdbc:postgresql://localhost:5432/cardtrade)
# Variables opcionales: SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD, JWT_SECRET, PORT

gradle bootRun            # o: gradle bootJar && java -jar build/libs/*.jar
```

En desarrollo local se usa un cluster Postgres en el puerto **5433** y se arranca con el script `run-ctm2.ps1` (datasource, admin local y log en `%TEMP%\ctm-pg3.log`).

### Frontend

```bash
npm install
npm run dev               # http://localhost:5173
npm run build             # build de producción en dist/
```

Configuración en `.env.example`:

```
VITE_API_URL=https://cardtrademarket-backend.onrender.com/api   # o http://localhost:8080/api
VITE_APP_NAME=CardTrade-Market
```

### Pruebas / smokes

```powershell
# Con backend corriendo en localhost:8080:
powershell -File smoke-fase7.ps1     # 91 checks end-to-end (usuario admin: admin/Test1234!)
```

Los mismos scripts se ejecutan contra producción cambiando `$base` a la URL de Render y el admin a `AdminCTM2026!`.

## Roles de Usuario

Los roles tienen **dos capas** (ver [US-46](docs/issues/US-46-Sistema-Roles-Perspectivas.md)):

**Capa 1 — Autorización** (campo `role` en BD, `users.role`):

| Rol | Descripción |
|-----|-------------|
| **Visitante** (sin sesión) | Navega el catálogo, busca, ve detalle de cartas y perfiles públicos de vendedores |
| **`ROLE_USER`** (registrado) | Todo lo del visitante + comprar, publicar, colección, favoritos, alertas, reseñas, chat, dashboard |
| **`ROLE_ADMIN`** | Todo lo del usuario + panel de administración ([US-47](docs/issues/US-47-Panel-Administracion.md)) |

**Capa 2 — Perspectivas** (derivadas de la actividad, **no excluyentes** — todo usuario registrado las tiene a la vez):

| Perspectiva | Secciones | Se activa cuando |
|-------------|-----------|------------------|
| **Comprador** | Carrito, mis compras, direcciones, tracking | Siempre (registrado) |
| **Vendedor** | Publicar, mis publicaciones, mis ventas, perfil con rating | Al completar ventas se muestra el distintivo "Vendedor verificado" |
| **Coleccionista** | Mi colección, valor/estadísticas, favoritos, alertas, lista de deseos | Al tener cartas en la colección |

## Estado de implementación

| Fase | Alcance | HU | Estado |
|------|---------|----|--------|
| 0 | Issues, documentación, requerimientos | — | ✅ |
| 1 | Roles, JWT, seguridad, esqueleto | HU_01–09 | ✅ |
| 2–3 | Catálogo, búsqueda, filtros, detalle, comparar, ofertas | HU_10–16 | ✅ |
| 4 | Publicar, mis publicaciones, perfil vendedor, reportar, precio, vendido | HU_17–22 | ✅ |
| 5 | Carrito, checkout, confirmación, direcciones, métodos de pago, invitado | HU_23–28 | ✅ |
| 6 | Colección, export, colecciones temáticas, historiales, seguir, alertas, tracking | HU_29–38 | ✅ |
| 7 | Reseñas, chat, favoritos, wishlist, compartir, dashboard, notificaciones, roles/perspectivas, admin | HU_39–47 | ✅ |

**Supuestos acordados:** pago simulado (órdenes pasan a `PAID` directo), OAuth social como botones "configurar", email sin SMTP (log simulado), chat con polling (5 s) en lugar de WebSocket, imágenes como dataURL comprimida ≤1600 px.

**Conocidas y no bloqueantes:** Open Graph tags por carta requieren SSR; preferencias de email/push son simuladas.

## Documentación

- [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) — requerimientos funcionales/no funcionales, modelos de datos y las 47 historias de usuario
- [docs/issues/](docs/issues/) — historias de usuario US-01 … US-47 con criterios de aceptación
- [docs/mockups/](docs/mockups/) — mockups de referencia (diseño "inspirado pero moderno")

## Licencia

MIT
