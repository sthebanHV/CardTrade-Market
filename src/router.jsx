import { createBrowserRouter, createRoutesFromElements, Route, useParams } from 'react-router-dom';
import { App } from './App';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/cart/CheckoutPage';
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/cards/CatalogPage';
import { SearchPage } from './components/cards/SearchPage';
import { CardDetail } from './components/cards/CardDetail';
import { ComparePage } from './components/cards/ComparePage';
import { GamesPage } from './components/cards/GamesPage';
import { OffersPage } from './components/cards/OffersPage';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { AdminRoute } from './components/guards/AdminRoute';
import { ComingSoon } from './components/ui/ComingSoon';
import { ForbiddenPage } from './components/ui/ForbiddenPage';

const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Públicas — US-10 Home */}
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Explorar — US-11/12/13/14/15/16 */}
      <Route path="cards" element={<CatalogPage />} />
      <Route path="cards/game/:game" element={<CatalogGameRoute />} />
      <Route path="cards/:id" element={<CardDetail />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="compare" element={<ComparePage />} />
      <Route path="games" element={<GamesPage />} />
      <Route path="offers" element={<OffersPage />} />

      {/* Comprar */}
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={guard(<CheckoutPage />)} />
      <Route path="my-purchases" element={guard(<ComingSoon title="Mis compras" hu="US-34 Historial de Compras" />)} />

      {/* Vender */}
      <Route path="sell/new" element={guard(<ComingSoon title="Publicar carta" hu="US-17 Publicar Carta" />)} />
      <Route path="my-listings" element={guard(<ComingSoon title="Mis publicaciones" hu="US-18 Gestionar Publicaciones" />)} />
      <Route path="my-sales" element={guard(<ComingSoon title="Mis ventas" hu="US-35 Historial de Ventas" />)} />

      {/* Colección */}
      <Route path="my-collection" element={guard(<ComingSoon title="Mi colección" hu="US-29 Agregar a Colección" />)} />
      <Route path="favorites" element={guard(<ComingSoon title="Favoritos" hu="US-41 Favoritos" />)} />
      <Route path="my-alerts" element={guard(<ComingSoon title="Alertas de precio" hu="US-37 Alertas de Precio" />)} />
      <Route path="wishlist" element={guard(<ComingSoon title="Lista de deseos" hu="US-42 Lista de Deseos" />)} />

      {/* Cuenta */}
      <Route path="dashboard" element={guard(<Dashboard />)} />
      <Route path="profile" element={guard(<ComingSoon title="Mi perfil" hu="US-07 Gestión de Perfil" />)} />
      <Route path="settings" element={guard(<ComingSoon title="Configuración" hu="US-05 Cambio de Contraseña" />)} />
      <Route path="notifications" element={guard(<ComingSoon title="Notificaciones" hu="US-45 Centro de Notificaciones" />)} />
      <Route path="messages" element={guard(<ComingSoon title="Mensajes" hu="US-40 Chat entre Usuarios" />)} />

      {/* Social */}
      <Route path="seller/:username" element={<ComingSoon title="Perfil de vendedor" hu="US-19 Perfil de Vendedor" />} />

      {/* Admin (ROLE_ADMIN) — US-47 */}
      <Route path="admin" element={<AdminRoute><ComingSoon title="Panel de administración" hu="US-47 Panel de Administración" /></AdminRoute>} />

      <Route path="403" element={<ForbiddenPage />} />
      <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
    </Route>
  )
);

function CatalogGameRoute() {
  const { game } = useParams();
  return <CatalogPage gameFromPath={decodeURIComponent(game || '')} />;
}
