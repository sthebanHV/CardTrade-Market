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

| Rol | Descripción |
|-----|-------------|
| **Visitante** | Puede navegar, buscar cartas y ver detalles |
| **Usuario registrado** | Puede comprar, vender, gestionar colección |
| **Administrador** | Gestión total de la plataforma |

## Documentación

Ver [REQUIREMENTS.md](docs/REQUIREMENTS.md) para requerimientos detallados.

## Licencia

MIT
