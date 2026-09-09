# [US-17] Checkout y Proceso de Pago

**Epic:** Proceso de Compra
**Prioridad:** Alta
**Estimación:** 13 puntos

---

## Descripción

**Como** comprador,
**quiero** completar el proceso de pago de forma segura con diferentes métodos de pago,
**para** adquirir las cartas seleccionadas de manera confiable y protegida.

---

## Criterios de Aceptación

1. El proceso de checkout se presenta como un wizard de 4 pasos con indicador de progreso visual en la parte superior.
2. **Paso 1 - Revisar Artículos:** Se muestran todos los artículos del carrito con imagen, nombre, cantidad, precio unitario y subtotal. El usuario puede modificar cantidades o eliminar artículos antes de continuar. Se muestra el total general con impuestos desglosados.
3. **Paso 2 - Seleccionar Método de Pago:** El usuario puede elegir entre Tarjeta de Crédito/Débito o PayPal. Al seleccionar tarjeta, se despliega un formulario con campos: número de tarjeta (con formato automático XXXX-XXXX-XXXX-XXXX), fecha de expiración (MM/AA), CVV (3-4 dígitos), y nombre en la tarjeta. Todos los campos tienen validación en tiempo real. El formulario de tarjeta cumple con estándares PCI-DSS.
4. **Paso 3 - Dirección de Envío:** El usuario selecciona una dirección guardada o ingresa una nueva. Se muestra un resumen de la dirección seleccionada con opción de editar. Se calcula y muestra el costo de envío estimado.
5. **Paso 4 - Confirmar:** Se muestra un resumen completo: artículos, método de pago (enmascarado), dirección de envío, costos desglosados (productos, envío, impuestos, total). El usuario debe aceptar términos y condiciones antes de confirmar.
6. La tokenización de datos de pago se realiza en el lado del servidor nunca exponiendo datos sensibles en el frontend.
7. Al confirmar el pago, se muestra una pantalla de procesamiento con animación de carga.
8. Si el pago es exitoso, se redirige a la pantalla de confirmación de compra (US-18) con número de orden.
9. Si el pago falla, se muestra mensaje de error claro con opción de reintentar o cambiar método de pago, sin perder los datos ingresados.
10. El wizard permite navegar hacia atrás sin perder datos de pasos anteriores.
11. El botón "Confirmar Pago" se desactiva mientras se procesa para evitar doble clic.
12. Se valida que el carrito no esté vacío antes de iniciar el checkout.

---

## Wireframe

### Desktop - Paso 1: Revisar Artículos

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(3)]            |
+===========================================================================+
|                                                                           |
|  Checkout                                                                 |
|  [1. Artículos] --- [2. Pago] --- [3. Envío] --- [4. Confirmar]          |
|     actual         pendiente       pendiente        pendiente             |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  Tu Carrito (3 artículos)                                           | |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  +--------+  Pokémon TCG - Charizard VMAX    x2   $150.00  [x]    | |
|  |  |  IMG   |  Edición: Shining Fates                                  | |
|  |  +--------+  Estado: NM                                              | |
|  |                                                                     | |
|  |  +--------+  Yu-Gi-Oh! - Blue-Eyes White Dragon  x1   $85.00  [x] | |
|  |  |  IMG   |  Edición: Legend of Blue Eyes                            | |
|  |  +--------+  Estado: LP                                              | |
|  |                                                                     | |
|  |  +--------+  MTG - Black Lotus                 x1   $1200.00  [x] | |
|  |  |  IMG   |  Edición: Alpha                                          | |
|  |  +--------+  Estado: GD                                              | |
|  |                                                                     | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------+  +--------------------------------------+ |
|  |  Resumen                  |  |  Subtotal:         $1,435.00        | |
|  |                           |  |  Envío:            $15.00           | |
|  |  Impuestos (16%): $231.20 |  |  ---------------------------       | |
|  |                           |  |  TOTAL:            $1,681.20        | |
|  +---------------------------+  +--------------------------------------+ |
|                                   [Continuar a Pago >]                   |
|                                                                           |
+===========================================================================+
```

### Desktop - Paso 2: Método de Pago

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(3)]            |
+===========================================================================+
|                                                                           |
|  Checkout                                                                 |
|  [1. Artículos] --- [2. Pago] --- [3. Envío] --- [4. Confirmar]          |
|      listo         << actual     pendiente        pendiente              |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  Método de Pago                                                           |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  ( ) Tarjeta de Crédito/Débito    ( ) PayPal                        | |
|  |                                                                     | |
|  |  +--[ Formulario de Tarjeta ]-------------------------------------+ | |
|  |  |                                                                 | | |
|  |  |  Número de Tarjeta:                                            | | |
|  |  |  +-----------------------------------------------------------+ | | |
|  |  |  |  XXXX  XXXX  XXXX  XXXX                           [visa] | | | |
|  |  |  +-----------------------------------------------------------+ | | |
|  |  |                                                                 | | |
|  |  |  Fecha Expiración:         CVV:                                | | |
|  |  |  +---------------------+   +---------------------+             | | |
|  |  |  |  MM  /  AA          |   |  ***               |             | | |
|  |  |  +---------------------+   +---------------------+             | | |
|  |  |                                                                 | | |
|  |  |  Nombre en la Tarjeta:                                         | | |
|  |  |  +-----------------------------------------------------------+ | | |
|  |  |  |  COMO APARECE EN LA TARJETA                               | | | |
|  |  |  +-----------------------------------------------------------+ | | |
|  |  |                                                                 | | |
|  |  +---------------------------------------------------------------+ | |
|  |                                                                     |
|  |  [Atrás]                                    [Continuar a Envío >]   |
|  |                                                                     |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+
```

