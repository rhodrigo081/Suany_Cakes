import type { User } from "@/types/User";
import type { Product } from "@/types/Product";
import { api } from "../api";

class UserService {
  async toggleFavorite(productId: string | number): Promise<void> {
    await api.post(`/users/favorites/${productId}`);
  }

  async getFavorites(): Promise<Product[]> {
    const { data } = await api.get("/users/favorites");
    return data;
  }

  async updateProfile(user: Partial<User>): Promise<User> {
    const { data } = await api.put("/users/update", user);
    return data;
  }

  async deleteProfile(): Promise<User> {
    const { data } = await api.delete("/users/remove");
    return data;
  }
}

export const userService = new UserService();
