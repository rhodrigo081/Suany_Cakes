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

export interface CustomerRetentionDTO {
  totalCustomers: number;
  recurringCustomers: number;
  newCustomersThisMonth: number;
  retentionPercentage: number; 
}

export interface NeighborhoodRankingDTO {
  neighborhood: string;
  orderCount: number;
}

class DashBoardService {
  fetchStats = async () => {
    try {
      const { data } = await api.get<DashboardStatsDTO>("/admin/stats");
      return data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      throw error;
    }
  };

  fetchDailySales = async () => {
    try {
      const { data } = await api.get<DailySalesDTO[]>("/admin/dailysales");
      return data;
    } catch (error) {
      console.error("Erro ao buscar vendas diárias:", error);
      throw error;
    }
  };

  fetchSalesByCategory = async () => {
    try {
      const { data } = await api.get<CategorySalesDTO[]>(
        "/admin/salesByCategory",
      );
      return data;
    } catch (error) {
      console.error("Erro ao buscar vendas por categoria:", error);
      throw error;
    }
  };

  fetchCustomerRetention = async () => {
    try {
      const { data } = await api.get<CustomerRetentionDTO>(
        "/admin/customer-retention"
      );
      return data;
    } catch (error) {
      console.error("Erro ao buscar retenção de clientes:", error);
      throw error;
    }
  };

  fetchNeighborhoodRanking = async () => {
    try {
      const { data } = await api.get<NeighborhoodRankingDTO[]>(
        "/admin/neighborhood-ranking"
      );
      return data;
    } catch (error) {
      console.error("Erro ao buscar ranking de bairros:", error);
      throw error;
    }
  };
}

export const dashboardService = new DashBoardService();
