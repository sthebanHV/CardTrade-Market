# [US-23] Exportar Colección

**Epic:** Colección Personal
**Prioridad:** Baja
**Estimación:** 3 puntos

---

## Descripción

**Como** usuario,
**quiero** exportar mi colección a PDF o CSV,
**para** tener un respaldo de mis datos o compartirla con otros coleccionistas.

---

## Criterios de Aceptación

1. Se muestra un botón "Exportar" en la página de colección (visible tanto en grid como en lista).
2. Al hacer clic en "Exportar", se despliega un dropdown con opciones: "Exportar como PDF" y "Exportar como CSV".
3. El formato PDF incluye: encabezado con logo y nombre de usuario, fecha de exportación, tabla con todas las cartas (imagen reducida, nombre, tipo, edición, rareza, estado, precio, fecha), valor total al pie, y diseño profesional con colores de la marca.
4. El formato CSV incluye columnas: nombre, tipo, edición, rareza, estado, precio_adquisicion, fecha_adquisicion, notas, con encoding UTF-8 para caracteres especiales.
5. Si hay filtros activos, se pregunta al usuario: "¿Exportar toda la colección o solo los elementos filtrados?" con opciones ambas.
6. La descarga se inicia automáticamente después de generar el archivo.
7. Se muestra una barra de progreso durante la generación del archivo.
8. El nombre del archivo sigue el formato: `coleccion_[usuario]_[fecha].[extensión]` (ej: `coleccion_juan_20260909.pdf`).
9. El PDF es responsive y se imprime correctamente en papel tamaño carta.
10. El CSV se puede abrir correctamente en Excel, Google Sheets y LibreOffice.
11. Se muestra mensaje de confirmación: "Archivo generado correctamente. La descarga comenzará en breve."
12. Si la colección está vacía, el botón "Exportar" se desactiva con tooltip "Agrega cartas para poder exportar".

---

## Wireframe

### Desktop - Botón de Exportar

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Colección                                                            |
|                                                                           |
|  Valor Total: $12,450.00 MXN     Total: 47 cartas                       |
|                                                                           |
|  [🔍 Buscar...]  [Exportar ▼]  Grid | Lista    Ordenar: [Reciente ▼]    |
|                                  |                                       |
|                                  +---+                                   |
|                                  | 📄| Exportar como PDF                 |
|                                  | 📊| Exportar como CSV                 |
|                                  +---+                                   |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  FILTROS ACTIVOS: Pokémon, Yu-Gi-Oh!, MTG                           | |
|  |                                                                     | |
|  |  ¿Exportar toda la colección o solo los filtrados?                  | |
|  |                                                                     | |
|  |  [Exportar Toda (47)]    [Solo Filtrados (45)]    [Cancelar]        | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 67%                  | |
|  |                                                                     | |
|  |  Generando archivo PDF...                                           | |
|  |                                                                     | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Opciones de Formato

```
+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  EXPORTAR COLECCIÓN                                                 | |
|  |                                                                     | |
|  |  Selecciona el formato de exportación:                              | |
|  |                                                                     | |
|  |  +---------------------------------------------------------------+ | |
|  |  |  📄  PDF                                                      | | |
|  |  |  Documento profesional con imágenes, diseño de marca          | | |
|  |  |  y valores formateados. Ideal para imprimir.                  | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     | |
|  |  +---------------------------------------------------------------+ | |
|  |  |  📊  CSV                                                      | | |
|  |  |  Datos tabulares para abrir en Excel o Google Sheets.         | | |
|  |  |  Compatible con análisis de datos.                            | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     | |
|  |  [Cancelar]                              [Generar Archivo]          | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Mobile - Botón de Exportar

```
+--------------------------+
|  ≡   Mi Colección       |
+--------------------------+
|                          |
|  Valor: $12,450.00      |
|  Total: 47 cartas        |
|                          |
|  [🔍] [Exportar ▼] [≡]  |
|           |              |
|           +---+          |
|           |📄| PDF       |
|           |📊| CSV       |
|           +---+          |
|                          |
|  [Cartas de colección]   |
|                          |
+--------------------------+
```

### Mobile - Diálogo de Exportación

```
+--------------------------+
|                          |
|  +--------------------+  |
|  | EXPORTAR           |  |
|  |                    |  |
|  | ¿Exportar toda la  |  |
|  | colección o solo   |  |
|  | los filtrados?     |  |
|  |                    |  |
|  | Filtrados: 45 cartas|
|  | Total: 47 cartas   |  |
|  |                    |  |
|  | [Toda (47)]        |  |
|  | [Filtrados (45)]   |  |
|  | [Cancelar]         |  |
|  +--------------------+  |
|                          |
+--------------------------+
```

### Mobile - Formato

```
+--------------------------+
|                          |
|  +--------------------+  |
|  | FORMATO            |  |
|  |                    |  |
|  | +----------------+ |  |
|  | | 📄 PDF         | |  |
|  | | Profesional    | |  |
|  | | con imágenes   | |  |
|  | +----------------+ |  |
|  |                    |  |
|  | +----------------+ |  |
|  | | 📊 CSV         | |  |
|  | | Tabular        | |  |
|  | | para Excel     | |  |
|  | +----------------+ |  |
|  |                    |  |
|  | [Cancelar] [Crear] |  |
|  +--------------------+  |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  📄  EXPORTACIÓN COMPLETADA                                         | |
|  |                                                                     | |
|  |  Tu archivo ha sido generado correctamente.                         | |
|  |                                                                     | |
|  |  Archivo: coleccion_juan_20260909.pdf                               | |
|  |  Tamaño: 2.4 MB | Cartas: 47                                        | |
|  |                                                                     | |
|  |  La descarga comenzará automáticamente.                             | |
|  |                                                                     | |
|  |  [Cerrar]                                                           | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  COLECCIÓN VACÍA                                                 | |
|  |                                                                     | |
|  |  No hay cartas en tu colección para exportar.                       | |
|  |  Agrega al menos una carta antes de intentar exportar.              | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  ERROR AL GENERAR ARCHIVO                                        | |
|  |                                                                     | |
|  |  No pudimos generar el archivo de exportación.                      | |
|  |  Por favor intenta de nuevo.                                        | |
|  |                                                                     | |
|  |  Error: Timeout al procesar imágenes.                               | |
|  |                                                                     | |
|  |  [Reintentar]      [Exportar solo CSV (sin imágenes)]              | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /collection (botón integrado)
- **Componentes:** ExportButton, ExportDropdown, ExportModal, ProgressBar, FormatSelector, CollectionExporter
- **Endpoints:**
  - POST /api/collection/export/pdf - Generar archivo PDF
  - POST /api/collection/export/csv - Generar archivo CSV
  - GET /api/collection/export/status/:jobId - Verificar estado de generación
- **Librerías:** jsPDF o pdfmake para PDF, Papa Parse para CSV
- **Nota:** Las imágenes se comprimen antes de incluirlas en el PDF para reducir tamaño del archivo.
