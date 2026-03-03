import { NoneOrders } from "@/components/orders/NoneOrders"
import { OrdersCards } from "@/components/orders/OrdersCard"
import { Wrapper } from "@/components/Wrapper"
import { useAuth } from "@/contexts/AuthContext/useAuth"
import { ordersService } from "@/services/orders"
import type { Order } from "@/types/Order"
import { LoaderCircle, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const OrderHistoryPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await ordersService.getOrdersUser();
                setOrders(data);
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    if (loading) {
        return <div className="flex justify-center p-10"><LoaderCircle className="animate-spin" /></div>;
    }

    return (
        <Wrapper className="w-full flex flex-col justify-center px-40 items-center pt-10 gap-8">
            {orders.length > 0 ? (
                <div>
                    <h1 className="text-6xl font-bold mb-8 flex items-center gap-4">
                        <Package size={60} className="text-primary stroke-[2px]" />
                        Meus Pedidos
                    </h1>
                    <div className="flex flex-col w-full px-20">
                        {orders.map((order) => (
                            <OrdersCards key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            ) : (
                <NoneOrders />
            )}
        </Wrapper>
    )
}