import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/customer/auth";
import type { User } from "@/types/User";
import type { Product } from "@/types/Product";
import { userService } from "@/services/customer/user";
import { api } from "@/services/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone: string;
  confirmPass: string;
}
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  setSession: (token: string, user: User) => void;
  logout: () => void;
  favorites: Product[];
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (product: Product) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      favorites: [],

      fetchFavorites: async () => {
        try {
          const favs = await userService.getFavorites();
          set({ favorites: favs });
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
        }
      },

      toggleFavorite: async (product: Product) => {
        try {
          await userService.toggleFavorite(product.id);
          const currentFavs = get().favorites;

          const isFavorite = currentFavs.some(
            (f) => String(f.id) === String(product.id),
          );

          if (isFavorite) {
            set({
              favorites: currentFavs.filter(
                (f) => String(f.id) !== String(product.id),
              ),
            });
          } else {
            set({ favorites: [...currentFavs, product] });
          }
        } catch (error) {
          console.error("Erro ao favoritar:", error);
        }
      },

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: !!response.token,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          await authService.register(userData);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setSession: (token: string, user: User) => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateUser: async (data: Partial<User>) => {
        set({ isLoading: true });
        try {
          const updatedUser = await userService.updateProfile(data);

          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, favorites: [] });
        localStorage.removeItem("@SuanyCakes:token");
      },
    }),
    { name: "@SuanyCakes:token" },
  ),
);
