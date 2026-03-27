import { XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_ORDERS } from "@/data/orders";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, type OrderStatusSlug } from "@/types/Order";
import { cn } from "@/lib/utils";

export const OrdersStates = () => {
  const statusCounts = MOCK_ORDERS.reduce((acc, order) => {
    const s = order.status as OrderStatusSlug;
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatusSlug, number>);

  const statusOrder: OrderStatusSlug[] = ["PENDING", "IN_PRODUCTION", "FOR_DELIVERY", "FINISHED", "CANCELLED"];

  return (
    <Card className="h-120">
      <CardHeader>
        <CardTitle className="font-display text-2xl">
          Status dos Pedidos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {statusOrder.map((status) => (
          <div key={status} className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className={cn("border-0 font-semibold", ORDER_STATUS_COLORS[status])}
            >
              {ORDER_STATUS_LABELS[status]}
            </Badge>
            <span className="text-lg font-bold">
              {statusCounts[status] || 0}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-3 rounded-lg border p-3 bg-destructive/20 border-red-400">
          <XCircle className="h-8 w-8 text-red-400" />
          <div className="leading-tight">
            <p className="text-xl font-medium text-red-400">Taxa de Cancelamento</p>
          </div>
          <span className="ml-auto text- font-bold text-red-400">3,2%</span>
        </div>
      </CardContent>
    </Card>
  );
};