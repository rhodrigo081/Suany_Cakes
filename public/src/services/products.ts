import { api } from "./api";

class ProductsService {
  async getAllProducts() {
    try {
      const { data } = await api.get("/products");
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }

  async getFeaturedProducts(){
    try {
      const { data } = await api.get("/products/featured");
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }

  async getProductByCategory(category: string){
    try {
      const { data } = await api.get(`/products/category/${category}`);
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }
}

export const productsService = new ProductsService();
