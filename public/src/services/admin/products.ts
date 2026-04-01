import type { CategorySlug, Product } from "@/types/Product";
import { api } from "../api";

interface ProductRequest {
  name: string;
  description: string;
  price: number;      
  image: string;      
  category: CategorySlug;
  featured: boolean;
  ingredients: string[]; 
  isActive: boolean;
}

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

  productCreate = async (productData: ProductRequest): Promise<Product> => {
    try {

      const { data } = await api.post<Product>("/products", productData);
      return data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
};
}

export const adminProductsService = new AdminProductService();
