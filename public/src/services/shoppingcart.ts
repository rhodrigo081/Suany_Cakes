import type { CartItemRequest, ShoppingCartResponse } from "@/types/ShoppingCart";
import { api } from "./api";

class CartService {
  async getCart() {
    try {
      const { data } = await api.get<ShoppingCartResponse>("/cart");
      return data;
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      throw error;
    }
  }

  async addItem(request: CartItemRequest) {
    try {
      const { data } = await api.post<ShoppingCartResponse>(
        "/cart/items",
        request,
      );
      return data;
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
      throw error;
    }
  }

  async updateItemQuantity(productId: string, quantity: number) {
    try {
      const { data } = await api.put<ShoppingCartResponse>(
        `/cart/items/${productId}`,
        { quantity },
      );
      return data;
    } catch (error) {
      console.error("Erro ao atualizar quantidade do item:", error);
      throw error;
    }
  }

  async removeItem(productId: string) {
    try {
      const { data } = await api.delete<ShoppingCartResponse>(
        `/cart/items/${productId}`,
      );
      return data;
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      throw error;
    }
  }

  async clearCart() {
    try {
      await api.delete("/cart");
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error);
      throw error;
    }
  }
}

export const cartService = new CartService();
