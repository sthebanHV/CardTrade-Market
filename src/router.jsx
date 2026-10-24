import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { App } from './App';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/cart/CheckoutPage';
import { CardList } from './components/cards/CardList';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<CardList />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Route>
  )
);
