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
    const { data } = await apiClient.post('/auth/login', {
      username,
      passwordHash: password,
    });
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
  forgotPassword: async (email) =>
    (await apiClient.post('/auth/forgot-password', { email })).data,
  resetPassword: async (token, password) =>
    (await apiClient.post('/auth/reset-password', { token, password })).data,
  changePassword: async (currentPassword, newPassword) =>
    (await apiClient.post('/auth/change-password', { currentPassword, newPassword })).data,
  verifyEmail: async (email) =>
    (await apiClient.post('/auth/verify-email', email ? { email } : {})).data,
  confirmVerifyEmail: async (token) =>
    (await apiClient.get(`/auth/verify-email/${encodeURIComponent(token)}`)).data,
  enable2fa: async () => (await apiClient.post('/auth/2fa/enable')).data,
  verify2fa: async (code, tmpToken) =>
    (await apiClient.post('/auth/2fa/verify', { code, ...(tmpToken ? { tmpToken } : {}) })).data,
  disable2fa: async (password) =>
    (await apiClient.post('/auth/2fa/disable', { password })).data,
  backupCodes: async () => (await apiClient.get('/auth/2fa/backup-codes')).data,
  logout: async () => (await apiClient.post('/auth/logout')).data,
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
  create: async (card) => (await apiClient.post('/cards', card)).data,
  update: async (id, data) =>
    (await apiClient.put(`/cards/${encodeURIComponent(id)}`, data)).data,
  remove: async (id) =>
    (await apiClient.delete(`/cards/${encodeURIComponent(id)}`)).data,
  setStatus: async (id, status) =>
    (await apiClient.patch(`/cards/${encodeURIComponent(id)}/status`, { status })).data,
  setPrice: async (id, price) =>
    (await apiClient.patch(`/cards/${encodeURIComponent(id)}/price`, { price })).data,
  markSold: async (id) =>
    (await apiClient.patch(`/cards/${encodeURIComponent(id)}/sold`)).data,
  myListings: async (status) =>
    (await apiClient.get('/cards/my-listings', { params: status ? { status } : {} })).data,
};

export const sellersAPI = {
  get: async (username) =>
    (await apiClient.get(`/sellers/${encodeURIComponent(username)}`)).data,
  listings: async (username) =>
    (await apiClient.get(`/sellers/${encodeURIComponent(username)}/listings`)).data,
  reviews: async (username) =>
    (await apiClient.get(`/sellers/${encodeURIComponent(username)}/reviews`)).data,
  follow: async (username) =>
    (await apiClient.post(`/sellers/${encodeURIComponent(username)}/follow`)).data,
  followed: async () => (await apiClient.get('/sellers/followed')).data,
};

export const reportsAPI = {
  create: async ({ cardId, motivo, detalles }) =>
    (await apiClient.post('/reports', { cardId, motivo, detalles })).data,
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
  getMyProfile: async () => (await apiClient.get('/users/profile')).data,
  updateProfile: async (payload) =>
    (await apiClient.put('/users/profile', payload)).data,
  uploadAvatar: async (dataUrl) =>
    (await apiClient.post('/users/profile/avatar', { dataUrl })).data,
  getChanges: async () => (await apiClient.get('/users/profile/changes')).data,
};

export const ordersAPI = {
  create: async (payload) => (await apiClient.post('/orders', payload)).data,
  getById: async (orderId) =>
    (await apiClient.get(`/orders/${encodeURIComponent(orderId)}`)).data,
  getByUser: async (userId) =>
    (await apiClient.get(`/orders/user/${encodeURIComponent(userId)}`)).data,
  purchases: async () => (await apiClient.get('/orders/purchases')).data,
  sales: async () => (await apiClient.get('/orders/sales')).data,
  salesSummary: async () => (await apiClient.get('/orders/sales/summary')).data,
  tracking: async (orderId) =>
    (await apiClient.get(`/orders/${encodeURIComponent(orderId)}/tracking`)).data,
  updateTracking: async (orderId, payload) =>
    (await apiClient.patch(`/orders/${encodeURIComponent(orderId)}/tracking`, payload)).data,
};

export const checkoutAPI = {
  guest: async (payload) =>
    (await apiClient.post('/checkout/guest', payload)).data,
};

export const addressesAPI = {
  list: async () => (await apiClient.get('/addresses')).data,
  create: async (addr) => (await apiClient.post('/addresses', addr)).data,
  update: async (id, addr) =>
    (await apiClient.put(`/addresses/${encodeURIComponent(id)}`, addr)).data,
  remove: async (id) =>
    (await apiClient.delete(`/addresses/${encodeURIComponent(id)}`)).data,
  setDefault: async (id) =>
    (await apiClient.patch(`/addresses/${encodeURIComponent(id)}/default`)).data,
};

export const paymentMethodsAPI = {
  list: async () => (await apiClient.get('/payment-methods')).data,
  create: async (pm) => (await apiClient.post('/payment-methods', pm)).data,
  remove: async (id) =>
    (await apiClient.delete(`/payment-methods/${encodeURIComponent(id)}`)).data,
  setDefault: async (id) =>
    (await apiClient.patch(`/payment-methods/${encodeURIComponent(id)}/default`)).data,
};

export const fetchCards = () => cardsAPI.getAll();

export const collectionAPI = {
  items: async (params = {}) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) q.set(k, v); });
    const s = q.toString();
    return (await apiClient.get(`/collection/me/items${s ? `?${s}` : ''}`)).data;
  },
  addItem: async (payload) => (await apiClient.post('/collection/me/items', payload)).data,
  updateItem: async (id, payload) =>
    (await apiClient.put(`/collection/items/${encodeURIComponent(id)}`, payload)).data,
  removeItem: async (id) =>
    (await apiClient.delete(`/collection/items/${encodeURIComponent(id)}`)).data,
  stats: async () => (await apiClient.get('/collection/stats')).data,
  exportUrl: `${API_BASE_URL}/collection/export?format=csv`,
  list: async () => (await apiClient.get('/collection/mine')).data,
  create: async (name, description) =>
    (await apiClient.post(`/collection?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description || '')}`)).data,
  update: async (id, name, description) =>
    (await apiClient.put(`/collection/${encodeURIComponent(id)}?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description || '')}`)).data,
  remove: async (id) => (await apiClient.delete(`/collection/${encodeURIComponent(id)}`)).data,
  addCard: async (id, cardId) =>
    (await apiClient.post(`/collection/${encodeURIComponent(id)}/cards`, { cardId })).data,
  removeCard: async (id, cardId) =>
    (await apiClient.delete(`/collection/${encodeURIComponent(id)}/cards/${encodeURIComponent(cardId)}`)).data,
};

export const priceAlertsAPI = {
  list: async () => (await apiClient.get('/price-alerts')).data,
  create: async (cardId, targetPrice) =>
    (await apiClient.post('/price-alerts', { cardId, targetPrice })).data,
  update: async (id, payload) =>
    (await apiClient.put(`/price-alerts/${encodeURIComponent(id)}`, payload)).data,
  remove: async (id) =>
    (await apiClient.delete(`/price-alerts/${encodeURIComponent(id)}`)).data,
};

export const notificationsAPI = {
  list: async () => (await apiClient.get('/notifications')).data,
  markRead: async (id) =>
    (await apiClient.patch(`/notifications/${encodeURIComponent(id)}/read`)).data,
  markAllRead: async () => (await apiClient.post('/notifications/read-all')).data,
};
