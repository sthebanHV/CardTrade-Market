# [US-14] Agregar Carta a Colección Personal

**Epic:** Colección Personal
**Prioridad:** Media
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** usuario,
**quiero** registrar cartas en mi colección personal con su información y precio de adquisición,
**para** llevar un registro organizado de todas las cartas que poseo.

---

## Criterios de Aceptance

- [ ] Formulario para agregar carta a mi colección
- [ ] Campos: nombre, tipo, edición, rareza, estado, precio de adquisición, fecha, imagen
- [ ] Los campos obligatorios son: nombre, tipo, rareza
- [ ] Puedo subir una foto de la carta (opcional)
- [ ] La fecha de adquisición es opcional (default: hoy)
- [ ] El precio de adquisición es opcional
- [ ] Al agregar, la carta aparece en mi colección
- [ ] Mensaje de confirmación exitoso
- [ ] Puedo agregar cartas desde la página de detalle (botón rápido)

---

## Wireframe - Formulario Agregar a Colección

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  AGREGAR CARTA A MI COLECCIÓN                        | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |  Imagen (opcional)                                  | |
|  |  +-----------------------------+                    | |
|  |  |           [+]               |                    | |
|  |  |      Subir foto             |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Nombre de la Carta *                               | |
|  |  +-----------------------------+                    | |
|  |  | Charizard ex Full Art       |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Tipo / Juego *                                    | |
|  |  +-----------------------------+                    | |
|  |  | Pokémon                  ▼  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Edición                                           | |
|  |  +-----------------------------+                    | |
|  |  | Paldea Evolved            ▼  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Rareza *                                          | |
|  |  +-----------------------------+                    | |
|  |  | Ultra Rare               ▼  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Estado / Condición                                | |
|  |  (●) Nuevo (NM)  ( ) Ligero (LP)  ( ) Moderado     | |
|  |                                                     | |
|  |  Precio de Adquisición (USD)                        | |
|  |  +-----------------------------+                    | |
|  |  | $ 45.00                     |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Fecha de Adquisición                               | |
|  |  +-----------------------------+                    | |
|  |  | 25/01/2024                 📅|                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  +-----------------+  +-----------------+           | |
|  |  |    CANCELAR      |  |  AGREGAR        |           | |
|  |  +-----------------+  +-----------------+           | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Botón Rápido desde Detalle de Carta

```
+----------------------------------------------------+
|  CHARIZARD EX FULL ART                             |
|  Tipo: Pokémon | Ultra Rare | Nuevo (NM)          |
|  $45.00 USD                                       |
|                                                    |
|  +-----------------------------------------------+ |
|  |  🛒 AGREGAR AL CARRITO                        | |
|  +-----------------------------------------------+ |
|  +-----------------------------------------------+ |
|  |  📥 AGREGAR A MI COLECCIÓN                    | |
|  +-----------------------------------------------+ |
|  +-----------------------------------------------+ |
|  |  ♡ FAVORITO                                    | |
|  +-----------------------------------------------+ |
+----------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/collection/add`
- **Componentes:** `AddToCollectionForm`, `QuickAddButton`
- **Endpoints:**
  - `POST /api/collection` - Agregar carta
  - `POST /api/collection/from-listing/:id` - Agregar desde publicación
