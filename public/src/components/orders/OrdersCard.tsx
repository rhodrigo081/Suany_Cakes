import { useState } from "react";
import { Box, ChevronDown, Calendar, ShoppingBag, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import type { Order } from "@/types/Order";
import type { Product } from "@/types/Product";
import { formatCurrency } from './../../utils/formatters';

interface OrderCardProps {
    order: Order;
}

export const OrdersCards = ({ order }: OrderCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const groupedItems = order.items.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, [] as Product[]);

    const getStatusConfig = (status: string) => {
        const s = status.toLowerCase();
        if (s.includes("entregue")) return "bg-green-100 text-green-700 hover:bg-green-100";
        if (s.includes("preparando")) return "bg-blue-100 text-blue-700 hover:bg-blue-100";
        if (s.includes("pendente")) return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
        if (s.includes("cancelado")) return "bg-red-100 text-red-700 hover:bg-red-100";
        return "bg-gray-100 text-gray-700";
    };

    const formattedDate = new Intl.DateTimeFormat('pt-BR').format(order.createdAt);
    const formattedTime = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(order.createdAt);

    return (
        <div
            className={cn(
                "mb-4 bg-card-background border border-border rounded-3xl transition-all duration-300 overflow-hidden hover:border-primary cursor-pointer",
                isOpen ? "shadow-md ring-1 ring-primary/20" : "shadow-sm"
            )}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div
                className="flex items-center justify-between p-5 hover:bg-card-background transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full shrink-0">
                        <Box className="text-primary" size={28} />
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-foreground font-display uppercase">
                            ORD - {order.id.slice(-6)}
                        </h3>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <Calendar size={14} />
                            <span>{formattedDate}, {formattedTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant="secondary" className={cn("border-none px-4 py-0.5 font-semibold", getStatusConfig(order.status))}>
                            {order.status}
                        </Badge>
                        <span className="text-2xl font-bold text-primary ">
                            R$ {order.totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <ChevronDown
                        className={cn("text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")}
                        size={24}
                    />
                </div>
            </div>
            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out border-t border-border bg-card-background",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    <div className="p-6 space-y-6 bg-background">
                        <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-lg text-foreground font-semibold font-display tracking-wider">
                                <ShoppingBag size={19} className="text-primary stroke-[2.5px]" />
                                Itens do Pedido
                            </h4>
                            <div className="px-6">
                                {groupedItems.map((item, index) => (
                                    <div key={item.id + index} className="flex justify-between items-center border-b border-border px-4 pb-2 last:border-0">
                                        <div className="flex flex-col gap-1 px-2 pt-2">
                                            <span className="text-base text-foreground font-medium leading-tight">
                                                {item.name}
                                            </span>
                                            <span className="text-sm text-accent-foreground">
                                                x{item.quantity} - {formatCurrency(item.price)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-lg text-foreground font-semibold font-display tracking-wider">
                                <MapPin size={19} className="text-primary stroke-[2.5px]" />
                                Endereço de Entrega
                            </h4>
                            <div className="pl-6">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {order.shippingAddress.street}, {order.shippingAddress.number} - {order.shippingAddress.neighborhood}
                                    <br />
                                    {order.shippingAddress.city}/{order.shippingAddress.state} - {order.shippingAddress.zipCode}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};