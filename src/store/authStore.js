import { create } from "zustand";

/**
 * Zustand store do zarządzania stanem uwierzytelnienia użytkownika
 * - isAuthenticated: boolean, czy użytkownik jest zalogowany
 * - email: string, email zalogowanego użytkownika
 * - setUser: funkcja do ustawiania danych użytkownika po zalogowaniu
 * - logout: funkcja do wylogowania użytkownika
 */
export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  email: null,

  setUser: (user) => set({ isAuthenticated: true, email: user.email }),

  logout: () => set({ isAuthenticated: false, email: null }),
}));
