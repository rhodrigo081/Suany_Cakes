import { api } from "../api";

class AdminProductService {
  async countAllProducts() {
    try {
      const { data } = await api.get<number>("/admin/count-all-products");
      return data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  }
}

export const adminProductsService = new AdminProductService();
