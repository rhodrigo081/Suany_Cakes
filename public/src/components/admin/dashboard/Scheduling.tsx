import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { Loader2, AlertCircle } from "lucide-react";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { adminOrdersService, type OrderScheduleCount } from "@/services/admin/orders";

export const Scheduling = () => {
  const [schedules, setSchedules] = useState<OrderScheduleCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await adminOrdersService.getWeeklySchedules();
        setSchedules(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const formatDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return "Hoje";
    if (isTomorrow(date)) return "Amanhã";
    
    const label = format(date, "EEE, dd/MM", { locale: ptBR });
    return label.charAt(0).toUpperCase() + label.slice(1).replace(".", "");
  };

  const totalOrders = schedules.reduce((acc, curr) => acc + curr.count, 0);
  const maxCount = schedules.length > 0 
    ? Math.max(...schedules.map((d) => d.count)) 
    : 0;

  return (
    <Card className="h-120">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-2xl">
          Agendamentos
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col h-[calc(100%-80px)] justify-center">
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground italic">Carregando agendamentos...</p>
          </div>
        )}

        {!loading && totalOrders === 0 && (
          <div className="flex flex-col items-center justify-center h-full font-medium text-destructive">
            <AlertCircle size={32} className="mb-4" />
            <p>Nenhum agendamento para esta semana.</p>
          </div>
        )}

        {!loading && totalOrders > 0 && (
          <div className="flex flex-col h-full gap-4 justify-between">
            <div className="flex-1 space-y-4">
              {schedules.map((day) => (
                <div key={day.date} className="flex items-center gap-3">
                  <span className="w-28 text-base font-medium">
                    {formatDateLabel(day.date)}
                  </span>
                  <div className="flex-1">
                    <Progress 
                      value={maxCount > 0 ? (day.count / maxCount) * 100 : 0} 
                      className="h-3" 
                    />
                  </div>
                  <span className="w-10 text-right text-base font-bold">
                    {day.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border border-border p-6 rounded-xl mt-auto bg-muted/20">
              <h1 className="text-4xl font-inter font-semibold">Total:</h1>
              <h1 className="text-4xl font-inter font-semibold text-primary">
                {totalOrders}
              </h1>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};