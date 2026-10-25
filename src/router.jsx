import { createBrowserRouter, createRoutesFromElements, Route, useParams } from 'react-router-dom';
import { App } from './App';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { VerifyEmail } from './components/auth/VerifyEmail';
import { ChangePassword } from './components/auth/ChangePassword';
import { ProfilePage } from './components/auth/ProfilePage';
import { SettingsPage } from './components/auth/SettingsPage';
import { SecurityPage } from './components/auth/SecurityPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/cart/CheckoutPage';
import { OrderConfirmationPage } from './components/cart/OrderConfirmationPage';
import { AddressesPage } from './components/settings/AddressesPage';
import { PaymentMethodsPage } from './components/settings/PaymentMethodsPage';
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/cards/CatalogPage';
import { SearchPage } from './components/cards/SearchPage';
import { CardDetail } from './components/cards/CardDetail';
import { ComparePage } from './components/cards/ComparePage';
import { GamesPage } from './components/cards/GamesPage';
import { OffersPage } from './components/cards/OffersPage';
import { MarketPage } from './components/market/MarketPage';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { AdminRoute } from './components/guards/AdminRoute';
import { ComingSoon } from './components/ui/ComingSoon';
import { ForbiddenPage } from './components/ui/ForbiddenPage';
import { PublishPage } from './components/sell/PublishPage';
import { MyListingsPage } from './components/sell/MyListingsPage';
import { SellerProfile } from './components/sellers/SellerProfile';
import { MyFollowedPage } from './components/sellers/MyFollowedPage';
import { CollectionPage } from './components/collection/CollectionPage';
import { CollectionStatsPage } from './components/collection/CollectionStatsPage';
import { MyCollectionsPage } from './components/collection/MyCollectionsPage';
import { MyPurchasesPage } from './components/purchases/MyPurchasesPage';
import { PurchaseDetailPage } from './components/purchases/PurchaseDetailPage';
import { MySalesPage } from './components/purchases/MySalesPage';
import { MyAlertsPage } from './components/alerts/MyAlertsPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';
import { FavoritesPage } from './components/favorites/FavoritesPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { ChatPage } from './components/chat/ChatPage';
import { AdminPage } from './components/admin/AdminPage';

const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Públicas — US-10 Home */}
      <Route index element={<HomePage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="verify-email/:token" element={<VerifyEmail />} />

      {/* Explorar — US-11/12/13/14/15/16 */}
      <Route path="cards" element={<CatalogPage />} />
      <Route path="cards/game/:game" element={<CatalogGameRoute />} />
      <Route path="cards/:id" element={<CardDetail />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="compare" element={<ComparePage />} />
      <Route path="games" element={<GamesPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="market" element={<MarketPage />} />

      {/* Comprar — US-23/24/25/28/34/38 */}
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
      <Route path="my-purchases" element={guard(<MyPurchasesPage />)} />
      <Route path="my-purchases/:orderId" element={guard(<PurchaseDetailPage />)} />

      {/* Vender — US-17/18/35 */}
      <Route path="sell/new" element={guard(<PublishPage />)} />
      <Route path="my-listings" element={guard(<MyListingsPage />)} />
      <Route path="my-sales" element={guard(<MySalesPage />)} />

      {/* Colección — US-29/30/31/33 */}
      <Route path="my-collection" element={guard(<CollectionPage />)} />
      <Route path="my-collection/stats" element={guard(<CollectionStatsPage />)} />
      <Route path="my-collections" element={guard(<MyCollectionsPage />)} />
      <Route path="favorites" element={guard(<FavoritesPage />)} />
      <Route path="my-alerts" element={guard(<MyAlertsPage />)} />
      <Route path="wishlist" element={guard(<WishlistPage />)} />
      <Route path="my-followed" element={guard(<MyFollowedPage />)} />

      {/* Cuenta */}
      <Route path="dashboard" element={guard(<Dashboard />)} />
      <Route path="profile" element={guard(<ProfilePage />)} />
      <Route path="settings" element={guard(<SettingsPage />)} />
      <Route path="settings/change-password" element={guard(<ChangePassword />)} />
      <Route path="settings/security" element={guard(<SecurityPage />)} />
      <Route path="settings/addresses" element={guard(<AddressesPage />)} />
      <Route path="settings/payment" element={guard(<PaymentMethodsPage />)} />
      <Route path="notifications" element={guard(<NotificationsPage />)} />
      <Route path="messages" element={guard(<ChatPage />)} />

      {/* Social — US-19 */}
      <Route path="seller/:username" element={<SellerProfile />} />

      {/* Admin (ROLE_ADMIN) — US-47 */}
      <Route path="admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

      <Route path="403" element={<ForbiddenPage />} />
      <Route path="*" element={<ComingSoon title="Página no encontrada" />} />
    </Route>
  )
);

function CatalogGameRoute() {
  const { game } = useParams();
  return <CatalogPage gameFromPath={decodeURIComponent(game || '')} />;
}
