import type { User } from "@/types/User";
import type { LoginCredentials, RegisterData } from "@/zustand/Auth";
import { api } from "./api";

interface LoginResponse {
  token: string;
  user: User;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  }

  async register(userData: RegisterData) {
    const { data } = await api.post("/auth/register", userData);
    return data;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export const authService = new AuthService();
