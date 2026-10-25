import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI, setAuthToken, favoritesAPI, wishlistAPI, notificationsAPI, chatAPI } from './api/apiClient';

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
        get().syncFromServer();
        return { token };
      },

      complete2fa: async (code, tmpToken) => {
        const res = await authAPI.verify2fa(code, tmpToken);
        const token = res.token || res;
        setAuthToken(token);
        set({ token });
        get().syncFromServer();
        return token;
      },

      register: async (payload) => {
        return await authAPI.register(payload);
      },

      setUser: (user) => set({ user }),

      setUnread: (unread) => set({ unread }),

      // US-41/42: sincroniza favoritos y deseos con el backend al iniciar sesión
      syncFromServer: async () => {
        if (!get().token) return;
        try {
          const [favs, wishes] = await Promise.all([favoritesAPI.list(), wishlistAPI.list()]);
          set({
            favorites: favs
              .filter((f) => f.card)
              .map((f) => ({ cardId: f.cardId, cardName: f.card.nombre })),
            wishlist: wishes
              .filter((w) => w.card)
              .map((w) => ({ cardId: w.cardId, cardName: w.card.nombre })),
          });
        } catch {
          /* sin conexión: se conserva el estado local */
        }
      },

      // US-45: no leídas (notificaciones + mensajes)
      refreshUnread: async () => {
        if (!get().token) {
          set({ unread: 0 });
          return;
        }
        try {
          const [notifs, chat] = await Promise.all([
            notificationsAPI.list(),
            chatAPI.unreadTotal().catch(() => ({ unread: 0 })),
          ]);
          const noLeidas = Array.isArray(notifs)
            ? notifs.filter((n) => !n.isRead && !n.read).length
            : 0;
          set({ unread: noLeidas + (chat.unread || 0) });
        } catch {
          /* noop */
        }
      },

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

      addToCart: (cardId, cardName, price, img) =>
        set((state) => {
          if (state.cart.some((item) => item.cardId === cardId)) return state;
          return {
            cart: [...state.cart, { cardId, cardName, price, img: img || null, addedAt: Date.now() }],
          };
        }),

      removeFromCart: (cardId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cardId !== cardId),
        })),

      clearCart: () => set({ cart: [] }),

      addToFavorites: (cardId, cardName) => {
        set((state) => {
          if (state.favorites.some((item) => item.cardId === cardId)) return state;
          return { favorites: [...state.favorites, { cardId, cardName }] };
        });
        if (get().token) favoritesAPI.add(cardId).catch(() => {});
      },

      removeFromFavorites: (cardId) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.cardId !== cardId),
        }));
        if (get().token) favoritesAPI.remove(cardId).catch(() => {});
      },

      addToWishlist: (cardId, cardName) => {
        set((state) => {
          if (state.wishlist.some((item) => item.cardId === cardId)) return state;
          return { wishlist: [...state.wishlist, { cardId, cardName }] };
        });
        if (get().token) wishlistAPI.create({ cardId }).catch(() => {});
      },

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

      removeFromWishlist: (cardId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.cardId !== cardId),
        }));
        if (get().token) wishlistAPI.removeByCard(cardId).catch(() => {});
      },

      getCartTotal: () => {
        const { cart } = get();
        return carritoVigente(cart).reduce((total, item) => total + parseFloat(item.price || 0), 0);
      },
    }),
    {
      name: 'cardtrade-storage',
      // US-23: el carrito expira a los 7 días
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.cart)) {
          const limpio = carritoVigente(state.cart);
          if (limpio.length !== state.cart.length) {
            useStore.setState({ cart: limpio });
          }
        }
      },
    }
  )
);

const DIAS_7 = 7 * 24 * 60 * 60 * 1000;

export function carritoVigente(cart) {
  return (cart || []).filter(
    (item) => !item.addedAt || Date.now() - item.addedAt < DIAS_7
  );
}

const { token } = useStore.getState();
if (token) {
  setAuthToken(token);
  useStore.getState().refreshUser();
  useStore.getState().syncFromServer();
}
