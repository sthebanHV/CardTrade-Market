# [US-27] Métodos de Pago

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Métodos disponibles ajustables
- **Valocious**: Facilita compras futuras
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación estándar
- **Testable**: Verificar guardar y eliminar tarjetas

---

## Historia de Usuario

**Como** usuario frecuente,
**quiero** guardar mis métodos de pago para compras futuras,
**para** agilizar el proceso de checkout.

---

## Criterios de Aceptación

1. Guardar tarjetas de crédito/débito de forma segura
2. Mostrar solo los últimos 4 dígitos y la marca
3. Establecer una tarjeta como predeterminada
4. Eliminar tarjetas guardadas
5. No almacenar CVV (solo tokenizar con proveedor de pago)
6. Encriptar todos los datos sensibles

---

## Wireframe

```
+----------------------------------------------------------+
|  +----------------------------------------------------+ |
|  |  MÉTODOS DE PAGO                                    | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  💳 Visa terminada en 4242 (Predeterminada)    |  | |
|  |  |  Vence: 12/28                                  |  | |
|  |  |  [Editar] [Eliminar]                           |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  💳 Mastercard terminada en 8888               |  | |
|  |  |  Vence: 06/27                                  |  | |
|  |  |  [Editar] [Eliminar] [Marcar como Predet.]     |  | |
|  |  +-----------------------------------------------+  | |
|  |                                                     | |
|  |  +-----------------------------------------------+  | |
|  |  |  [+ Agregar Nueva Tarjeta]                     |  | |
|  |  +-----------------------------------------------+  | |
|  +----------------------------------------------------+ |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: `/settings/payment`
- **Componentes**: `PaymentMethods`, `AddCardForm`, `CardDisplay`
- **Endpoints**:
  - `GET /api/payment-methods` - Obtener métodos de pago
  - `POST /api/payment-methods` - Agregar método de pago
  - `DELETE /api/payment-methods/:id` - Eliminar método de pago
  - `PATCH /api/payment-methods/:id/default` - Establecer predeterminado
- **Seguridad**: Tokenización con Stripe, PCI compliance
- **NUNCA** almacenar CVV o número completo de tarjeta
