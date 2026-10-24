# [US-20] Reportar Publicación

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Motivos de reporte ajustables
- **Valioso**: Mantiene la seguridad y confianza en la plataforma
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar que el reporte se envía correctamente

---

## Historia de Usuario

**Como** usuario,
**quiero** reportar publicaciones sospechosas o fraudulentas,
**para** ayudar a mantener la plataforma segura.

---

## Criterios de Aceptación

1. Botón "Reportar" visible en cada publicación
2. Modal con motivos predefinidos: Fraude, Artículo falso, Precio abusivo, Otro
3. Campo opcional para agregar detalles
4. Confirmación de envío del reporte
5. No se muestra al vendedor quién reportó
6. El equipo de moderación recibe notificación

---

## Wireframe

### Botón de Reporte

```
+----------------------------------------------------------+
|  +------+  Charizard ex Full ART                        |
|  |      |  Pokémon | Ultra Rare | Nuevo (NM)            |
|  | [img]|  $45.00 USD                                   |
|  |      |  [Agregar al Carrito] [♥ Favorito] [⚠ Reportar]|
|  +------+                                               |
+----------------------------------------------------------+
```

### Modal de Reporte

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  ⚠️  REPORTAR PUBLICACIÓN                            | |
|  |                                                     | |
|  |  Selecciona el motivo:                              | |
|  |                                                     | |
|  |  ( ) Artículo fraudulento                           | |
|  |  ( ) Artículo falso o réplica                       | |
|  |  ( ) Precio abusivo o engañoso                      | |
|  |  ( ) Descripción engañosa                           | |
|  |  ( ) Otro                                           | |
|  |                                                     | |
|  |  Detalles adicionales (opcional):                   | |
|  |  +-----------------------------------------------+  | |
|  |  |                                               |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  [Cancelar]              [Enviar Reporte]           | |
|  |                                                     | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/cards/:id`
- **Componentes**: `ReportButton`, `ReportModal`
- **Endpoints**:
  - `POST /api/reports` - Enviar reporte
- **Moderación**: Dashboard para el equipo de moderación
- **Anonimato**: No guardar quién hizo el reporte
