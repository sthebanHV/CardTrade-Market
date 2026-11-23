# Migración PostgreSQL (Render) → MongoDB Atlas

Historial de la migración de datos de producción (noviembre 2026).

## Estado

- **Código**: rama `feat/mongodb` — 20 entidades `@Document`, repos `MongoRepository`,
  fragments para consultas custom (`CardRepositoryCustom`, `MessageRepositoryCustom`,
  `CollectionItemRepositoryCustom`), `data-mongodb` en Gradle, `MONGODB_URI` en
  `application.properties` y `render.yaml`.
- **Datos**: 20/20 colecciones con conteos idénticos al origen (132 documentos
  + 6 tablas hijas re-embebidas: 10 `cardIds`, 4 `items`, 9 `trackingEvents`,
  48 claves de `shippingAddress`).
- **Smoke local**: 26/26 PASS contra la app con Atlas (login admin migrado,
  CRUD cards, colecciones, chat, órdenes con embeddings, admin, market cache).

## Proceso

1. **Export** desde Render Postgres con `psql` (pg_dump/psql 17.x):

   ```powershell
   psql $CONN -At -o "$OUT\<tabla>.jsonl" -c "SELECT row_to_json(t) FROM public.<tabla> t"
   ```

   26 tablas → JSONL (una fila JSON por línea).

2. **Transform + load** con `scripts/migrate-pg-to-mongo.mjs`:

   ```powershell
   $env:MONGODB_URI = '<uri-atlas>'
   $env:MIG_DIR = '<carpeta-jsonl>'
   node scripts/migrate-pg-to-mongo.mjs
   ```

   Reglas de transformación:
   - `snake_case` → `camelCase` (nombres de campos de las entidades).
   - `id` (UUID) → `_id` string; `market_cache.id` (bigint) → `_id` string.
   - Timestamps `without time zone` (UTC en Render) → BSON `Date`.
   - `precio_pagado` (`numeric`) → `Decimal128` (campo `BigDecimal`).
   - `null`s se omiten (Spring los lee como `null` igual).
   - Tablas hijas re-embebidas:
     | Origen | Destino |
     |---|---|
     | `card_imagenes` | `Card.imagenes[]` |
     | `order_cards` | `Order.cardIds[]` |
     | `order_items` | `Order.items[]` |
     | `order_shipping_address` | `Order.shippingAddress{}` |
     | `order_tracking_events` | `Order.trackingEvents[]` |
     | `collection_card_ids` | `Collection.cardIds[]` |

3. **Verificación**: conteo por colección vs JSONL, embeddings de `orders`,
   índices únicos (`users.email`, `users.username`, `market_cache.cacheKey`),
   smoke de 26 checks con la app local.

## Rollback

Render Postgres **no se borró**. Hasta confirmar producción:
la base de datos de Render sigue intacta como respaldo. Una vez verificado
producción sobre Atlas:

1. Borrar `sample_mflix` en Atlas (UI → Browse Collections → Drop).
2. Quitar la IP `181.62.56.184/32` de *PostgreSQL → Inbound IP Rules* en Render.
3. Borrar la base de Render (o dejarla congelada unos días).
