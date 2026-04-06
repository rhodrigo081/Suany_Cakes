import { useEffect, useState } from "react";
import { XCircle, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS, type OrderStatusSlug } from "@/types/Order";
import { cn } from "@/lib/utils";
import { adminOrdersService, type DashboardStatusResponse } from "@/services/admin/orders";

export const OrdersStatus = () => {
  const [data, setData] = useState<DashboardStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await adminOrdersService.getOrdersStatusSummary();
        setData(response);
      } catch (error) {
        console.error("Falha ao carregar status dos pedidos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const statusOrder: OrderStatusSlug[] = [
    "PENDING",
    "IN_PRODUCTION",
    "FOR_DELIVERY",
    "FINISHED",
    "CANCELLED",
  ];

  const getCount = (status: OrderStatusSlug) => {
    return data?.statusList.find((s) => s.status === status)?.count || 0;
  };

  const hasNoOrders = !data || data.statusList.reduce((acc, curr) => acc + curr.count, 0) === 0;

  return (
    <Card className="h-120">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Status dos Pedidos</CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col h-[calc(100%-80px)] justify-center">
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground italic">Carregando status...</p>
          </div>
        )}

        {!loading && hasNoOrders && (
          <div className="flex flex-col items-center justify-center h-full font-medium text-destructive">
            <AlertCircle size={32} className="mb-4" />
            <p>Nenhum pedido encontrado.</p>
          </div>
        )}

        {!loading && !hasNoOrders && (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-8">
              {statusOrder.map((status) => (
                <div key={status} className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={cn("border-0 font-semibold px-4 py-1", ORDER_STATUS_COLORS[status])}
                  >
                    {ORDER_STATUS_LABELS[status]}
                  </Badge>
                  <span className="text-lg font-bold">
                    {getCount(status)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4 bg-destructive/10 border-destructive/50 mt-auto">
              <XCircle className="h-6 w-6 text-destructive" />
              <div className="leading-tight">
                <p className="text-lg font-medium text-destructive">Taxa de Cancelamento</p>
              </div>
              <span className="ml-auto text-xl font-bold text-destructive"> 
                {data?.cancellationRate.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}%
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};