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
  getAddresses = async () => {
    try {
      const { data } = await api.get("/address");
      return data;
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
      throw error;
    }
  }

  create = async (request: AddressRequest) => {
    try {
      const { data } = await api.post("/address", request);
      return data;
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
      throw error;
    }
  }

  update = async (id: string, request: AddressRequest) => {
    try {
      const { data } = await api.put(`/address/${id}`, request);
      return data;
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      throw error;
    }
  }

  setIsPrimary = async (id: string) => {
    try {
      const { data } = await api.patch(`/address/${id}/primary`);
      return data;
    } catch (error) {
      console.error("Erro ao definir endereço principal:", error);
      throw error;
    }
  }

  delete = async (id: string) => {
    try {
      await api.delete(`/address/${id}`);
    } catch (error) {
      console.error("Erro ao deletar endereço:", error);
      throw error;
    }
  }
}

export const addressService = new AddressService();
