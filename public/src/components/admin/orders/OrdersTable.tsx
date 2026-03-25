import { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package } from "lucide-react";
import { OrdersTableRow } from "./OrdersTableRow";
import type { Order } from "@/types/Order";

interface OrdersTableProps {
    orders: Order[];
    search: string;
    statusFilter: string;
    onSelectOrder: (order: Order) => void;
}

export const OrdersTable = ({ orders, search, statusFilter, onSelectOrder }: OrdersTableProps) => {
    const filteredOrders = useMemo(() => {
        const searchTerm = search.toLowerCase();

        return orders
            .filter((order) => {
                const matchesSearch = searchTerm
                    ? order.customerName.toLowerCase().includes(searchTerm) ||
                    order.id.toLowerCase().includes(searchTerm)
                    : true;

                const matchesStatus = statusFilter !== "all" ? order.status === statusFilter : true;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
    }, [orders, search, statusFilter]);

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
                        <TableCell colSpan={7}>
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