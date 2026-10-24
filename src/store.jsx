import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, setAuthToken } from './api/apiClient';

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      cart: [],
      favorites: [],
      wishlist: [],
      compare: [],
      unread: 0,
      toast: null,

      showToast: (toast) => set({ toast }),
      hideToast: () => set({ toast: null }),

      login: async (username, password) => {
        const res = await authAPI.login(username, password);
        if (res.tfaRequired) return res;
        const token = res.token || res;
        setAuthToken(token);
        set({ token });
        return { token };
      },

      complete2fa: async (code, tmpToken) => {
        const res = await authAPI.verify2fa(code, tmpToken);
        const token = res.token || res;
        setAuthToken(token);
        set({ token });
        return token;
      },

      register: async (payload) => {
        return await authAPI.register(payload);
      },

      setUser: (user) => set({ user }),

      setUnread: (unread) => set({ unread }),

      refreshUser: async () => {
        if (!get().token) return;
        try {
          const me = await authAPI.me();
          set({ user: me });
        } catch {
          get().logout();
        }
      },

      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null, cart: [], toast: { message: 'Sesión cerrada exitosamente', severity: 'success' } });
      },

      addToCart: (cardId, cardName, price) =>
        set((state) => {
          if (state.cart.some((item) => item.cardId === cardId)) return state;
          return { cart: [...state.cart, { cardId, cardName, price }] };
        }),

      removeFromCart: (cardId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cardId !== cardId),
        })),

      clearCart: () => set({ cart: [] }),

      addToFavorites: (cardId, cardName) =>
        set((state) => {
          if (state.favorites.some((item) => item.cardId === cardId)) return state;
          return { favorites: [...state.favorites, { cardId, cardName }] };
        }),

      removeFromFavorites: (cardId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.cardId !== cardId),
        })),

      addToWishlist: (cardId, cardName) =>
        set((state) => {
          if (state.wishlist.some((item) => item.cardId === cardId)) return state;
          return { wishlist: [...state.wishlist, { cardId, cardName }] };
        }),

      toggleCompare: (card) =>
        set((state) => {
          if (state.compare.some((c) => c.id === card.id)) {
            return { compare: state.compare.filter((c) => c.id !== card.id) };
          }
          if (state.compare.length >= 3) return state;
          return { compare: [...state.compare, { id: card.id, nombre: card.nombre }] };
        }),

      removeCompare: (cardId) =>
        set((state) => ({ compare: state.compare.filter((c) => c.id !== cardId) })),

      clearCompare: () => set({ compare: [] }),

      removeFromWishlist: (cardId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.cardId !== cardId),
        })),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
      },
    }),
    { name: 'cardtrade-storage' }
  )
);

const { token } = useStore.getState();
if (token) {
  setAuthToken(token);
  useStore.getState().refreshUser();
}
