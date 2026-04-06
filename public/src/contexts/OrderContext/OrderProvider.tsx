import { addressService } from "@/services/customer/address";
import { ordersService } from "@/services/customer/orders";
import type { Address } from "@/types/Address";
import type { Order } from "@/types/Order";
import { createContext, useState, useCallback, useMemo, type ReactNode } from "react";

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

            setSelectedAddress((prev) => {
                if (prev && data.some((a: Address) => a.id === prev.id)) return prev;

                const primary = data.find((a: Address) => a.isPrimary);
                if (primary) return primary;

                return data.length > 0 ? data[0] : null;
            });
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

    const selectAddress = useCallback((address: Address) => {
        setSelectedAddress(address);
    }, []);

    const checkout = useCallback(async (deliveryDate?: Date) => {
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
    }, [selectedAddress]);

    const contextValue = useMemo(() => ({
        orders,
        addresses,
        selectedAddress,
        isLoading,
        selectAddress,
        fetchAddresses,
        fetchOrders,
        checkout,
    }), [orders, addresses, selectedAddress, isLoading, selectAddress, fetchAddresses, fetchOrders, checkout]);

    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext };