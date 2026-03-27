import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Loader2, Package } from "lucide-react";
import { OrdersTableRow } from "./OrdersTableRow";
import type { Order } from "@/types/Order";
import { dashboardService } from "@/services/admin/dashboard";

interface OrdersTableProps {
    orders: Order[];
    search: string;
    statusFilter: string;
    onSelectOrder: (order: Order) => void;
}

export const OrdersTable = ({ search, statusFilter, onSelectOrder }: OrdersTableProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        dashboardService.fetchAllOrders()
            .then((data) => {
                if (isMounted) setOrders(data);
            })
            .catch((err) => {
                if (isMounted) setError(err.message || "Erro ao carregar pedidos");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    const filteredOrders = useMemo(() => {
        const searchTerm = search.toLowerCase();

        return orders
            .filter((order) => {
                const matchesSearch = !searchTerm ||
                    order.customerName.toLowerCase().includes(searchTerm);
                const matchesStatus = statusFilter === "all" || order.status === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [orders, search, statusFilter]);

    if (loading) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Carregando pedidos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 flex-col items-center justify-center gap-2 text-destructive">
                <AlertCircle className="h-8 w-8" />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <Table className="bg-card-background">
            <TableHeader>
                <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Entrega</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredOrders.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-64 text-center">
                            <Package className="mx-auto mb-3 h-10 w-10 opacity-40" />
                            <p className="font-medium">Nenhum pedido encontrado</p>
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredOrders.map((order) => (
                        <OrdersTableRow
                            key={order.id}
                            order={order}
                            onSelect={onSelectOrder}
                        />
                    ))
                )}
            </TableBody>
        </Table>
    );
};