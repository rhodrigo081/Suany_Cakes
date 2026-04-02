import { api } from "../api";
import type { Order } from "@/types/Order";

interface OrderRequest {
  addressId: string;
  deliveryDate?: string;
}

class OrdersService {
  getOrdersUser = async () => {
    try {
      const { data } = await api.get<Order[]>("/orders/history");
      return data;
    } catch (error) {
      console.error("Erro ao buscar histórico de pedidos:", error);
      throw error;
    }
  }

  checkout = async (request: OrderRequest) => {
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
