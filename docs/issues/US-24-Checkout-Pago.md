# [US-24] Checkout y Proceso de Pago

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Métodos de pago disponibles
- **Valioso**: Permite completar la compra de forma segura
- **Estimable**: 13 puntos de esfuerzo
- **Pequeño**: Implementación compleja pero necesaria
- **Testable**: Verificar flujo completo de pago

---

## Historia de Usuario

**Como** comprador,
**quiero** un proceso de pago seguro y sencillo,
**para** completar mi compra con confianza.

---

## Criterios de Aceptación

1. Resumen del pedido antes de pagar
2. Selección de dirección de envío
3. Selección de método de pago (tarjeta, PayPal, OXXO)
4. Formulario de pago seguro (PCI compliant)
5. Confirmación antes de procesar el pago
6. Manejo de errores durante el pago
7. Redirección a página de confirmación exitosa

---

## Wireframe

### Paso 1: Resumen del Pedido

```
+----------------------------------------------------------+
|  CHECKOUT - Paso 1 de 3: Resumen                         |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+ |
|  |  ARTÍCULOS (2)                                      | |
|  |  +------+ Charizard ex Full ART          $45.00     | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |  +------+ PIKACHU FULL ART               $28.00     | |
|  |  | [img]|                                            | |
|  |  +------+                                            | |
|  |                                                     | |
|  |  Subtotal:                          $73.00          | |
|  |  Envío:                             $5.99           | |
|  |  TOTAL:                             $78.99          | |
|  +----------------------------------------------------+ |
|                                                          |
|  [Continuar a Envío →]                                   |
|                                                          |
+----------------------------------------------------------+
```

### Paso 2: Dirección de Envío

```
+----------------------------------------------------------+
|  CHECKOUT - Paso 2 de 3: Envío                           |
+----------------------------------------------------------+
|                                                          |
|  Selecciona dirección de envío:                          |
|                                                          |
|  (x) Casa - Calle Principal 123, CDMX                   |
|  ( ) Trabajo - Av. Reforma 456, CDMX                    |
|  (+ Agregar nueva dirección)                             |
|                                                          |
|  Método de envío:                                        |
|  (x) Envío estándar (5-7 días) - $5.99                  |
|  ( ) Envío express (2-3 días) - $12.99                   |
|                                                          |
|  [← Resumen]                    [Continuar a Pago →]     |
|                                                          |
+----------------------------------------------------------+
```

### Paso 3: Pago

```
+----------------------------------------------------------+
|  CHECKOUT - Paso 3 de 3: Pago                            |
+----------------------------------------------------------+
|                                                          |
|  Método de pago:                                         |
|  [💳 Tarjeta] [🅿️ PayPal] [🎫 OXXO]                     |
|                                                          |
|  +----------------------------------------------------+ |
|  |  DATOS DE TARJETA                                  | |
|  |                                                     | |
|  |  Número de Tarjeta                                  | |
|  |  +-----------------------------------------------+  | |
|  |  |  4242 4242 4242 4242                           |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Nombre en la Tarjeta                               | |
|  |  +-----------------------------------------------+  | |
|  |  |  CARLOS MENDEZ                                  |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  Fecha de Expiración    CVV                         | |
|  |  +----------------+    +----------+                 | |
|  |  |  12/28         |    |  ***     |                 | |
|  |  +----------------+    +----------+                 | |
|  |                                                     | |
|  |  [ ] Guardar esta tarjeta para futuras compras      | |
|  |                                                     | |
|  +----------------------------------------------------+ |
|                                                          |
|  TOTAL A PAGAR: $78.99 USD                               |
|                                                          |
|  [← Envío]                    [🔒 Pagar Ahora]           |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/checkout`
- **Componentes**: `CheckoutPage`, `OrderSummary`, `ShippingForm`, `PaymentForm`
- **Endpoints**:
  - `POST /api/orders` - Crear orden
  - `POST /api/payments/process` - Procesar pago
  - `POST /api/payments/verify` - Verificar pago
- **Seguridad**: PCI DSS compliance, Stripe o PayPal
- **Webhooks**: Confirmar pago con webhooks del proveedor
