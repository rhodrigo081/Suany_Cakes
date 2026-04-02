import type { User } from "@/types/User";
import type { Product } from "@/types/Product";
import { api } from "../api";

class UserService {
  toggleFavorite = (productId: string | number): Promise<void> => {
    return api.post(`/users/favorites/${productId}`);
  }

  getFavorites = async (): Promise<Product[]> => {
    const { data } = await api.get("/users/favorites");
    return data;
  }

  updateProfile = async (user: Partial<User>): Promise<User> => {
    const { data } = await api.put("/users/update", user);
    return data;
  }

  deleteProfile = async (): Promise<User> => {
    const { data } = await api.delete("/users/remove");
    return data;
  }
}

export const userService = new UserService();
