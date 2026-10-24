import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { App } from './App';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/cart/CheckoutPage';
import { CardList } from './components/cards/CardList';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { AdminRoute } from './components/guards/AdminRoute';
import { ComingSoon } from './components/ui/ComingSoon';
import { ForbiddenPage } from './components/ui/ForbiddenPage';

const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Públicas */}
      <Route index element={<CardList />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Explorar */}
      <Route path="cards" element={<CardList />} />
      <Route path="offers" element={<ComingSoon title="Ofertas" hu="US-11 Ofertas y Descuentos" />} />
      <Route path="games" element={<ComingSoon title="Catálogo por juego" hu="US-12 Filtros por Juego" />} />

      {/* Comprar */}
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={guard(<CheckoutPage />)} />
      <Route path="my-purchases" element={guard(<ComingSoon title="Mis compras" hu="US-13 Historial de Compras" />)} />

      {/* Vender */}
      <Route path="sell/new" element={guard(<ComingSoon title="Publicar carta" hu="US-17 Publicar Carta" />)} />
      <Route path="my-listings" element={guard(<ComingSoon title="Mis publicaciones" hu="US-18 Mis Publicaciones" />)} />
      <Route path="my-sales" element={guard(<ComingSoon title="Mis ventas" hu="US-21 Resumen de Ventas" />)} />

      {/* Colección */}
      <Route path="my-collection" element={guard(<ComingSoon title="Mi colección" hu="US-29 Mi Colección" />)} />
      <Route path="favorites" element={guard(<ComingSoon title="Favoritos" hu="US-30 Favoritos" />)} />
      <Route path="my-alerts" element={guard(<ComingSoon title="Alertas de precio" hu="US-32 Alertas de Precio" />)} />
      <Route path="wishlist" element={guard(<ComingSoon title="Lista de deseos" hu="US-31 Lista de Deseos" />)} />

      {/* Cuenta */}
      <Route path="dashboard" element={guard(<Dashboard />)} />
      <Route path="profile" element={guard(<ComingSoon title="Mi perfil" hu="US-05 Perfil de Usuario" />)} />
      <Route path="settings" element={guard(<ComingSoon title="Configuración" hu="US-08 Configuración" />)} />
      <Route path="notifications" element={guard(<ComingSoon title="Notificaciones" hu="US-45 Centro de Notificaciones" />)} />
      <Route path="messages" element={guard(<ComingSoon title="Mensajes" hu="US-40 Chat en Tiempo Real" />)} />

      {/* Social / público con sesión */}
      <Route path="seller/:username" element={<ComingSoon title="Perfil de vendedor" hu="US-39 Perfil Público de Vendedor" />} />

      {/* Admin (ROLE_ADMIN) */}
      <Route path="admin" element={<AdminRoute><ComingSoon title="Panel de administración" hu="US-47 Panel de Administración" /></AdminRoute>} />

      <Route path="403" element={<ForbiddenPage />} />
      <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
    </Route>
  )
);
