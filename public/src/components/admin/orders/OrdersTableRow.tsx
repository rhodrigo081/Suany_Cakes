import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatters } from "@/utils/formatters";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, type Order } from '@/types/Order';

interface OrdersTableRowProps {
    order: Order;
    onSelect: (order: Order) => void;
}

export const OrdersTableRow = ({ order, onSelect }: OrdersTableRowProps) => {
    return (
        <TableRow className="cursor-pointer hover:bg-accent/20" onClick={() => onSelect(order)}>
            <TableCell>{formatters.formatOrderId(order.id)}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{formatters.formatDateSafe(order.createdAt)}</TableCell>
            <TableCell>
                {formatters.formatDateSafe(order.deliveryDate)}
            </TableCell>
            <TableCell>
                <Badge className={`${ORDER_STATUS_COLORS[order.status]}`}>
                    {ORDER_STATUS_LABELS[order.status]}
                </Badge>
            </TableCell>
            <TableCell className="font-bold text-lg text-primary">
                {formatters.formatCurrency(order.totalPrice)}
            </TableCell>
        </TableRow>
    );
};