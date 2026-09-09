# Requerimientos del Proyecto - CardTrade Market

## 1. Descripción General

CardTrade Market es una plataforma web para la compra y venta de cartas coleccionables. Permite a los usuarios buscar cartas, consultar precios, publicar cartas en venta, realizar compras, gestionar colecciones y consultar historiales de transacciones.

---

## 2. Requerimientos Funcionales

### RF-01: Gestión de Usuarios

#### RF-01.1: Registro de Usuario
- **Descripción:** Un visitante puede registrarse en la plataforma.
- **Entrada:** Nombre, email, contraseña, confirmación de contraseña.
- **Proceso:** Validar datos, verificar email único, hash de contraseña, crear cuenta.
- **Salida:** Cuenta creada, sesión iniciada automáticamente.
- **Validaciones:**
  - Email válido y no registrado previamente
  - Contraseña mínimo 8 caracteres
  - Nombre entre 2 y 50 caracteres
  - Coincidencia de contraseña y confirmación

#### RF-01.2: Inicio de Sesión
- **Descripción:** Un usuario registrado puede autenticarse.
- **Entrada:** Email y contraseña.
- **Proceso:** Verificar credenciales, generar token JWT.
- **Salida:** Token de autenticación, redirección al dashboard.
- **Validaciones:**
  - Credenciales correctas
  - Cuenta activa (no baneada)

#### RF-01.3: Cierre de Sesión
- **Descripción:** Un usuario autenticado puede cerrar sesión.
- **Proceso:** Invalidar token del lado del cliente.
- **Salida:** Sesión cerrada, redirección a home.

#### RF-01.4: Perfil de Usuario
- **Descripción:** El usuario puede ver y editar su perfil.
- **Datos del perfil:**
  - Nombre de usuario (único)
  - Avatar/foto de perfil
  - Biografía (máx. 200 caracteres)
  - Ubicación
  - Fecha de registro
  - Calificación de vendedor (estrellas)
- **Operaciones:** Ver perfil, editar datos, cambiar contraseña.

---

### RF-02: Catálogo de Cartas

#### RF-02.1: Página Principal (Home)
- **Descripción:** Página de inicio con cartas destacadas y navegación.
- **Contenido:**
  - Barra de búsqueda principal
  - Categorías/tipos de cartas
  - Cartas destacadas/populares (grid)
  - Últimas publicaciones
  - Banner promocional (opcional)
- **Comportamiento:** Carga rápida, lazy loading de imágenes.

#### RF-02.2: Búsqueda de Cartas
- **Descripción:** El usuario puede buscar cartas por nombre.
- **Entrada:** Texto de búsqueda.
- **Proceso:** Búsqueda por nombre con autocompletado.
- **Salida:** Lista de cartas que coinciden.
- **Comportamiento:**
  - Búsqueda en tiempo real (debounce 300ms)
  - Sugerencias de autocompletado
  - Búsqueda por nombre exacto o parcial

#### RF-02.3: Filtros Avanzados
- **Descripción:** Refinar resultados de búsqueda con múltiples filtros.
- **Filtros disponibles:**
  - **Tipo de carta:** Pokémon, Magic, Yu-Gi-Oh, Dragon Ball, One Piece, Otros
  - **Edición:** Base, 1st Edition, Reverse Holo, Full Art, etc.
  - **Rareza:** Common, Uncommon, Rare, Ultra Rare, Secret Rare, etc.
  - **Estado/Condición:** Nuevo (NM), Ligero uso (LP), Moderado (MP), Pesado (HP), Dañado (D)
  - **Rango de precio:** Mínimo - Máximo
  - **Vendedor:** Por nombre de usuario
- **Comportamiento:** Filtros combinables, limpiar filtros, ordenar por precio/fecha.

#### RF-02.4: Detalle de Carta
- **Descripción:** Vista detallada de una carta específica.
- **Información mostrada:**
  - Imagen de alta resolución (zoom al hacer clic)
  - Nombre de la carta
  - Tipo/juego
  - Edición
  - Rareza
  - Estado/Condición
  - Precio actual
  - Nombre del vendedor (link a perfil)
  - Fecha de publicación
  - Descripción (opcional del vendedor)
  - Cartas similares (sección)
- **Acciones:**
  - Agregar al carrito
  - Agregar a favoritos
  - Compartir
  - Reportar publicación

---

### RF-03: Publicación y Venta

#### RF-03.1: Publicar Carta en Venta
- **Descripción:** Un usuario registrado puede publicar una carta para vender.
- **Campos requeridos:**
  - Nombre de la carta
  - Tipo/juego
  - Edición
  - Rareza
  - Estado/Condición
  - Precio (en USD)
  - Imágenes (1-5 fotos, mín. 1)
  - Descripción adicional (opcional)
