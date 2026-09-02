# [US-12] Checkout y Pago

**Epic:** Proceso de Compra
**Prioridad:** Alta
**Estimación:** 8 puntos

---

## Historia de Usuario

**Como** comprador,
**quiero** completar el proceso de pago de forma segura con diferentes métodos de pago,
**para** adquirir las cartas que seleccioné en mi carrito.

---

## Criterios de Aceptance

- [ ] Proceso de checkout en pasos (wizard)
- [ ] Paso 1: Revisar artículos del carrito
- [ ] Paso 2: Seleccionar método de pago
- [ ] Paso 3: Confirmar dirección de envío (si aplica)
- [ ] Paso 4: Revisar resumen y confirmar
- [ ] Métodos de pago: Tarjeta crédito/débito, PayPal
- [ ] Formulario de tarjeta con validación (número, fecha, CVV)
- [ ] Se muestra resumen final antes de confirmar
- [ ] Procesamiento seguro (tokenización)
- [ ] Confirmación exitosa con número de orden
- [ ] Error manejado si el pago falla

---

## Wireframe - Checkout Paso 1: Revisar Artículos

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market                                 |
+----------------------------------------------------------+
|                                                          |
|  CHECKOUT                                                |
|  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  |
|  (1) Revisar  →  (2) Pago  →  (3) Envío  →  (4) Confirmar|
|                                                          |
|  +----------------------------------------------------+ |
|  |  TUS ARTÍCULOS                                       | |
|  |                                                     | |
|  |  +------+  Charizard ex Full Art         $45.00    | |
|  |  | [img]|  CardMaster_MX                            | |
|  |  +------+                                           | |
|  |                                                     | |
|  |  +------+  Pikachu Full Art              $28.00    | |
|  |  | [img]|  PikachuFan                              | |
|  |  +------+                                           | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  Subtotal:  $73.00                                  | |
|  |  Envío:     $5.99                                   | |
|  |  TOTAL:     $78.99                                  | |
|  +----------------------------------------------------+ |
|                                                          |
|                          [Continuar al pago →]           |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Checkout Paso 2: Método de Pago

```
+----------------------------------------------------------+
|  [Logo]  CardTrade Market                                 |
+----------------------------------------------------------+
|                                                          |
|  CHECKOUT                                                |
|  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  |
|  (1) Revisar  →  (2) Pago  →  (3) Envío  →  (4) Confirmar|
|                                                          |
|  +----------------------------------------------------+ |
|  |  MÉTODO DE PAGO                                      | |
|  |                                                     | |
|  |  (●) Tarjeta de Crédito/Débito                      | |
|  |  ( ) PayPal                                         | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  Número de Tarjeta                                  | |
|  |  +-----------------------------+  +------+ +------+ | |
|  |  | 4532 •••• •••• ••••          |  | Visa | | MC   | | |
|  |  +-----------------------------+  +------+ +------+ | |
|  |                                                     | |
|  |  Nombre en la Tarjeta                               | |
|  |  +-----------------------------+                    | |
|  |  | JUAN PÉREZ                  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Fecha de Expiración    CVV                         | |
|  |  +----------+ +------+   +------+                   | |
|  |  | 12 / 2026| | ✓    |   | •••  |                   | |
|  |  +----------+ +------+   +------+                   | |
|  |                                                     | |
|  |  🔒 Tu información de pago es segura                | |
|  +----------------------------------------------------+ |
|                                                          |
|  [← Atrás]                          [Confirmar Pago →]  |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Checkout Paso 3: Envío

```
+----------------------------------------------------------+
|  CHECKOUT                                                |
|  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  |
|  (1) Revisar  →  (2) Pago  →  (3) Envío  →  (4) Confirmar|
|                                                          |
|  +----------------------------------------------------+ |
|  |  DIRECCIÓN DE ENVÍO                                  | |
|  |                                                     | |
|  |  Nombre completo                                    | |
|  |  +-----------------------------+                    | |
|  |  | Juan Pérez                  |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Dirección                                          | |
|  |  +-----------------------------+                    | |
|  |  | Av. Reforma 123, Col. Centro |                    | |
|  |  +-----------------------------+                    | |
|  |                                                     | |
|  |  Ciudad         Estado        CP                    | |
|  |  +----------+  +----------+  +--------+            | |
|  |  | CDMX     |  | CDMX     |  | 06000  |            | |
|  |  +----------+  +----------+  +--------+            | |
|  |                                                     | |
|  |  Teléfono                                            | |
|  |  +-----------------------------+                    | |
|  |  | +52 55 1234 5678            |                    | |
|  |  +-----------------------------+                    | |
|  +----------------------------------------------------+ |
|                                                          |
|  [← Atrás]                       [Continuar →]          |
+----------------------------------------------------------+
```

---

## Wireframe - Checkout Paso 4: Confirmar

```
+----------------------------------------------------------+
|  CHECKOUT                                                |
|  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  |
|  (1) Revisar  →  (2) Pago  →  (3) Envío  →  (4) Confirmar|
|                                                          |
|  +----------------------------------------------------+ |
|  |  RESUMEN DE TU COMPRA                                | |
|  |                                                     | |
|  |  ARTÍCULOS                                          | |
|  |  Charizard ex Full Art                    $45.00    | |
|  |  Pikachu Full Art                         $28.00    | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |  Subtotal:                                $73.00    | |
|  |  Envío:                                   $5.99     | |
|  |  TOTAL:                                   $78.99    | |
|  |                                                     | |
|  |  ─────────────────────────────────────────────────  | |
|  |                                                     | |
|  |  PAGO                                               | |
|  |  Visa terminación 4532                              | |
|  |                                                     | |
|  |  ENVÍO                                              | |
|  |  Juan Pérez                                         | |
|  |  Av. Reforma 123, Col. Centro                       | |
|  |  CDMX, CDMX 06000                                   | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  [← Atrás]           [🔒 CONFIRMAR Y PAGAR $78.99]     |
|                                                          |
+----------------------------------------------------------+
```

---

## Wireframe - Pago Exitoso

```
+----------------------------------------------------------+
|                                                          |
|              +-----------------------------------+       |
|              |            ✅                      |       |
|              |     ¡PAGO EXITOSO!                |       |
|              |                                   |       |
|              |  Tu orden #CTM-2024-001 ha sido   |       |
|              |  procesada correctamente.         |       |
|              |                                   |       |
|              |  Recibirás un email con los       |       |
|              |  detalles de tu compra.           |       |
|              |                                   |       |
|              |  +-----------------------------+  |       |
|              |  |    VER MI ORDEN             |  |       |
|              |  +-----------------------------+  |       |
|              |                                   |       |
|              |  +-----------------------------+  |       |
|              |  |    VOLVER AL INICIO         |  |       |
|              |  +-----------------------------+  |       |
|              +-----------------------------------+       |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta:** `/checkout`
- **Componentes:** `CheckoutWizard`, `ReviewStep`, `PaymentStep`, `ShippingStep`, `ConfirmStep`, `PaymentSuccess`
- **Endpoints:**
  - `POST /api/orders` - Crear orden
  - `POST /api/payments/process` - Procesar pago
- **Pasarela de pago:** Stripe o PayPal API
- **Seguridad:** PCI DSS compliance, tokenización de tarjetas
