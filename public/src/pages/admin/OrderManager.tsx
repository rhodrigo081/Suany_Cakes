import { useState } from "react";
import { Search, Undo2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { ORDER_STATUS_LABELS, type Order, type OrderStatus } from "@/types/Order";
import { MOCK_ORDERS } from "@/data/orders";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datePicker";
import { OrderDetailsModal } from "@/components/admin/orders/OrderDetailModal";

export const OrderManager = () => {

    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);


    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();


    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };


    const handleStatusChange = (orderId: string, newStatus: string) => {

        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as OrderStatus } : o))
        );


        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus as OrderStatus });
        }

        console.log(`Status do pedido ${orderId} alterado para ${newStatus}`);
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setStartDate(undefined);
        setEndDate(undefined);
    };

    return (
        <div className="flex flex-col gap-8 p-8 w-full">
            <div className="flex items-center gap-4">
                <Link to={"/dashboard"}>
                    <Button variant="secondary" buttonSize="icon" className="text-muted-foreground">
                        <Undo2 className="h-6 w-6" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-serif font-semibold text-foreground">Gerenciar Pedidos</h1>
                    <p className="text-muted-foreground text-sm">{orders.length} Pedidos encontrados</p>
                </div>
            </div>

            <div className="bg-card-background p-6 rounded-xl border border-border shadow-sm">
                <div className="grid grid-cols-6 gap-6 items-end">
                    <div className="col-span-2">
                        <Input
                            label="Busca"
                            icon={Search}
                            placeholder="Nome do cliente ou Nº do pedido"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Status</label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Todos" />
                            </SelectTrigger>
                            <SelectContent className="bg-card-background">
                                <SelectItem value="all">Todos</SelectItem>
                                {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {ORDER_STATUS_LABELS[status]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Data Inicial</label>
                        <DatePicker
                            date={startDate}
                            onDateChange={setStartDate}
                            restriction="past-only"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">Data Final</label>
                        <DatePicker
                            date={endDate}
                            onDateChange={setEndDate}
                            restriction="past-only"
                        />
                    </div>

                    <Button buttonSize="base" onClick={clearFilters}>
                        <XCircle size={18} />
                        Limpar
                    </Button>
                </div>
            </div>

            <OrdersTable
                orders={MOCK_ORDERS}
                search={search}
                statusFilter={statusFilter}
                onSelectOrder={handleSelectOrder}
            />

            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};