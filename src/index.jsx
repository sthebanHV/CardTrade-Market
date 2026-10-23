import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <RouterProvider router={router} />
  </Router>
);