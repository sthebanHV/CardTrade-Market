# [US-33] Colecciones Temáticas

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Tipos de colección ajustables
- **Valioso**: Permite organizar mejor la colección
- **Estimable**: 4 puntos de esfuerzo
- **Pequeño**: Implementación manejable
- **Testable**: Verificar crear, editar y eliminar colecciones

---

## Historia de Usuario

**Como** coleccionista organizado,
**quiero** crear colecciones temáticas (por juego, rareza, etc.),
**para** organizar mis cartas de forma más específica.

---

## Criterios de Aceptación

1. Crear múltiples colecciones temáticas
2. Nombre y descripción para cada colección
3. Agregar/quitar cartas de cada colección
4. Ver cartas filtradas por colección
5. Eliminar colecciones (sin eliminar las cartas)

---

## Wireframe

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  MIS COLECCIONES TEMÁTICAS                          | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  🎨 Pokémon Vintage (45 cartas)                |  | |
|  |  |  Cartas de la era base y prime series          |  | |
|  |  |  Valor: $1,200.00                              |  | |
|  |  |  [Ver Cartas] [Editar] [Eliminar]              |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  🔥 Magic Raras (23 cartas)                    |  | |
|  |  |  Cartas raras de ediciones limitadas           |  | |
|  |  |  Valor: $850.00                                |  | |
|  |  |  [Ver Cartas] [Editar] [Eliminar]              |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  [+ Crear Nueva Colección]                     |  | |
|  |  +-----------------------------------------------+  | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/my-collections`
- **Componentes**: `CollectionsList`, `CollectionCard`, `CreateCollectionForm`
- **Endpoints**:
  - `GET /api/collections` - Obtener colecciones
  - `POST /api/collections` - Crear colección
  - `PUT /api/collections/:id` - Actualizar colección
  - `DELETE /api/collections/:id` - Eliminar colección
  - `POST /api/collections/:id/cards` - Agregar carta a colección
  - `DELETE /api/collections/:id/cards/:cardId` - Quitar carta
