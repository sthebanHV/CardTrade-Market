# [US-19] Gestionar Direcciones de Envío

**Epic:** Proceso de Compra
**Prioridad:** Media
**Estimación:** 8 puntos

---

## Descripción

**Como** usuario,
**quiero** guardar y gestionar mis direcciones de envío,
**para** agilizar el proceso de compra y no tener que ingresar mi dirección cada vez.

---

## Criterios de Aceptación

1. Se muestra una lista de todas las direcciones guardadas del usuario con opción de seleccionar, editar o eliminar cada una.
2. Cada dirección en la lista muestra: nombre del destinatario, dirección completa, ciudad, estado, código postal y teléfono.
3. El formulario para agregar nueva dirección incluye campos: nombre completo, dirección línea 1, dirección línea 2 (opcional), ciudad, estado (select), código postal, teléfono.
4. Todos los campos obligatorios están marcados con asterisco (*) y se validan antes de guardar.
5. El código postal valida que corresponda a una zona de envío cubierta.
6. Se permite un máximo de 5 direcciones guardadas; al alcanzar el límite, el botón "Agregar" se desactiva con mensaje informativo.
7. La opción "Editar" abre el formulario prellenado con los datos actuales de la dirección.
8. La opción "Eliminar" muestra un modal de confirmación: "¿Estás seguro de eliminar esta dirección? Esta acción no se puede deshacer."
9. Se puede marcar una dirección como "Predeterminada"; solo una dirección puede ser predeterminada a la vez.
10. La dirección predeterminada se muestra primero en la lista con una insignia visual.
11. En el checkout (US-17), las direcciones del usuario aparecen como opciones seleccionables, mostrando la predeterminada preseleccionada.
12. Al eliminar la dirección predeterminada, la siguiente dirección en la lista se convierte en predeterminada automáticamente.
13. Los cambios se guardan inmediatamente y se muestra mensaje de confirmación "Dirección guardada correctamente".
14. El formulario incluye un mapa que muestra la ubicación aproximada basada en el código postal ingresado.

---

## Wireframe

