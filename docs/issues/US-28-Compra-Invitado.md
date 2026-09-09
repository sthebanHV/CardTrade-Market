# [US-28] Compra como Invitado

## Modelo INVEST
- **Independiente**: No depende de otras historias
- **Negociable**: Información requerida ajustable
- **Valioso**: Reduce la fricción para nuevos usuarios
- **Estimable**: 5 puntos de esfuerzo
- **Pequeño**: Implementación manejable
- **Testable**: Verificar que la compra se completa sin registro

---

## Historia de Usuario

**Como** visitante que quiere comprar rápido,
**quiero** completar mi compra sin crear una cuenta,
**para** ahorrar tiempo en mi primera compra.

---

## Criterios de Aceptación

1. Opción "Comprar como Invitado" en el checkout
2. Solicitar solo email y dirección de envío
3. Crear cuenta automáticamente después de la compra
4. Enviar email con credenciales para acceder a la cuenta
5. Se puede vincular a cuenta existente si el email ya está registrado

---

## Wireframe

```
+----------------------------------------------------------+
|  CHECKOUT - Selecciona Tipo de Cliente                   |
+----------------------------------------------------------+
|                                                          |
|  ¿Cómo deseas continuar?                                 |
|                                                          |
|  +----------------------------------------------------+ |
|  |  (x) Tengo cuenta - Iniciar Sesión                  | |
|  +----------------------------------------------------+ |
|                                                          |
|  +----------------------------------------------------+ |
|  |  ( ) Comprar como Invitado                          | |
|  |                                                     | |
|  |  No necesitas crear cuenta.                         | |
|  |  Ingresa tu email y dirección de envío.             | |
|  +----------------------------------------------------+ |
|                                                          |
|  [Continuar →]                                           |
|                                                          |
+----------------------------------------------------------+
```

### Formulario de Invitado

```
+----------------------------------------------------------+
|  COMPRA COMO INVITADO                                    |
+----------------------------------------------------------+
|                                                          |
|  Email (para recibir confirmación):                      |
|  +-----------------------------------------------+      |
|  |  correo@ejemplo.com                           |      |
|  +-----------------------------------------------+      |
|                                                          |
|  Dirección de Envío:                                     |
|  +-----------------------------------------------+      |
|  |  Calle Principal 123, CDMX                     |      |
|  +-----------------------------------------------+      |
|                                                          |
|  [Continuar al Pago →]                                   |
|                                                          |
+----------------------------------------------------------+
```

---

## Notas Técnicas

- **Ruta**: Se ejecuta desde `/checkout`
- **Componentes**: `GuestCheckout`, `GuestForm`
- **Endpoints**:
  - `POST /api/checkout/guest` - Checkout como invitado
- **Cuenta**: Crear cuenta con email y enviar credenciales
- **Seguridad**: Validar email antes de procesar
