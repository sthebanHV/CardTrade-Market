# [US-22] Valor y Estadísticas de Colección

**Epic:** Colección Personal
**Prioridad:** Baja
**Estimación:** 5 puntos

---

## Descripción

**Como** coleccionista,
**quiero** calcular el valor total de mi colección y ver gráficas de distribución,
**para** conocer el valor de mi inversión y entender la composición de mi colección.

---

## Criterios de Aceptación

1. Se muestra el valor total estimado de la colección calculado a partir de los precios de adquisición de todas las cartas.
2. Se presenta un gráfico circular (pie chart) que muestra la distribución del valor por tipo de juego (Pokémon, Yu-Gi-Oh!, MTG, Otro).
3. Se presenta un gráfico de barras que muestra la distribución del valor por rareza (Común, Rara, Ultra Rara, Secreta, Mythic).
4. Se muestra la carta más valiosa de la colección con imagen, nombre y precio.
5. Se calcula y muestra el precio promedio por carta de la colección.
6. Se muestra el total de cartas por cada categoría (tipo y rareza).
7. Los datos se actualizan en tiempo real cuando se agregan, editan o eliminan cartas.
8. Las gráficas son responsivas y se adaptan a diferentes tamaños de pantalla.
9. En desktop, las gráficas se muestran lado a lado; en mobile, se apilan verticalmente.
10. Se incluye un desglose tabular debajo de las gráficas con los datos exactos.
11. Las gráficas incluyen tooltips al pasar el cursor mostrando valores exactos.
12. Se muestra la fecha de última actualización de los valores.
13. Opción de filtrar estadísticas por tipo de juego o rango de fechas.

---

## Wireframe

### Desktop - Valor de Colección

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Colección > Valor y Estadísticas                                     |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  VALOR TOTAL DE TU COLECCIÓN                                        | |
|  |                                                                     | |
|  |              $12,450.00 MXN                                        | |
|  |              Última actualización: 09/09/2026 10:30                 | |
|  |                                                                     | |
|  |  Total cartas: 47  |  Promedio por carta: $264.89                  | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +------------------------------+  +----------------------------------+ |
|  |  DISTRIBUCIÓN POR TIPO       |  |  DISTRIBUCIÓN POR RAREZA         | |
|  |  (Gráfico Circular)          |  |  (Gráfico de Barras)             | |
|  |                              |  |                                  | |
|  |         +-------+            |  |  Común      ████████  $1,200    | |
|  |        /   Pokémon\          |  |  Rara       ██████████████ $4,800| |
|  |       /  45%  $5,600\        |  |  Ultra Rara ████████████████    | |
|  |      |   +-------+  |       |  |              $5,400              | |
|  |      |  /MTG    \   |       |  |  Secreta    ████  $650           | |
|  |      | | 30%    |   |       |  |  Mythic     ██████  $400         | |
|  |      | |$3,735  |   |       |  |                                  | |
|  |       \Yu-Gi  /    |       |  +----------------------------------+ |
|  |        \25%  /      |       |                                      |
|  |         +---+       |       |                                      |
|  |  Pokémon  | $3,112  |       |                                      |
|  |  MTG      | $3,735  |       |                                      |
|  |  Yu-Gi-Oh | $3,112  |       |                                      |
|  |  Otro     | $0      |       |                                      |
|  +------------------------------+                                      |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  CARTA MÁS VALIOSA                                                  | |
|  |                                                                     | |
|  |  +--------+  Black Lotus (Alpha) - MTG                             | |
|  |  |  IMG   |  Estado: GD  |  Rareza: Mythic                        | |
|  |  +--------+  Valor: $1,200.00 MXN                                  | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  DESGLOSE POR CATEGORÍA                                             | |
|  |                                                                     | |
|  |  TIPO           CANTIDAD    VALOR         PROMEDIO                  | |
|  |  ─────────────────────────────────────────────────                  | |
|  |  Pokémon        21          $5,600.00     $266.67                   | |
|  |  MTG            14          $3,735.00     $266.79                   | |
|  |  Yu-Gi-Oh!      10          $3,112.00     $311.20                   | |
|  |  Otro           2           $3.00         $1.50                     | |
|  |  ─────────────────────────────────────────────────                  | |
|  |  TOTAL          47          $12,450.00    $264.89                   | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Mobile - Valor de Colección

```
+--------------------------+
|  ←   Valor Colección     |
+--------------------------+
|                          |
|  VALOR TOTAL             |
|                          |
|  $12,450.00 MXN         |
|                          |
|  Actualizado: 09/09/2026 |
|                          |
|  47 cartas | $264.89/prom|
|                          |
+--------------------------+
|                          |
|  POR TIPO (Circular)     |
|                          |
|        +-------+         |
|       / Pokémon\         |
|      /  45%    \        |
|     | $5,600   |        |
|      \ MTG   /          |
|       \30%  /           |
|        +---+            |
|                          |
|  Pokémon    $5,600      |
|  MTG        $3,735      |
|  Yu-Gi-Oh   $3,112      |
|  Otro       $3          |
|                          |
+--------------------------+
|                          |
|  POR RAREZA (Barras)     |
|                          |
|  Común  ████████ $1,200 |
|  Rara   ██████████████  |
|         $4,800          |
|  Ultra  ██████████████  |
|  Rara   $5,400          |
|  Secreta████ $650       |
|  Mythic ██████ $400     |
|                          |
+--------------------------+
|                          |
|  CARTA MÁS VALIOSA       |
|                          |
|  +------+ Black Lotus   |
|  | IMG  | Alpha | MTG   |
|  +------+ GD | $1,200   |
|                          |
+--------------------------+
|                          |
|  DESGLOSE               |
|                          |
|  Tipo     Cant  Valor   |
|  ─────────────────────  |
|  Pokémon  21   $5,600  |
|  MTG      14   $3,735  |
|  Yu-Gi-Oh 10   $3,112  |
|  Otro      2   $3      |
|  ─────────────────────  |
|  TOTAL    47   $12,450 |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|                         +--------+                                        |
|                         |  📊    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    No hay datos suficientes                               |
|                                                                           |
|          Agrega al menos una carta a tu colección                         |
|          para ver las estadísticas y el valor.                            |
|                                                                           |
|                    [+ Agregar Carta]                                      |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  DATOS PARCIALES                                                 | |
|  |                                                                     | |
|  |  Algunas cartas no tienen precio de adquisición registrado.         | |
|  |  El valor total puede no ser representativo.                        | |
|  |                                                                     | |
|  |  Cartas sin precio: 5 de 47                                         | |
|  |                                                                     | |
|  |  [Ver cartas sin precio]                                            | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /collection/stats
- **Componentes:** CollectionValueCard, PieChart, BarChart, MostValuableCard, CategoryBreakdown, StatsFilters, Tooltip
- **Endpoints:**
  - GET /api/collection/stats - Obtener estadísticas generales
  - GET /api/collection/stats/by-type - Distribución por tipo de juego
  - GET /api/collection/stats/by-rarity - Distribución por rareza
  - GET /api/collection/stats/most-valuable - Carta más valiosa
  - GET /api/collection/stats/summary - Resumen de valores
- **Librerías:** Chart.js o Recharts para gráficas
