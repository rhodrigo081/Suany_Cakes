import { api } from "../api";

interface AddressRequest {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood?: string;
  number?: number;
  complement?: string;
  isPrimary?: boolean;
}

class AddressService {
  async getAddresses() {
    try {
      const { data } = await api.get("/address");
      return data;
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
      throw error;
    }
  }

  async create(request: AddressRequest) {
    try {
      const { data } = await api.post("/address", request);
      return data;
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
      throw error;
    }
  }

  async update(id: string, request: AddressRequest) {
    try {
      const { data } = await api.put(`/address/${id}`, request);
      return data;
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      throw error;
    }
  }

  async setIsPrimary(id: string) {
    try {
      const { data } = await api.patch(`/address/${id}/primary`);
      return data;
    } catch (error) {
      console.error("Erro ao definir endereço principal:", error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await api.delete(`/address/${id}`);
    } catch (error) {
      console.error("Erro ao deletar endereço:", error);
      throw error;
    }
  }
}

export const addressService = new AddressService();