### Desktop - Paso 3: Dirección de Envío

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(3)]            |
+===========================================================================+
|                                                                           |
|  Checkout                                                                 |
|  [1. Artículos] --- [2. Pago] --- [3. Envío] --- [4. Confirmar]          |
|      listo          listo       << actual        pendiente               |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  Dirección de Envío                                                        |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  Direcciones guardadas:                                             | |
|  |                                                                     | |
|  |  (●) Casa - Juan Pérez                                             | |
|  |      Av. Revolución 1234, Col. Centro                               | |
|  |      Ciudad de México, CDMX, 06000                                  | |
|  |      Tel: 55-1234-5678                                             | |
|  |                                                                     | |
|  |  ( ) Oficina - Juan Pérez                                           | |
|  |      Calle Reforma 567, Col. Juárez                                 | |
|  |      Ciudad de México, CDMX, 06600                                  | |
|  |      Tel: 55-8765-4321                                             | |
|  |                                                                     | |
|  |  [+ Agregar nueva dirección]                                        | |
|  |                                                                     | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------+  +--------------------------------------+ |
|  |  Envío estimado:          |  |  Subtotal:         $1,435.00        | |
|  |  Estándar (5-7 días)      |  |  Envío:            $15.00           | |
|  |  $15.00                   |  |  ---------------------------       | |
|  |                           |  |  TOTAL:            $1,450.00        | |
|  +---------------------------+  +--------------------------------------+ |
|                                   [Continuar a Confirmar >]              |
|                                                                           |
+===========================================================================+
```

### Desktop - Paso 4: Confirmar Pedido

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(3)]            |
+===========================================================================+
|                                                                           |
|  Checkout                                                                 |
|  [1. Artículos] --- [2. Pago] --- [3. Envío] --- [4. Confirmar]          |
|      listo          listo         listo        << actual                 |
|                                                                           |
+---------------------------------------------------------------------------+
|                                                                           |
|  Confirma tu Pedido                                                        |
|  +---------------------------------------------------------------------+ |
|  |  ARTÍCULOS                                                          | |
|  |  +--------+  Pokémon TCG - Charizard VMAX    x2   $150.00          | |
|  |  |  IMG   |  Yu-Gi-Oh! - Blue-Eyes           x1   $85.00           | |
|  |  +--------+  MTG - Black Lotus               x1   $1,200.00        | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|  +---------------------------+  +--------------------------------------+ |
|  |  DIRECCIÓN DE ENVÍO       |  |  MÉTODO DE PAGO                      | |
|  |                           |  |                                      | |
|  |  Juan Pérez               |  |  Visa terminada en 4242              | |
|  |  Av. Revolución 1234      |  |  Exp: 12/27                          | |
|  |  Col. Centro              |  |                                      | |
|  |  CDMX, 06000              |  |                                      | |
|  |  Tel: 55-1234-5678       |  |                                      | |
|  |  [Editar]                 |  |  [Cambiar]                           | |
|  +---------------------------+  +--------------------------------------+ |
|                                                                           |
|  +---------------------------------------------------------------+       |
|  |  RESUMEN DEL PEDIDO                                           |       |
|  |                                                               |       |
|  |  Subtotal:                           $1,435.00               |       |
|  |  Envío:                              $15.00                   |       |
|  |  Impuestos (16%):                    $231.20                  |       |
|  |  ─────────────────────────────────────────────                |       |
|  |  TOTAL:                              $1,681.20                |       |
|  +---------------------------------------------------------------+       |
|                                                                           |
|  [ ] Acepto los Términos y Condiciones y la Política de Privacidad       |
|                                                                           |
|  [Atrás]                           [Confirmar Pago - $1,681.20]         |
|                                                                           |
+===========================================================================+
```

### Desktop - Pago Exitoso

