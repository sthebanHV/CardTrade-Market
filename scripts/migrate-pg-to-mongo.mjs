// Migración Postgres (Render) → MongoDB Atlas — CardTrade-Market
// Lee los JSONL exportados con psql (ver docs/migracion-mongo.md) y los
// transforma a documentos Mongo: snake_case → camelCase, timestamps → Date,
// id → _id, y re-embebe las 6 tablas hijas en sus padres.
// Uso: MONGODB_URI=... MIG_DIR=/ruta/jsonl node scripts/migrate-pg-to-mongo.mjs
import { MongoClient, Decimal128 } from 'mongodb';
import { readFileSync } from 'fs';

const MIG = process.env.MIG_DIR || 'C:/Users/ACER/AppData/Local/Temp/mig';
const URI = process.env.MONGODB_URI;
if (!URI) { console.error('Falta MONGODB_URI'); process.exit(1); }

// --- utilidades ------------------------------------------------------------
const DATE_FIELDS = new Set([
  'created_at', 'updated_at', 'fecha', 'fecha_creacion', 'fecha_actualizacion',
  'fecha_publicacion', 'oferta_expira', 'fecha_ultimo_cambio_password',
  'reset_token_expiry', 'verify_token_expiry', 'locked_until',
  'last_message_at', 'fecha_resolucion',
]);
const toCamel = (s) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
// timestamps "sin zona" de Postgres se interpretan como UTC (Render corre en UTC)
const toDate = (v) => new Date(String(v).replace(/(\.\d{3})\d+/, '$1') + 'Z');

function readJsonl(file) {
  const raw = readFileSync(`${MIG}/${file}`, 'utf8');
  return raw.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => JSON.parse(l));
}

function baseDoc(row) {
  const doc = {};
  for (const [k, v] of Object.entries(row)) {
    if (v === null || v === undefined) continue; // omitir nulls (Spring los lee como null)
    let val = v;
    if (DATE_FIELDS.has(k)) val = toDate(v);
    if (k === 'precio_pagado') val = Decimal128.fromString(String(v));
    doc[toCamel(k)] = val;
  }
  if ('id' in doc) { doc._id = String(doc.id); delete doc.id; } // UUID → _id string
  return doc;
}

const groupBy = (rows, key) => {
  const m = new Map();
  for (const r of rows) {
    const k = r[key];
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(r);
  }
  return m;
};

// --- tablas hijas a re-embeber --------------------------------------------
const orderCards  = groupBy(readJsonl('order_cards.jsonl'), 'order_id');
const orderItems  = groupBy(readJsonl('order_items.jsonl'), 'order_id');
const orderShip   = groupBy(readJsonl('order_shipping_address.jsonl'), 'order_id');
const orderTrack  = groupBy(readJsonl('order_tracking_events.jsonl'), 'order_id');
const cardImgs    = groupBy(readJsonl('card_imagenes.jsonl'), 'card_id');
const collCards   = groupBy(readJsonl('collection_card_ids.jsonl'), 'collection_id');

// --- colecciones destino (tabla → colección) -------------------------------
const parents = [
  'addresses', 'alerts', 'audit_logs', 'cards', 'collection_items',
  'collections', 'conversations', 'favourites', 'follows', 'market_cache',
  'messages', 'notifications', 'orders', 'payment_methods', 'price_alerts',
  'profile_changes', 'reports', 'reviews', 'users', 'wishlists',
];

function buildDocs(table) {
  const docs = readJsonl(`${table}.jsonl`).map(baseDoc);
  if (table === 'orders') {
    for (const d of docs) {
      const id = d._id;
      if (orderCards.has(id)) d.cardIds = orderCards.get(id).map((r) => r.card_id);
      if (orderItems.has(id)) d.items = orderItems.get(id).map((r) => ({
        cardId: r.card_id, nombre: r.nombre,
        precioUnitario: r.precio_unitario, vendedorId: r.vendedor_id,
      }));
      if (orderShip.has(id)) {
        d.shippingAddress = Object.fromEntries(orderShip.get(id).map((r) => [r.addr_key, r.addr_value]));
      }
      if (orderTrack.has(id)) d.trackingEvents = orderTrack.get(id).map((r) => ({
        fecha: toDate(r.fecha), descripcion: r.descripcion, status: r.status,
      }));
    }
  }
  if (table === 'cards') {
    for (const d of docs) {
      if (cardImgs.has(d._id)) d.imagenes = cardImgs.get(d._id).map((r) => r.imagen);
    }
  }
  if (table === 'collections') {
    for (const d of docs) {
      if (collCards.has(d._id)) d.cardIds = collCards.get(d._id).map((r) => r.card_id);
    }
  }
  return docs;
}

// --- carga -----------------------------------------------------------------
const client = new MongoClient(URI);
try {
  await client.connect();
  const db = client.db('cardtrade');
  let total = 0;
  const report = [];
  for (const table of parents) {
    const docs = buildDocs(table);
    const col = db.collection(table);
    await col.deleteMany({}); // limpia datos de smoke
    if (docs.length) await col.insertMany(docs, { ordered: false });
    const n = await col.countDocuments();
    report.push(`${table.padEnd(20)} ${String(docs.length).padStart(3)} → ${n}`);
    total += n;
  }
  console.log(report.join('\n'));
  console.log(`TOTAL documentos: ${total}`);

  // verificaciones de embeddings
  const o = await db.collection('orders').findOne({});
  console.log('\nspot-check order:', JSON.stringify({
    _id: o._id, cardIds: o.cardIds, items: o.items?.length,
    shipKeys: o.shippingAddress && Object.keys(o.shippingAddress).length,
    events: o.trackingEvents?.length,
  }));
  const admin = await db.collection('users').findOne({ email: 'admin@cardtrade.market' });
  console.log('admin migrado:', admin ? `${admin.username} / ${admin.role} / status=${admin.status}` : 'NO ENCONTRADO');

  // sample_mflix (dataset de ejemplo) — mejor borrarlo desde aquí si hay permisos
  try { await client.db('sample_mflix').dropDatabase(); console.log('sample_mflix: eliminado'); }
  catch (e) { console.log('sample_mflix: no se pudo borrar desde el script (' + e.message + ') — borrarlo manual en Atlas'); }
} finally {
  await client.close();
}