### Desktop - Lista de Direcciones

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Cuenta > Direcciones de Envío                                         |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  DIRECCIONES DE ENVÍO                                               | |
|  |                                                                     | |
|  |  Direcciones guardadas: 3 de 5                                      | |
|  |                                                                     | |
|  |  +---------------------------------------------------------------+ | |
|  |  |  ★ PREDETERMINADA                                             | | |
|  |  |                                                               | | |
|  |  |  Juan Pérez                                                   | | |
|  |  |  Av. Revolución 1234, Col. Centro                             | | |
|  |  |  Ciudad de México, CDMX, 06000                                | | |
|  |  |  Tel: 55-1234-5678                                           | | |
|  |  |                                                               | | |
|  |  |  [Editar]  [Eliminar]  [Quitar como predeterminada]           | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  +---------------------------------------------------------------+ | |
|  |  |                                                               | | |
|  |  |  Juan Pérez                                                   | | |
|  |  |  Calle Reforma 567, Col. Juárez                               | | |
|  |  |  Ciudad de México, CDMX, 06600                                | | |
|  |  |  Tel: 55-8765-4321                                           | | |
|  |  |                                                               | | |
|  |  |  [Editar]  [Eliminar]  [Marcar como predeterminada]           | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  +---------------------------------------------------------------+ | |
|  |  |                                                               | | |
|  |  |  María López                                                  | | |
|  |  |  Insurgentes Sur 890, Col. Del Valle                          | | |
|  |  |  Ciudad de México, CDMX, 03100                                | | |
|  |  |  Tel: 55-5555-1234                                           | | |
|  |  |                                                               | | |
|  |  |  [Editar]  [Eliminar]  [Marcar como predeterminada]           | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  [+ Agregar nueva dirección]                                        | |
|  |                                                                     |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Formulario Nueva Dirección

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|  Mi Cuenta > Direcciones > Nueva Dirección                                |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  NUEVA DIRECCIÓN DE ENVÍO                                           | |
|  |                                                                     | |
|  |  Nombre Completo *                                                  | |
|  |  +-----------------------------------------------------------+     | |
|  |  |  Juan Pérez                                                |     | |
|  |  +-----------------------------------------------------------+     | |
|  |                                                                     | |
|  |  Dirección Línea 1 *            Dirección Línea 2 (Opcional)       | |
|  |  +---------------------------+   +---------------------------+     | |
|  |  |  Av. Revolución 1234      |   |  Depto 5B                 |     | |
|  |  +---------------------------+   +---------------------------+     | |
|  |                                                                     | |
|  |  Ciudad *                     Estado *                              | |
|  |  +---------------------------+   +---------------------------+     | |
|  |  |  Ciudad de México         |   |  CDMX               [▼]  |     | |
|  |  +---------------------------+   +---------------------------+     | |
|  |                                                                     | |
|  |  Código Postal *              Teléfono *                            | |
|  |  +---------------------------+   +---------------------------+     | |
|  |  |  06000                    |   |  55-1234-5678            |     | |
|  |  +---------------------------+   +---------------------------+     | |
|  |                                                                     | |
|  |  +---------------------------------------------------------------+ | |
|  |  |  📍 MAPA                                                      | | |
|  |  |                                                               | | |
|  |  |            +-------+                                          | | |
|  |  |            |  📍   |  Av. Revolución 1234                     | | |
|  |  |            +-------+  CDMX, 06000                             | | |
|  |  |                                                               | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     | |
|  |  [ ] Marcar como dirección predeterminada                           | |
|  |                                                                     | |
|  |  [Cancelar]                              [Guardar Dirección]        | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Selección en Checkout

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(3)]            |
+===========================================================================+
|                                                                           |
|  Checkout > Paso 3: Dirección de Envío                                   |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  Selecciona la dirección de envío                                         |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  (●) ★ Casa - Juan Pérez                                           | |
|  |      Av. Revolución 1234, Col. Centro                               | |
|  |      Ciudad de México, CDMX, 06000                                  | |
|  |      Tel: 55-1234-5678                                             | |
|  |                                                                     | |
|  |  ( ) Oficina - Juan Pérez                                           | |
|  |      Calle Reforma 567, Col. Juárez                                 | |
|  |      Ciudad de México, CDMX, 06600                                  | |
|  |      Tel: 55-8765-4321                                             | |
|  |                                                                     | |
|  |  ( ) Casa de María - María López                                   | |
|  |      Insurgentes Sur 890, Col. Del Valle                            | |
|  |      Ciudad de México, CDMX, 03100                                  | |
|  |      Tel: 55-5555-1234                                             | |
|  |                                                                     | |
|  |  [+ Agregar nueva dirección]                                        | |
|  |                                                                     | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  Envío estimado: Estándar (5-7 días) - $15.00                            |
|                                                                           |
|  [Atrás]                                    [Continuar a Confirmar >]    |
|                                                                           |
+===========================================================================+
```

### Mobile - Lista de Direcciones

```
+--------------------------+
|  ←   Mis Direcciones     |
+--------------------------+
|                          |
|  3 de 5 direcciones      |
|                          |
|  +--------------------+  |
|  | ★ PREDETERMINADA   |  |
|  |                    |  |
|  | Juan Pérez         |  |
|  | Av. Revolución     |  |
|  | 1234, Centro       |  |
|  | CDMX, 06000        |  |
|  | 55-1234-5678       |  |
|  |                    |  |
|  | [Editar] [Eliminar]|  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  |                    |  |
|  | Juan Pérez         |  |
|  | Calle Reforma 567  |  |
|  | Juárez, CDMX       |  |
|  | 06600              |  |
|  | 55-8765-4321       |  |
|  |                    |  |
|  | [Editar] [Eliminar]|  |
|  +--------------------+  |
|                          |
|  [+ Nueva Dirección]     |
|                          |
+--------------------------+
```

### Mobile - Formulario

```
+--------------------------+
|  ←   Nueva Dirección     |
+--------------------------+
|                          |
|  Nombre *                |
|  +--------------------+  |
|  | Juan Pérez         |  |
|  +--------------------+  |
|                          |
|  Dirección Línea 1 *    |
|  +--------------------+  |
|  | Av. Revolución     |  |
|  | 1234               |  |
|  +--------------------+  |
|                          |
|  Dirección Línea 2      |
|  +--------------------+  |
|  | Depto 5B           |  |
|  +--------------------+  |
|                          |
|  Ciudad *      Estado *  |
|  +----------+ +--------+|
|  | CDMX     | | CDMX ▼ ||
|  +----------+ +--------+|
|                          |
|  CP *          Teléfono *|
|  +----------+ +--------+|
|  | 06000    | |55-1234||
|  +----------+ +--------+|
|                          |
|  +--------------------+  |
|  |  📍 MAPA           |  |
|  |      📍            |  |
|  +--------------------+  |
|                          |
|  [ ] Predeterminada      |
|                          |
|  [Cancelar]  [Guardar]   |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|                         +--------+                                        |
|                         |  📍    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    No tienes direcciones guardadas                         |
|                                                                           |
|              Agrega una dirección para agilizar tus                       |
|              próximas compras.                                            |
|                                                                           |
|                    [+ Agregar Primera Dirección]                          |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  LÍMITE ALCANZADO                                               | |
|  |                                                                     | |
|  |  Has alcanzado el máximo de 5 direcciones guardadas.                | |
|  |  Para agregar una nueva, elimina una dirección existente.           | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  ⚠  CÓDIGO POSTAL NO VÁLIDO                                        | |
|  |                                                                     | |
|  |  El código postal 99999 no corresponde a una zona de envío          | |
|  |  cubierta por nuestros servicios.                                   | |
|  |                                                                     | |
|  |  Zones cubiertas: CDMX, Estado de México, Puebla, Morelos.          | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /account/addresses
- **Componentes:** AddressList, AddressCard, AddressForm, AddressModal, MapPreview, DeleteConfirmation, CheckoutAddressSelector
- **Endpoints:**
  - GET /api/users/me/addresses - Obtener direcciones del usuario
  - POST /api/users/me/addresses - Crear nueva dirección
  - PUT /api/users/me/addresses/:id - Actualizar dirección
  - DELETE /api/users/me/addresses/:id - Eliminar dirección
  - PUT /api/users/me/addresses/:id/default - Establecer como predeterminada
  - GET /api/shipping/validate-postal/:code - Validar código postal
