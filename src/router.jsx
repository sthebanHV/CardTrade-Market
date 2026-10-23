import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { store } from './store';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { CartPage } from './components/cart/CartPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<h1>Inicio</h1>} />,
    <Route path="/login" element={<Login />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="/dashboard" element={<Dashboard />} />
  )
);