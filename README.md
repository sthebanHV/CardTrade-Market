# CardTrade Market

Plataforma web para la compra y venta de cartas coleccionables.

## Descripción

CardTrade Market es una plataforma que permite a los coleccionistas de cartas buscar, comprar y vender cartas de diferentes tipos. Los usuarios pueden consultar el precio actual en el mercado, conocer la edición, rareza y estado de cada carta, publicar sus propias cartas para la venta, gestionar su colección personal y consultar el historial de transacciones.

## Funcionalidades Principales

- **Registro y autenticación** de usuarios
- **Búsqueda avanzada** de cartas con filtros
- **Detalle de carta** con información de edición, rareza, estado y precio
- **Publicación de cartas** en venta
- **Proceso de compra** con carrito y checkout
- **Colección personal** de cartas
- **Historial** de compras y ventas
- **Dashboard** con resumen de actividad

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Base de datos | MongoDB |
| Autenticación | JWT |
| Estilos | CSS Modules / Tailwind CSS |

## Estructura del Proyecto

```
CardTrade-Market/
├── client/                 # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas/Vistas
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # Context API
│   │   ├── services/       # Servicios API
│   │   ├── utils/          # Utilidades
│   │   └── styles/         # Estilos globales
│   └── package.json
├── server/                 # Backend Node.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── package.json
├── docs/                   # Documentación
│   └── REQUIREMENTS.md     # Requerimientos del proyecto
└── README.md
```

## Instalación

### Prerrequisitos
- Node.js >= 18.x
- npm o yarn
- MongoDB

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/sthebanHV/CardTrade-Market.git
cd CardTrade-Market

# Instalar dependencias del backend
cd server
npm install

# Instalar dependencias del frontend
cd ../client
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## Roles de Usuario

Los roles tienen **dos capas** (ver [US-46](docs/issues/US-46-Sistema-Roles-Perspectivas.md)):

**Capa 1 — Autorización** (campo `role` en BD, `users.role`):

| Rol | Descripción |
|-----|-------------|
| **Visitante** (sin sesión) | Navega el catálogo, busca, ve detalle de cartas y perfiles públicos de vendedores |
| **`ROLE_USER`** (registrado) | Todo lo del visitante + comprar, publicar, colección, favoritos, alertas, reseñas, chat, dashboard |
| **`ROLE_ADMIN`** | Todo lo del usuario + panel de administración ([US-47](docs/issues/US-47-Panel-Administracion.md)) |

**Capa 2 — Perspectivas** (derivadas de la actividad, **no excluyentes** — todo usuario registrado las tiene a la vez):

| Perspectiva | Secciones | Se activa cuando |
|-------------|-----------|------------------|
| **Comprador** | Carrito, mis compras, direcciones, tracking | Siempre (registrado) |
| **Vendedor** | Publicar, mis publicaciones, mis ventas, perfil con rating | Al completar ventas se muestra el distintivo "Vendedor verificado" |
| **Coleccionista** | Mi colección, valor/estadísticas, favoritos, alertas, lista de deseos | Al tener cartas en la colección |

## Documentación

Ver [REQUIREMENTS.md](docs/REQUIREMENTS.md) para requerimientos detallados.

## Licencia

MIT
