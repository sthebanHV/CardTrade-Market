# [US-26] Gestionar Direcciones

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Cantidad máxima de direcciones
- **Valocious**: Facilita el proceso de compra
- **Estimable**: 8 puntos de esfuerzo
- **Pequeño**: Implementación completa pero manejable
- **Testable**: Verificar CRUD de direcciones

---

## Historia de Usuario

**Como** usuario,
**quiero** guardar y gestionar mis direcciones de envío,
**para** no tener que ingresarlas cada vez que compro.

---

## Criterios de Aceptación

1. Guardar múltiples direcciones (máximo 5)
2. Marcar una dirección como predeterminada
3. Editar direcciones existentes
4. Eliminar direcciones con confirmación
5. Seleccionar dirección durante el checkout
6. Validar que la dirección sea completa

---

## Wireframe

```
+----------------------------------------------------------+
|  [Logo]  [Home] [Cartas] [Mi Colección] [≡]              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  MIS DIRECCIONES                                    | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  📍 Casa (Predeterminada)                      |  | |
|  |  |  Calle Principal 123, Col. Centro              |  | |
|  |  |  CDMX, México 06000                            |  | |
|  |  |  Tel: 555-123-4567                             |  | |
|  |  |  [Editar] [Eliminar]                           |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  📍 Trabajo                                    |  | |
|  |  |  Av. Reforma 456, Piso 8                       |  | |
|  |  |  CDMX, México 06000                            |  | |
|  |  |  Tel: 555-987-6543                             |  | |
|  |  |  [Editar] [Eliminar] [Marcar como Predet.]     |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  [+ Agregar Nueva Dirección]                   |  | |
|  |  +-----------------------------------------------+  | |
|  +----------------------------------------------------+ |
|                                                          |
+----------------------------------------------------------+
```

### Formulario de Dirección

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  AGREGAR DIRECCIÓN                                  | |
|  |                                                     | |
|  |  Nombre Completo                                    | |
|  |  +-----------------------------------------------+  | |
|  |  |  Carlos Méndez                                 |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Dirección Línea 1                                  | |
|  |  +-----------------------------------------------+  | |
|  |  |  Calle Principal 123                           |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Dirección Línea 2 (Opcional)                       | |
|  |  +-----------------------------------------------+  | |
|  |  |  Depto 4B                                      |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Ciudad              Estado                         | |
|  |  +--------------+    +------------------------+     | |
|  |  | Ciudad de MX |    | CDMX                 ▼ |     | |
|  |  +--------------+    +------------------------+     | |
|  |                                                     | |
|  |  Código Postal       Teléfono                       | |
|  |  +--------------+    +------------------------+     | |
|  |  |  06000       |    | 555-123-4567           |     | |
|  |  +--------------+    +------------------------+     | |
|  |                                                     | |
|  |  [ ] Usar como dirección predeterminada             | |
|  |                                                     | |
|  |  [Cancelar]              [Guardar Dirección]        | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/settings/addresses`
- **Componentes**: `AddressList`, `AddressForm`, `AddressCard`
- **Endpoints**:
  - `GET /api/addresses` - Obtener direcciones
  - `POST /api/addresses` - Crear dirección
  - `PUT /api/addresses/:id` - Actualizar dirección
  - `DELETE /api/addresses/:id` - Eliminar dirección
  - `PATCH /api/addresses/:id/default` - Establecer predeterminada
