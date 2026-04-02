import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ORDER_STATUS_LABELS, type Order, type OrderStatusSlug} from "@/types/Order";
import { formatters } from "@/utils/formatters";
import { X } from "lucide-react";

interface OrderDetailsModalProps {
    order: Order | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onStatusChange: (orderId: number, newStatus: string) => void;
}

export const OrderDetailsModal = ({
    order,
    isOpen,
    onOpenChange,
    onStatusChange,
}: OrderDetailsModalProps) => {
    if (!order) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay className="z-50 bg-background/20 backdrop-blur-xs" />

                <DialogContent className="rounded-2xl p-6 min-w-lg">

                    <DialogTitle className="text-3xl font-serif font-semibold text-foreground">
                        Pedido {formatters.formatOrderId(order.id)}
                    </DialogTitle>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-4 mt-6">
                        <div>
                            <h4 className="text-lg font-medium text-foreground">Cliente</h4>
                            <p className="text-accent-foreground">{order.customerName}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-foreground">Data do Pedido</h4>
                            <p className="text-accent-foreground">
                                {
                                    formatters.formatDate(order.createdAt)
                                }</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-foreground">Data de Entrega</h4>
                            <p className="text-accent-foreground">{formatters.formatDate(order.deliveryDate)}</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-foreground">Status</h4>
                            <Select value={order.status} onValueChange={(value) => onStatusChange(order.id, value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={order.status} />
                                </SelectTrigger>
                                <SelectContent className="bg-card-background">
                                    {(Object.keys(ORDER_STATUS_LABELS) as OrderStatusSlug[]).map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {ORDER_STATUS_LABELS[status]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <hr className="my-4 border-t border-border" />

                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium">
                                    {item.quantity}x {item.productName}
                                </span>
                                <span className="font-bold text-foreground">
                                    {formatters.formatCurrency(item.unitPrice)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-8 border-t border-border flex justify-between items-center">
                        <span className="text-2xl font-bold text-muted-foreground">Total</span>
                        <span className="text-3xl font-bold text-primary">
                            {formatters.formatCurrency(order.totalPrice)}
                        </span>
                    </div>

                    <DialogClose>
                        <Button
                            variant="destructive"
                            className="absolute top-3 right-3"
                            buttonSize="destructive"
                        >
                            <X size={16} className="stroke-[4px]" />
                        </Button>
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};