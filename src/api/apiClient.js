import axios from 'axios';

const API_BASE_URL = 'https://cardtrademarket-backend.onrender.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const authAPI = {
  login: async (username, password) => {
    const { data } = await apiClient.post(
      '/auth/login',
      { username, passwordHash: password },
      { responseType: 'text' }
    );
    return data;
  },
  register: async ({ nombre, email, username, password }) => {
    const { data } = await apiClient.post('/auth/register', {
      nombre,
      email,
      username,
      passwordHash: password,
    });
    return data;
  },
  me: async () => (await apiClient.get('/auth/me')).data,
};

export const cardsAPI = {
  getAll: async () => (await apiClient.get('/cards')).data,
  create: async (card, vendedorId) =>
    (await apiClient.post(`/cards?vendedorId=${encodeURIComponent(vendedorId)}`, card)).data,
};

export const usersAPI = {
  getDashboard: async (username) =>
    (await apiClient.get(`/users/dashboard/${encodeURIComponent(username)}`)).data,
  getProfile: async (username) =>
    (await apiClient.get(`/users/profile/${encodeURIComponent(username)}`)).data,
};

export const ordersAPI = {
  create: async (payload) => (await apiClient.post('/orders', payload)).data,
  getByUser: async (userId) =>
    (await apiClient.get(`/orders/user/${encodeURIComponent(userId)}`)).data,
};

export const fetchCards = () => cardsAPI.getAll();
