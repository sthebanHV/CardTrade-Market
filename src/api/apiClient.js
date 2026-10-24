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
  getAll: async (params) =>
    (await apiClient.get('/cards', { params: params || {} })).data,
  getById: async (id) => (await apiClient.get(`/cards/${encodeURIComponent(id)}`)).data,
  featured: async () => (await apiClient.get('/cards/featured')).data,
  recent: async () => (await apiClient.get('/cards/recent')).data,
  search: async (q) => (await apiClient.get('/cards/search', { params: { q } })).data,
  suggestions: async (q) => (await apiClient.get('/cards/suggestions', { params: { q } })).data,
  compare: async (ids) =>
    (await apiClient.get('/cards/compare', { params: { ids: ids.join(',') } })).data,
  offers: async () => (await apiClient.get('/cards/offers')).data,
  create: async (card, vendedorId) =>
    (await apiClient.post(`/cards?vendedorId=${encodeURIComponent(vendedorId)}`, card)).data,
};

export const platformAPI = {
  stats: async () => (await apiClient.get('/stats')).data,
  categories: async () => (await apiClient.get('/categories')).data,
};

export const usersAPI = {
  getDashboard: async (username) =>
    (await apiClient.get(`/users/dashboard/${encodeURIComponent(username)}`)).data,
  getProfile: async (username) =>
    (await apiClient.get(`/users/profile/${encodeURIComponent(username)}`)).data,
  getPublic: async (id) =>
    (await apiClient.get(`/users/public/${encodeURIComponent(id)}`)).data,
};

export const ordersAPI = {
  create: async (payload) => (await apiClient.post('/orders', payload)).data,
  getByUser: async (userId) =>
    (await apiClient.get(`/orders/user/${encodeURIComponent(userId)}`)).data,
};

export const fetchCards = () => cardsAPI.getAll();
