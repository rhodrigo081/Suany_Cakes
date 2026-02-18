import { OrdersCards } from "@/components/orders/OrdersCard"
import { Wrapper } from "@/components/Wrapper"
import { useAuth } from "@/contexts/AuthContext"
import { MOCK_ORDERS } from "@/data/orders"
import { Box } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const OrderHistoryPage = () => {
    const orders = MOCK_ORDERS

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <Wrapper className="w-full flex flex-col justify-center px-40 items-start pt-20 gap-8">
            <h1 className="text-6xl font-bold mb-8 flex items-center gap-4">
                <Box size={60} className="text-primary stroke-[2px]" />
                Meus Pedidos
            </h1>
            <div className="flex flex-col w-full px-20">
                {orders.map((order) => (
                    <OrdersCards key={order.id} order={order} />
                ))}
            </div>
        </Wrapper>
    )
}