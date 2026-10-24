# [US-22] Marcar como Vendido

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: No hay elementos negociables
- **Valioso**: Mantiene el catálogo limpio y actualizado
- **Estimable**: 2 puntos de esfuerzo
- **Pequeño**: Implementación muy simple
- **Testable**: Verificar que la carta se marca correctamente

---

## Historia de Usuario

**Como** vendedor,
**quiero** marcar una carta como vendida para que deje de mostrarse en el catálogo,
**para** mantener mis publicaciones actualizadas.

---

## Criterios de Aceptación

1. Botón "Marcar como Vendido" en cada publicación
2. Se pide confirmación antes de marcar
3. La carta desaparece del catálogo público
4. Se mantiene en el historial de ventas del vendedor
5. Se notifica al comprador si hay compra pendiente

---

## Wireframe

### Confirmación

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  ¿Marcar como vendido?                               | |
|  |                                                     | |
|  |  La carta "Charizard ex Full ART" dejará de        | |
|  |  mostrarse en el catálogo público.                  | |
|  |                                                     | |
|  |  [Cancelar]        [Marcar como Vendido]            | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/my-listings`
- **Componentes**: `MarkAsSoldButton`, `ConfirmModal`
- **Endpoints**:
  - `PATCH /api/cards/:id/sold` - Marcar como vendido
- **Notificaciones**: Notificar a usuarios interesados
