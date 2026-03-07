import { addressService } from "@/services/address";
import { ordersService } from "@/services/orders";
import { createContext, useState, useCallback, type ReactNode } from "react";

interface AddressResponse {
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood: string;
    number: number;
    complement?: string;
    isPrimary: boolean;
}

interface OrderItemResponse {
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

interface OrderResponse {
    id: string;
    orderStatus: string;
    createdAt: string;
    totalPrice: number;
    shippingAddress: AddressResponse;
    items: OrderItemResponse[];
}

interface OrderContextType {
    orders: OrderResponse[];
    addresses: AddressResponse[];
    selectedAddress: AddressResponse | null;
    isLoading: boolean;
    selectAddress: (address: AddressResponse) => void;
    fetchAddresses: () => Promise<void>;
    fetchOrders: () => Promise<void>;
    checkout: (deliveryDate?: Date) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAddresses = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await addressService.getAddresses();
            setAddresses(data);

            const primary = data.find((a: AddressResponse) => a.isPrimary);
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

    const selectAddress = (address: AddressResponse) => {
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