- **Validaciones:**
  - Todos los campos obligatorios completos
  - Precio mayor a 0
  - Al menos 1 imagen
  - Tamaño máximo por imagen: 5MB
  - Formatos permitidos: JPG, PNG, WebP
- **Proceso:** Validar, subir imágenes, crear publicación.
- **Salida:** Publicación activa visible en el catálogo.

#### RF-03.2: Gestionar Publicaciones
- **Descripción:** El vendedor puede gestionar sus cartas publicadas.
- **Operaciones:**
  - Ver lista de mis publicaciones
  - Editar precio, descripción, imágenes
  - Marcar como vendida
  - Eliminar publicación
- **Estados de publicación:**
  - **Activa:** Visible y disponible para compra
  - **Reservada:** Apartada para un comprador
  - **Vendida:** Transacción completada
  - **Inactiva:** Ocultada del catálogo

#### RF-03.3: Perfil de Vendedor
- **Descripción:** Ver publicaciones de un vendedor específico.
- **Contenido:**
  - Información del vendedor
  - Calificación y reseñas
  - Todas sus publicaciones activas
  - Estadísticas (ventas completadas, tiempo de respuesta)

---

### RF-04: Proceso de Compra

#### RF-04.1: Carrito de Compras
- **Descripción:** El usuario puede agregar cartas a un carrito temporal.
- **Funcionalidades:**
  - Agregar carta al carrito
  - Ver carrito con resumen de artículos
  - Modificar cantidad (si aplica)
  - Eliminar artículos del carrito
  - Ver total a pagar
- **Reglas:**
  - Máximo 1 unidad por carta (cada carta es única)
  - Verificar disponibilidad antes de agregar
  - Carrito persiste entre sesiones (guardado en BD)

#### RF-04.2: Checkout y Pago
- **Descripción:** Proceso de pago seguro para completar la compra.
- **Pasos:**
  1. Revisar artículos en carrito
  2. Seleccionar método de pago
  3. Confirmar dirección de envío (si aplica)
  4. Revisar resumen de compra
  5. Confirmar y procesar pago
- **Métodos de pago:**
  - Tarjeta de crédito/débito
  - PayPal
  - Transferencia bancaria (referencia)
- **Validaciones:**
  - Verificar stock/disponibilidad
  - Procesar pago de forma segura
  - Generar orden de compra

#### RF-04.3: Confirmación de Compra
- **Descripción:** Después del pago exitoso.
- **Contenido:**
  - Número de orden
  - Resumen de la compra
  - Datos del vendedor para contacto
  - Instrucciones de envío
  - Opción de calificar al vendedor

---

### RF-05: Colección Personal

#### RF-05.1: Agregar Carta a Colección
- **Descripción:** El usuario puede registrar cartas en su colección personal.
- **Campos:**
  - Nombre de la carta
  - Tipo/juego
  - Edición
  - Rareza
  - Estado/Condición
  - Precio de adquisición (opcional)
  - Fecha de adquisición
  - Imagen (opcional)
- **Uso:** Registro personal, no público.

#### RF-05.2: Gestionar Colección
- **Descripción:** Ver y administrar las cartas propias.
- **Vista:**
  - Lista/grid de cartas
  - Filtros y búsqueda dentro de la colección
  - Editar datos de carta
  - Eliminar carta de la colección
  - Marcar carta como "En venta"

#### RF-05.3: Valor de Colección
- **Descripción:** Calcular el valor total estimado de la colección.
- **Cálculo:** Suma de precios de mercado de todas las cartas.
- **Gráficas:**
  - Distribución por tipo/juego
  - Distribución por rareza
  - Evolución del valor en el tiempo (si hay datos históricos)

---

### RF-06: Historial de Transacciones

#### RF-06.1: Historial de Compras
- **Descripción:** Registro de todas las compras realizadas.
- **Información:**
  - Fecha de compra
  - Cartas adquiridas
  - Monto total
  - Estado (Completada, Pendiente, Cancelada)
  - Vendedor
  - Enlace a detalles de la orden

#### RF-06.2: Historial de Ventas
- **Descripción:** Registro de todas las ventas realizadas.
- **Información:**
  - Fecha de venta
  - Cartas vendidas
  - Monto total
  - Estado
  - Comprador
  - Enlace a detalles de la orden

---

### RF-07: Panel de Control (Dashboard)

#### RF-07.1: Dashboard del Usuario
- **Descripción:** Panel central con resumen de actividad.
- **Widgets:**
  - Bienvenida con nombre
  - Resumen de colección (total cartas, valor estimado)
  - Publicaciones activas
  - Ventas recientes
  - Compras recientes
  - Notificaciones pendientes
  - Accesos rápidos (publicar carta, ver colección)

---

### RF-08: Notificaciones

#### RF-08.1: Sistema de Notificaciones
- **Descripción:** Alertas para el usuario sobre actividad relevante.
- **Tipos de notificación:**
  - Nueva venta realizada
  - Nueva compra recibida
  - Mensaje de un usuario
  - Carta en favoritos con precio reducido
  - Recordatorios
- **Canales:**
  - In-app (centro de notificaciones)
  - Email (opcional, configurable)

---

## 3. Requerimientos No Funcionales

### RNF-01: Rendimiento
- Tiempo de carga de páginas < 3 segundos
- Búsqueda de cartas < 1 segundo
- Optimización de imágenes (compresión automática)
- Lazy loading de imágenes y componentes

### RNF-02: Seguridad
- Autenticación JWT con refresh token
- Hash de contraseñas con bcrypt
- Validación de datos en servidor (sanitización)
- Protección contra XSS y CSRF
- HTTPS obligatorio en producción
- Rate limiting en endpoints sensibles

### RNF-03: Disponibilidad
- Uptime del 99.9%
- Backups automáticos de base de datos
- Manejo de errores gracefully

### RNF-04: Escalabilidad
- Arquitectura modular (separación frontend/backend)
- Base de datos escalable horizontalmente
- CDN para imágenes estáticas

### RNF-05: Usabilidad
- Diseño responsive (mobile-first)
- Navegación intuitiva
- Accesibilidad WCAG 2.1 nivel AA
- Retroalimentación visual en acciones del usuario

### RNF-06: Compatibilidad
- Navegadores: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Resolución mínima: 320px (mobile)
- Soporte para lectores de pantalla

---

## 4. Modelos de Datos

### Usuario
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "username": "String (unique)",
  "avatar": "String (URL)",
  "bio": "String",
  "location": "String",
  "role": "Enum ['user', 'admin']",
  "rating": "Number (0-5)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Carta
```json
{
  "_id": "ObjectId",
  "name": "String",
  "type": "Enum ['pokemon', 'magic', 'yugioh', 'dragonball', 'onepiece', 'other']",
  "edition": "String",
  "rarity": "String",
  "condition": "Enum ['NM', 'LP', 'MP', 'HP', 'D']",
  "price": "Number",
  "images": "[String]",
  "description": "String",
  "seller": "ObjectId (ref: User)",
  "status": "Enum ['active', 'reserved', 'sold', 'inactive']",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Orden
```json
{
  "_id": "ObjectId",
  "buyer": "ObjectId (ref: User)",
  "seller": "ObjectId (ref: User)",
  "card": "ObjectId (ref: Card)",
  "amount": "Number",
  "status": "Enum ['pending', 'completed', 'cancelled']",
  "paymentMethod": "String",
  "createdAt": "Date"
}
```

### Colección
```json
{
  "_id": "ObjectId",
  "user": "ObjectId (ref: User)",
  "cardName": "String",
  "type": "String",
  "edition": "String",
  "rarity": "String",
  "condition": "String",
  "purchasePrice": "Number",
  "purchaseDate": "Date",
  "image": "String",
  "createdAt": "Date"
}
```

---

## 5. Historias de Usuario

Las historias de usuario están documentadas como Issues en el repositorio de GitHub. Cada Issue incluye:
- Título descriptivo
- Formato: **Como** [rol], **quiero** [función], **para** [beneficio]
- Criterios de aceptación detallados
- Wireframes ASCII art (Desktop, Mobile, Estados vacíos/error)
- Notas técnicas (Rutas, Componentes, Endpoints)
- Prioridad y Epic asociado
- **Modelo INVEST**: Independiente, Negociable, Valioso, Estimable, Pequeño, Testable

Ver Issues del repositorio: https://github.com/sthebanHV/CardTrade-Market/issues

### Lista de 45 Historias de Usuario

| ID | Título | Epic | Prioridad | Puntos |
|----|--------|------|-----------|--------|
| **US-01** | Registro de Usuario Nuevo | Gestión de Usuarios | Alta | 5 |
| **US-02** | Registro con Redes Sociales | Gestión de Usuarios | Media | 4 |
| **US-03** | Inicio de Sesión | Gestión de Usuarios | Alta | 4 |
| **US-04** | Recuperación de Contraseña | Gestión de Usuarios | Alta | 4 |
| **US-05** | Cambio de Contraseña | Gestión de Usuarios | Media | 3 |
| **US-06** | Cerrar Sesión | Gestión de Usuarios | Alta | 2 |
| **US-07** | Gestión de Perfil | Gestión de Usuarios | Media | 6 |
| **US-08** | Autenticación de Dos Factores | Gestión de Usuarios | Baja | 5 |
| **US-09** | Verificación de Email | Gestión de Usuarios | Alta | 3 |
| **US-10** | Página Principal (Home) | Catálogo de Cartas | Alta | 6 |
| **US-11** | Búsqueda de Cartas | Catálogo de Cartas | Alta | 5 |
| **US-12** | Filtros Avanzados de Búsqueda | Catálogo de Cartas | Media | 5 |
| **US-13** | Detalle de Carta | Catálogo de Cartas | Alta | 8 |
| **US-14** | Comparar Cartas | Catálogo de Cartas | Baja | 5 |
| **US-15** | Catálogo por Juego | Catálogo de Cartas | Media | 4 |
| **US-16** | Cartas en Oferta | Catálogo de Cartas | Media | 3 |
| **US-17** | Publicar Carta en Venta | Publicación y Venta | Alta | 8 |
| **US-18** | Gestionar Mis Publicaciones | Publicación y Venta | Media | 6 |
| **US-19** | Perfil de Vendedor | Publicación y Venta | Media | 5 |
| **US-20** | Reportar Publicación | Publicación y Venta | Baja | 3 |
| **US-21** | Editar Precio | Publicación y Venta | Media | 2 |
| **US-22** | Marcar como Vendido | Publicación y Venta | Alta | 2 |
| **US-23** | Carrito de Compras | Proceso de Compra | Alta | 8 |
| **US-24** | Checkout y Proceso de Pago | Proceso de Compra | Alta | 13 |
| **US-25** | Confirmación de Compra | Proceso de Compra | Alta | 5 |
| **US-26** | Gestionar Direcciones | Proceso de Compra | Media | 8 |
| **US-27** | Métodos de Pago | Proceso de Compra | Media | 5 |
| **US-28** | Compra como Invitado | Proceso de Compra | Baja | 5 |
| **US-29** | Agregar Carta a Colección | Colección Personal | Media | 5 |
| **US-30** | Gestionar Mi Colección | Colección Personal | Media | 8 |
| **US-31** | Valor y Estadísticas de Colección | Colección Personal | Baja | 5 |
| **US-32** | Exportar Colección | Colección Personal | Baja | 3 |
| **US-33** | Colecciones Temáticas | Colección Personal | Baja | 4 |
| **US-34** | Historial de Compras | Historial y Seguimiento | Media | 5 |
| **US-35** | Historial de Ventas | Historial y Seguimiento | Media | 5 |
| **US-36** | Seguir Vendedor | Historial y Seguimiento | Baja | 3 |
| **US-37** | Alertas de Precio | Historial y Seguimiento | Baja | 4 |
| **US-38** | Rastrear Envío | Historial y Seguimiento | Media | 3 |
| **US-39** | Reseñas y Calificaciones | Interacción Social | Media | 5 |
| **US-40** | Chat entre Usuarios | Interacción Social | Baja | 8 |
| **US-41** | Sistema de Favoritos | Interacción Social | Media | 3 |
| **US-42** | Lista de Deseos | Interacción Social | Baja | 4 |
| **US-43** | Compartir en Redes Sociales | Interacción Social | Baja | 3 |
| **US-44** | Dashboard de Usuario | Panel de Control y Extras | Media | 6 |
| **US-45** | Centro de Notificaciones | Panel de Control y Extras | Media | 5 |

### Resumen por Épica

| Épica | Historias | Puntos Totales |
|-------|-----------|----------------|
| Gestión de Usuarios | US-01 a US-09 | 36 |
| Catálogo de Cartas | US-10 a US-16 | 36 |
| Publicación y Venta | US-17 a US-22 | 26 |
| Proceso de Compra | US-23 a US-28 | 42 |
| Colección Personal | US-29 a US-33 | 25 |
| Historial y Seguimiento | US-34 a US-38 | 20 |
| Interacción Social | US-39 a US-43 | 23 |
| Panel de Control y Extras | US-44 a US-45 | 11 |
| **TOTAL** | **45 historias** | **219 puntos** |

---

## 6. Criterios de Aceptación Generales

- [ ] Todas las funcionalidades funcionan en mobile y desktop
- [ ] Formularios con validación client-side y server-side
- [ ] Mensajes de error claros y amigables
- [ ] Loading states en operaciones asíncronas
- [ ] Confirmación antes de acciones destructivas
- [ ] Datos persisten correctamente en base de datos
- [ ] Autenticación protege rutas privadas
- [ ] Imágenes se cargan con lazy loading

---

## 7. Glosario

| Término | Definición |
|---------|------------|
| **Carta** | Pieza coleccionable de un juego de cartas |
| **Rareza** | Nivel de escasez de una carta |
| **Edición** | Versión/variedad específica de una carta |
| **Estado** | Condición física de la carta |
| **Colección** | Conjunto de cartas que posee un usuario |
| **Publicación** | Anuncio de venta de una carta |
| **Orden** | Transacción de compra-venta completada |
| **INVEST** | Modelo de historias: Independiente, Negociable, Valioso, Estimable, Pequeño, Testable |
