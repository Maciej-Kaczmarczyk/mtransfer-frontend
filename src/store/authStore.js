import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  email: null,

  setUser: (user) => set({ isAuthenticated: true, email: user.email }),

  logout: () => set({ isAuthenticated: false, email: null }),
}));
