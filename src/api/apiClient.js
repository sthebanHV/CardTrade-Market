import axios from 'axios';

// Configuración de la API - Usar la clave proporcionada
const API_BASE_URL = 'https://api.cardtrademarket.com/api';

// La clave tcg_live_1eeeba95f70c4eb26fc09db185e59ac28e64e7ae se usaría para
// autenticación con servicios externos o validación de licencia

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': 'Bearer tcg_live_1eeeba95f70c4eb26fc09db185e59ac28e64e7ae',
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