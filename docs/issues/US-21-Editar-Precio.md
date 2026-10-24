# [US-21] Editar Precio

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: No hay elementos negociables
- **Valocious**: Permite ajustar precios rápidamente
- **Estimable**: 2 puntos de esfuerzo
- **Pequeño**: Implementación muy simple
- **Testable**: Verificar que el precio se actualiza

---

## Historia de Usuario

**Como** vendedor,
**quiero** cambiar el precio de mi publicación rápidamente,
**para** ajustarme al mercado sin editar toda la publicación.

---

## Criterios de Aceptación

1. Botón de edición rápida de precio en cada publicación
2. Se puede cambiar directamente desde la lista de publicaciones
3. Se muestra el precio anterior y el nuevo
4. Se guarda automáticamente después de 2 segundos
5. Se notifica a los usuarios que tienen la carta en favoritos

---

## Wireframe

```
+----------------------------------------------------------+
|  +------+  Charizard ex Full ART                        |
|  |      |  Pokémon | Ultra Rare | Nuevo (NM)            |
|  | [img]|  [Precio: $45.00] [✏️ Editar Precio]          |
|  |      |                                               |
|  +------+                                               |
+----------------------------------------------------------+

Al hacer clic en Editar Precio:

+----------------------------------------------------------+
|  Precio: $[45.00] → $[38.00]  [✓ Guardar] [✕ Cancelar]  |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/my-listings`
- **Componentes**: `QuickPriceEdit`
- **Endpoints**:
  - `PATCH /api/cards/:id/price` - Actualizar precio
- **UX**: Auto-save con debounce
