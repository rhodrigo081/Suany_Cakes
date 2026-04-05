import type { Order } from "@/types/Order";
import { api } from "../api";

export interface OrderStatusCount {
  status: string;
  count: number;
}

export interface DashboardStatusResponse {
  statusList: OrderStatusCount[];
  cancellationRate: number;
}

export interface OrderScheduleCount {
  date: string; 
  count: number;
}

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

  updateOrderStatus = async (orderId: number, status: string) => {
    try {
      const { data } = await api.patch<Order>(`/orders/${orderId}/status`, {
        status: status
      });
      return data;
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
      throw error;
    }
  }


  getOrdersStatusSummary = async (): Promise<DashboardStatusResponse> => {
    try {
      const { data } = await api.get<DashboardStatusResponse>("/admin/orders/status-summary");
      return data;
    } catch (error) {
      console.error("Erro ao buscar resumo de status:", error);
      throw error;
    }
  }

  getWeeklySchedules = async (): Promise<OrderScheduleCount[]> => {
    try {
      const { data } = await api.get<OrderScheduleCount[]>("/admin/orders/weekly-schedules");
      return data;
    } catch (error) {
      console.error("Erro ao buscar agendamentos semanais:", error);
      throw error;
    }
  }
}

export const adminOrdersService = new AdminOrdersService();