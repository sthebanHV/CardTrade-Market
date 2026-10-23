import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStore } from 'zustand';

export { useStore };

export const store = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      cart: [],
      favorites: [],
      wishlist: [],

      login: (email, password) => {
        set({ user: { email }, token: 'fake-token' });
      },

      logout: () => {
        set({ user: null, token: null, cart: [] });
      },

      addToCart: (cardId, cardName, price) =>
        set((state) => {
          const exists = state.cart.some((item) => item.cardId === cardId);
          if (exists) return state;
          return { cart: [...state.cart, { cardId, cardName, price }] };
        }),

      removeFromCart: (cardId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cardId !== cardId),
        })),

      clearCart: () => set({ cart: [] }),

      addToFavorites: (cardId, cardName) =>
        set((state) => {
          const exists = state.favorites.some((item) => item.cardId === cardId);
          if (exists) return state;
          return { favorites: [...state.favorites, { cardId, cardName }] };
        }),

      removeFromFavorites: (cardId) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.cardId !== cardId),
        })),

      addToWishlist: (cardId, cardName) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.cardId === cardId);
          if (exists) return state;
          return { wishlist: [...state.wishlist, { cardId, cardName }] };
        }),

      removeFromWishlist: (cardId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.cardId !== cardId),
        })),

      getCartTotal: () =>
        set((state) =>
          state.cart.reduce(
            (total, item) => total + parseFloat(item.price || 0),
            0
          )
        ),
    }),
    { name: 'cardtrade-storage' }
  )
);