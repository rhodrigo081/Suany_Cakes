import { useEffect, useState } from "react";
import { Search, Undo2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { ORDER_STATUS_LABELS, type Order, type OrderStatusSlug, } from "@/types/Order";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datePicker";
import { OrderDetailsModal } from "@/components/admin/orders/OrderDetailModal";
import { Wrapper } from "@/components/Wrapper";
import { adminOrdersService } from "@/services/admin/orders";

export const OrderManagerPage = () => {

    const [data, setData] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        let isMounted = true;

        adminOrdersService.countAllOrders()
            .then((count) => {
                if (isMounted) setData(count);
            })
            .catch((err) => {
                if (isMounted) setError(err.message || "Erro ao carregar contagem");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    const handleStatusChange = (orderId: number, newStatus: string) => {
        if (selectedOrder?.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus as OrderStatusSlug });
        }
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setStartDate(undefined);
        setEndDate(undefined);
    };

    return (
        <Wrapper className="p-10 flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link to={"/dashboard"}>
                    <Button variant="secondary" buttonSize="icon" className="text-muted-foreground">
                        <Undo2 />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-serif font-semibold text-foreground">Gerenciar Pedidos</h1>
                    <p className="text-muted-foreground text-sm">{loading ? (
                        "Carregando..."
                    ) : error ? (
                        <span className="text-destructive">{error}</span>
                    ) : (
                        data == 1 || data == 0 ? `${data} Pedido encontrado` :
                            `${data} Pedidos encontrados`
                    )}</p>
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
                                {(Object.keys(ORDER_STATUS_LABELS) as OrderStatusSlug[]).map((status) => (
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
        </Wrapper>
    );
};