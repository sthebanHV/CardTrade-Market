# [US-16] Valor de Colección

**Epic:** Colección Personal
**Prioridad:** Baja
**Estimación:** 5 puntos

---

## Historia de Usuario

**Como** coleccionista,
**quiero** calcular el valor total estimado de mi colección y ver gráficas de distribución,
**para** conocer el valor de mi inversión y entender la composición de mi colección.

---

## Criterios de Aceptance

- [ ] Valor total estimado de la colección
- [ ] Valor por tipo/juego (gráfico circular)
- [ ] Valor por rareza (gráfico de barras)
- [ ] Carta más valiosa de la colección
- [ ] Promedio de precio por carta
- [ ] Total de cartas por categoría
- [ ] Datos actualizados en tiempo real
- [ ] Gráficas responsivas (mobile/desktop)

---

## Wireframe - Valor de Colección

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  VALOR DE MI COLECCIÓN                               | |
|  +----------------------------------------------------+ |
|  |                                                     | |
|  |  +------------------+  +------------------+         | |
|  |  | 💰 VALOR TOTAL   |  | 📊 TOTAL CARTAS  |         | |
|  |  | $2,340.00        |  | 48               |         | |
|  |  +------------------+  +------------------+         | |
|  |                                                     | |
|  |  +------------------+  +------------------+         | |
|  |  | 🏆 CARTA MÁS     |  | 📈 PROMEDIO      |         | |
|  |  | VALIOSA          |  | POR CARTA        |         | |
|  |  | Black Lotus      |  | $48.75           |         | |
|  |  | $890.00          |  |                  |         | |
|  |  +------------------+  +------------------+         | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  DISTRIBUCIÓN POR TIPO                               | |
|  |                                                     | |
|  |  Pokémon    ████████████████████  65% ($1,521)      | |
|  |  Magic      ████████             20% ($468)         | |
|  |  Yu-Gi-Oh   ████                 10% ($234)         | |
|  |  Otros      ██                    5% ($117)         | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  DISTRIBUCIÓN POR RAREZA                              | |
|  |                                                     | |
|  |  Ultra Rare    ████████████████  $1,200 (12 cartas) | |
|  |  Secret Rare   ██████████        $600 (8 cartas)    | |
|  |  Rare          ████████          $400 (15 cartas)   | |
|  |  Uncommon      ████              $100 (8 cartas)    | |
|  |  Common        ██                $40 (5 cartas)     | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Valor de Colección (Mobile)

```
+---------------------------+
| [≡] MI COLECCIÓN         |
+---------------------------+
|                           |
| 💰 VALOR TOTAL            |
| $2,340.00                 |
|                           |
| 📊 48 cartas              |
| 🏆 Más valiosa: $890.00   |
| 📈 Promedio: $48.75       |
|                           |
+---------------------------+
| DISTRIBUCIÓN POR TIPO     |
|                           |
| Pokémon    ████████ 65%   |
| Magic      ████     20%   |
| Yu-Gi-Oh   ██       10%   |
| Otros      █         5%   |
+---------------------------+
| DISTRIBUCIÓN POR RAREZA   |
|                           |
| Ultra Rare ████████       |
| Secret Rare ██████        |
| Rare       ████           |
| Uncommon   ██             |
| Common     █              |
+---------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/collection/value`
- **Componentes:** `CollectionValue`, `ValueStats`, `DistributionChart`
- **Endpoint:** `GET /api/collection/stats`
- **Gráficas:** Chart.js o Recharts
