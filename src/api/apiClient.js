import axios from 'axios';

// Configuración de la API - Backend en Render
const API_BASE_URL = 'https://cardtrademarket-backend.onrender.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Función auxiliar para obtener tokens de sesión
export const obtenerTokenSesion = async () => {
  try {
    const response = await apiClient.post('/auth/session');
    return response.data.token;
  } catch (error) {
    console.error('Error al obtener token de sesión:', error);
    return null;
  }
};

// Función para verificar el estado de la API
export const verificarAPISalud = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Error al verificar API:', error);
    return false;
  }
};