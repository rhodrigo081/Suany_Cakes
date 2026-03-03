import { api } from "./api";

class OrdersService {

    async getOrdersUser(){
        const {data} = await api.get("/orders/history")

        return data;
    }

}

export const ordersService = new OrdersService();