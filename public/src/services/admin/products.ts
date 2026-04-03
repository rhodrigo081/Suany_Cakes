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

export interface ProductRanking {
  name: string;
  image: string;
  totalQuantity: number;
  totalRevenue: number;
}

class AdminProductService {
  getAllProducts = async () => {
    try {
      const { data } = await api.get<Product[]>("/products");
      return data;
    } catch (error) {
      console.error("Erro ao buscar todos os produtos:", error);
      throw error;
    }
  };

  getById = async (id: string) => {
    try {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      throw error;
    }
  };

  countAllProducts = async () => {
    try {
      const { data } = await api.get<number>("/admin/count-all-products");
      return data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  };

  productCreate = async (productData: ProductRequest): Promise<Product> => {
    try {
      const { data } = await api.post<Product>("/products", productData);
      return data;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
  };

  productUpdate = async (
    id: string,
    productData: ProductRequest,
  ): Promise<Product> => {
    try {
      const { data } = await api.put<Product>(`/products/${id}`, productData);
      return data;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      throw error;
    }
  };

  productDelete = async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  };

  getTopSelling = async (): Promise<ProductRanking[]> => {
    try {
      const { data } = await api.get<ProductRanking[]>("/admin/products/top-selling");
      return data;
    } catch (error) {
      console.error("Erro ao buscar top produtos:", error);
      throw error;
    }
  };

  getLowSelling = async (): Promise<ProductRanking[]> => {
    try {
      const { data } = await api.get<ProductRanking[]>("/admin/products/low-selling");
      return data;
    } catch (error) {
      console.error("Erro ao buscar produtos com baixa saída:", error);
      throw error;
    }
  };
}

export const adminProductsService = new AdminProductService();