```
+===========================================================================+
|  LOGO              Buscar...              [User] [Carrito(0)]            |
+===========================================================================+
|                                                                           |
|                                                                           |
|                          +------------------+                             |
|                          |   ✓  PAGO        |                             |
|                          |   EXITOSO        |                             |
|                          +------------------+                             |
|                                                                           |
|                     Tu pedido ha sido confirmado                          |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |  Número de Orden: #ORD-2026-78432                                   | |
|  |                                                                     | |
|  |  Artículos:                                                         | |
|  |    • Pokémon TCG - Charizard VMAX (x2)              $150.00        | |
|  |    • Yu-Gi-Oh! - Blue-Eyes White Dragon (x1)        $85.00         | |
|  |    • MTG - Black Lotus (x1)                          $1,200.00     | |
|  |                                                                     | |
|  |  Total Pagado: $1,681.20                                            | |
|  |  Método: Visa ****4242                                              | |
|  |  Envío a: Av. Revolución 1234, CDMX                                 | |
|  |                                                                     | |
|  |  Recibirás un email de confirmación en breve.                       | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
|           [Ver Detalle de Orden]     [Seguir Comprando]                  |
|                                                                           |
+===========================================================================+
```

### Mobile - Checkout Wizard

```
+--------------------------+
|  ≡   Checkout    🛒(3)  |
+--------------------------+
|                          |
|  ●━━━●━━━○━━━○          |
|  1    2    3    4        |
|  Art  Pago Env  Conf     |
|                          |
+--------------------------+
|                          |
|  Tu Carrito (3)          |
|                          |
|  +------+---------------+|
|  | IMG  | Charizard V  ||
|  |      | x2  $150.00  ||
|  +------+---------------+|
|                          |
|  +------+---------------+|
|  | IMG  | Blue-Eyes    ||
|  |      | x1  $85.00   ||
|  +------+---------------+|
|                          |
|  +------+---------------+|
|  | IMG  | Black Lotus  ||
|  |      | x1  $1200.00 ||
|  +------+---------------+|
|                          |
|  Subtotal:    $1,435.00 |
|  Envío:         $15.00  |
|  Impuestos:    $231.20  |
|  ─────────────────────  |
|  TOTAL:       $1,681.20 |
|                          |
|  [Continuar a Pago >]    |
|                          |
+--------------------------+
```

### Mobile - Formulario de Pago

```
+--------------------------+
|  ←   Método de Pago      |
+--------------------------+
|                          |
|  (●) Tarjeta             |
|  ( ) PayPal              |
|                          |
|  Número de Tarjeta       |
|  +--------------------+  |
|  | XXXX XXXX XXXX XXXX|| |
|  +--------------------+  |
|                          |
|  Expiración    CVV       |
|  +----------+ +--------+|
|  | MM / AA  | |  ***   ||
|  +----------+ +--------+|
|                          |
|  Nombre en Tarjeta       |
|  +--------------------+  |
|  | NOMBRE APELLIDO   ||  |
|  +--------------------+  |
|                          |
|  [Atrás]  [Siguiente >] |
|                          |
+--------------------------+
```

### Estado vacío/Error

```
+===========================================================================+
|                                                                           |
|                          +------------------+                             |
|                          |   ✗  PAGO        |                             |
|                          |   FALLÓ          |                             |
|                          +------------------+                             |
|                                                                           |
|                   No pudimos procesar tu pago                             |
|                                                                           |
|  +---------------------------------------------------------------------+ |
|  |                                                                     | |
|  |  Motivo: Fondos insuficientes en la tarjeta.                        | |
|  |                                                                     | |
|  |  Por favor verifica tus datos o intenta con otro                    | |
|  |  método de pago.                                                    | |
|  |                                                                     | |
|  |  [Reintentar Pago]                                                  | |
|  |  [Cambiar Método de Pago]                                           | |
|  |                                                                     | |
|  |  Tus datos de pago no han sido almacenados.                         | |
|  +---------------------------------------------------------------------+ |
|                                                                           |
+===========================================================================+

+===========================================================================+
|                                                                           |
|                      CARRITO VACÍO                                        |
|                                                                           |
|                         +--------+                                        |
|                         |  🛒    |                                        |
|                         +--------+                                        |
|                                                                           |
|                    No tienes artículos en el carrito                      |
|                                                                           |
|              Explora我们的 marketplace y encuentra cartas                  |
|              increíbles para tu colección.                                |
|                                                                           |
|                    [Explorar Marketplace]                                 |
|                                                                           |
+===========================================================================+
```

---

## Notas Técnicas

- **Ruta:** /checkout
- **Componentes:** CheckoutWizard, StepIndicator, ReviewStep, PaymentStep, ShippingStep, ConfirmationStep, CardForm, PayPalButton, OrderSummary
- **Endpoints:**
  - POST /api/checkout/validate - Validar carrito antes de iniciar checkout
  - POST /api/payment/tokenize - Tokenizar datos de pago (PCI-DSS compliant)
  - POST /api/payment/process - Procesar pago
  - POST /api/payment/paypal/create - Crear orden PayPal
  - POST /api/payment/paypal/execute - Ejecutar pago PayPal
  - GET /api/shipping/addresses - Obtener direcciones del usuario
  - POST /api/shipping/calculate - Calcular costo de envío
  - POST /api/orders - Crear orden tras pago exitoso
