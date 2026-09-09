# [US-32] Exportar Colección

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Formatos de exportación
- **Valioso**: Permite respaldar y compartir la colección
- **Estimable**: 3 puntos de esfuerzo
- **Pequeño**: Implementación simple
- **Testable**: Verificar que el archivo se genera correctamente

---

## Historia de Usuario

**Como** coleccionista,
**quiero** exportar mi colección como CSV o PDF,
**para** tener un respaldo o compartirla con otros.

---

## Criterios de Aceptación

1. Botón "Exportar Colección" visible
2. Opciones: CSV, PDF
3. El archivo incluye todas las cartas con sus datos
4. El PDF tiene un diseño presentable
5. Se descarga automáticamente el archivo

---

## Wireframe

### Botón de Exportar

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  MI COLECCIÓN (156 cartas)                          | |
|  |  [📥 Exportar CSV]  [📄 Exportar PDF]               | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

### Vista Previa CSV

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  EXPORTAR COLECCIÓN                                 | |
|  |                                                     | |
|  |  Selecciona formato:                                | |
|  |                                                     | |
|  |  [📊 CSV]  [📄 PDF]                                 | |
|  |                                                     | |
|  |  Vista Previa (primeras 5 filas):                   | |
|  |  ─────────────────────────────────────────────────  | |
|  |  Nombre | Juego | Rareza | Estado | Valor           | |
|  |  ─────────────────────────────────────────────────  | |
|  |  Charizard | Pokémon | Ultra | NM | $120.00        | |
|  |  Pikachu | Pokémon | Secret | LP | $65.00          | |
|  |  Blue-Eyes | Yu-Gi-Oh | Rare | NM | $95.00         | |
|  |                                                     | |
|  |  [Descargar]              [Cancelar]                | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/my-collection`
- **Componentes**: `ExportButton`, `ExportModal`
- **Endpoints**:
  - `GET /api/collection/export?format=csv` - Exportar CSV
  - `GET /api/collection/export?format=pdf` - Exportar PDF
- **Librerías**: `papaparse` para CSV, `jspdf` para PDF
