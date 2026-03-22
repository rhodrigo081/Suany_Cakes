import { addressService } from "@/services/address";
import { ordersService } from "@/services/orders";
import type { Address } from "@/types/Address";
import type { Order } from "@/types/Order";
import { createContext, useState, useCallback, type ReactNode } from "react";



interface OrderContextType {
    orders: Order[];
    addresses: Address[];
    selectedAddress: Address | null;
    isLoading: boolean;
    selectAddress: (address: Address) => void;
    fetchAddresses: () => Promise<void>;
    fetchOrders: () => Promise<void>;
    checkout: (deliveryDate?: Date) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAddresses = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await addressService.getAddresses();
            setAddresses(data);

            const primary = data.find((a: Address) => a.isPrimary);
            if (primary) setSelectedAddress(primary);
        } catch (error) {
            console.error("Erro ao buscar endereços:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await ordersService.getOrdersUser();
            setOrders(data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const selectAddress = (address: Address) => {
        setSelectedAddress(address);
    };

    const checkout = async (deliveryDate?: Date) => {
        if (!selectedAddress) {
            throw new Error("Selecione um endereço de entrega.");
        }

        try {
            setIsLoading(true);
            const order = await ordersService.checkout({
                addressId: selectedAddress.id,
                deliveryDate: deliveryDate?.toISOString(),
            });
            setOrders(prev => [order, ...prev]);
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OrderContext.Provider value={{
            orders,
            addresses,
            selectedAddress,
            isLoading,
            selectAddress,
            fetchAddresses,
            fetchOrders,
            checkout,
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext };