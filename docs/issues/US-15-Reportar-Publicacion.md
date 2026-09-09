# [US-15] Reportar Publicación

**Epic:** Publicación y Venta
**Prioridad:** Baja
**Estimación:** 3 puntos

---

## Descripción

**Como** usuario de la plataforma,
**quiero** reportar publicaciones fraudulentas o problemáticas,
**para** mantener la seguridad y confiabilidad de la plataforma para todos los usuarios.

---

## Criterios de Aceptación

1. Existe un botón "Reportar" visible en la página de detalle de cada carta.
2. Al hacer clic en "Reportar", se muestra un modal con motivos predefinidos de reporte.
3. Los motivos disponibles son: Fraude, Carta no existe, Precio engañoso, Otro.
4. Si se selecciona "Otro", se habilita un campo de descripción opcional para detalles adicionales.
5. Se muestra un mensaje de confirmación antes de enviar el reporte.
6. Al enviar el reporte, se muestra un mensaje de agradecimiento al usuario.
7. El reporte se notifica al administrador de la plataforma para su revisión.
8. La publicación reportada NO se elimina automáticamente; permanece visible hasta que un admin la revise.
9. Un usuario solo puede reportar una vez la misma publicación.
10. El sistema registra la fecha, hora y usuario que realizó el reporte.
11. El botón "Reportar" se desactiva después de que el usuario haya reportado esa publicación.
12. Los reportes se almacenan con un estado pendiente para revisión administrativa.

---

## Wireframe

### Botón "Reportar" en Detalle de Carta

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Volver al catálogo]                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────┐   ┌─────────────────────────────────────────┐   │
│  │                       │   │                                         │   │
│  │    [Imagen de la      │   │  Charizard                              │   │
│  │     carta]            │   │  Pokémon · Base Set · Holo Rare        │   │
│  │                       │   │                                         │   │
│  │                       │   │  $150.00 USD                           │   │
│  │                       │   │                                         │   │
│  │                       │   │  [🛒 Agregar al carrito]               │   │
│  │                       │   │  [♡ Favoritos] [🔗 Compartir]          │   │
│  │                       │   │                                         │   │
│  └───────────────────────┘   │  ─────────────────────────────────────  │   │
│                              │  [⚠️ Reportar esta publicación]         │   │
│                              │                                         │   │
│                              └─────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Modal de Reporte - Selección de Motivo

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ⚠️  Reportar publicación                                          │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  Selecciona el motivo del reporte:                                  │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ○ 🚫 Fraude                                               │   │   │
│  │  │     El vendedor parece ser un estafador                     │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ○ ❌ Carta no existe                                       │   │   │
│  │  │     La carta no existe o no está en posesión del vendedor   │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ○ 💰 Precio engañoso                                       │   │   │
│  │  │     El precio no corresponde con el valor real de la carta  │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ○ 📝 Otro                                                  │   │   │
│  │  │     Especifica el motivo en el campo de abajo               │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  Descripción adicional (opcional)                                   │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │  (habilitado solo si selecciona "Otro")                     │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌────────────────────────────────┐  ┌──────────────────────────┐  │   │
│  │  │  [Cancelar]                   │  │  [📤 Enviar reporte]      │  │   │
│  │  └────────────────────────────────┘  └──────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Confirmación del Reporte

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │       ✅  (icono de confirmación)                            │   │   │
│  │  │                                                             │   │   │
│  │  │  ¡Reporte enviado con éxito!                                │   │   │
│  │  │                                                             │   │   │
│  │  │  Gracias por ayudarnos a mantener la seguridad de           │   │   │
│  │  │  nuestra plataforma. Un administrador revisará este         │   │   │
│  │  │  reporte pronto.                                            │   │   │
│  │  │                                                             │   │   │
│  │  │  Si tienes más información, puedes contactarnos a           │   │   │
│  │  │  soporte@cardtrade.com                                     │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │                         [Entendido]                                 │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Estado - Ya Reportado

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ⚠️  Reportar publicación                                          │   │
│  │  ─────────────────────────────────────────────────────────────────  │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                                                             │   │   │
│  │  │       ℹ️  (icono informativo)                               │   │   │
│  │  │                                                             │   │   │
│  │  │  Ya has reportado esta publicación.                         │   │   │
│  │  │                                                             │   │   │
│  │  │  Tu reporte está siendo revisado por nuestro equipo.        │   │   │
│  │  │  Te notificaremos si se requiere información adicional.     │   │   │
│  │  │                                                             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │                         [Cerrar]                                    │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Notas Técnicas

- **Ruta:** /carta/:id (con botón de reporte)
- **Componentes:** ReportButton, ReportModal, ReportReasonSelector, ReportConfirmation
- **Endpoints:** POST /api/reports, GET /api/reports/check/:cardId (verificar si ya reportó)
