import type { Order } from "@/types/Order";
import { api } from "../api";

class AdminOrdersService {
  fetchAllOrders = async () => {
    try {
      const { data } = await api.get<Order[]>("/admin/orders");
      return data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  }


  countAllOrders = async () => {
    try {
      const { data } = await api.get<number>("/admin/count-all-orders");
      return data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  }
}

export const adminOrdersService = new AdminOrdersService();