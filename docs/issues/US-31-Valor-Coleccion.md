# [US-31] Valor y Estadísticas de Colección

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Métricas mostradas ajustables
- **Valioso**: Proporciona insights sobre la colección
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar de estadísticas
- **Testable**: Verificar cálculos correctos

---

## Historia de Usuario

**Como** coleccionista,
**quiero** ver el valor estimado y estadísticas de mi colección,
**para** entender cuánto vale mi colección y cómo está distribuida.

---

## Criterios de Aceptación

1. Valor total estimado de la colección
2. Distribución por juego (gráfico circular)
3. Distribución por rareza (gráfico de barras)
4. Cartas más valiosas de la colección
5. Valor promedio por carta
6. Fecha de la última carta agregada

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  ESTADÍSTICAS DE MI COLECCIÓN                       | |
|  |                                                     | |
|  |  Valor Total Estimado                               | |
|  |  +-----------------------------------------------+  | |
|  |  |  💰 $2,450.00 USD                             |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-------------------+  +-------------------+       | |
|  |  | DISTRIBUCIÓN     |  | POR RAREZA        |       | |
|  |  | POR JUEGO         |  |                   |       | |
|  |  |                   |  |  Ultra Rara: 45   |       | |
|  |  |  🎨 Pokémon: 120  |  |  Rara: 68         |       | |
|  |  |  🔥 Magic: 36     |  |  Común: 43        |       | |
|  |  |                   |  |                   |       | |
|  |  +-------------------+  +-------------------+       | |
|  |                                                     | |
|  |  TOP 5 CARTAS MÁS VALIOSAS                          | |
|  |  1. Charizard ex Full ART        $120.00            | |
|  |  2. Blue-Eyes White Dragon       $95.00             | |
|  |  3. Black Lotus (Reprint)        $85.00             | |
|  |  4. Pikachu VMAX Rainbow         $65.00             | |
|  |  5. Lugia V Alternate Art         $58.00             | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/my-collection/stats`
- **Componentes**: `CollectionStats`, `ValueChart`, `TopCards`
- **Endpoints**:
  - `GET /api/collection/stats` - Estadísticas de colección
- **Gráficas**: Usar Chart.js o Recharts
- **Valores**: Integrar con API de precios (TCGPlayer, PriceCharting)
