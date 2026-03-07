import { api } from "./api";
import type { Order } from "@/types/Order";

interface OrderRequest {
  addressId: string;
  deliveryDate?: string;
}

class OrdersService {
  async getOrdersUser() {
    try {
      const { data } = await api.get<Order[]>("/orders/history");
      return data;
    } catch (error) {
      console.error("Erro ao buscar histórico de pedidos:", error);
      throw error;
    }
  }

  async checkout(request: OrderRequest) {
    try {
      const { data } = await api.post<Order>("/orders", request);
      return data;
    } catch (error) {
      console.error("Erro ao realizar pedido:", error);
      throw error;
    }
  }
}

export const ordersService = new OrdersService();
