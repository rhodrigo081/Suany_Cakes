import type { Order } from "@/types/Order";
import { api } from "../api";

export interface DashboardStatsDTO {
  totalRevenue: number;
  averageTicket: number;
}

export interface DailySalesDTO {
  date: string;
  value: number;
}

export interface CategorySalesDTO {
  category: string;
  value: number;
  percentage: number;
}

class DashBoardService {
  async fetchStats() {
    try {
      const { data } = await api.get<DashboardStatsDTO>("/admin/stats");
      return data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      throw error;
    }
  }

  async fetchDailySales() {
    try {
      const { data } = await api.get<DailySalesDTO[]>("/admin/dailysales");
      return data;
    } catch (error) {
      console.error("Erro ao buscar vendas diárias:", error);
      throw error;
    }
  }

  async fetchSalesByCategory() {
    try {
      const { data } = await api.get<CategorySalesDTO[]>(
        "/admin/salesByCategory",
      );
      return data;
    } catch (error) {
      console.error("Erro ao buscar vendas por categoria:", error);
      throw error;
    }
  }

  async fetchAllOrders() {
    try {
      const { data } = await api.get<Order[]>("/admin/orders");
      return data;
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      throw error;
    }
  }
}

export const dashboardService = new DashBoardService();
