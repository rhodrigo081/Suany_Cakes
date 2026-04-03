import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { AlertCircle } from "lucide-react";
import { dashboardService } from "@/services/admin/dashboard";

const lineChartConfig = {
    vendas: {
        label: "Vendas (R$)",
        color: "hsl(var(--primary))",
    },
};

function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
}

export const SalesChart = () => {
    const [salesData, setSalesData] = useState<{ day: string; vendas: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dashboardService
            .fetchDailySales()
            .then((raw) => {
                const formatted = raw.map((item) => ({
                    day: formatDate(item.date),
                    vendas: Number(item.value),
                }));
                setSalesData(formatted);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card className="h-120">
            <CardHeader>
                <CardTitle className="font-display text-2xl">Vendas do Último Mês</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
                {loading && (
                    <p className="text-sm text-muted-foreground">Carregando...</p>
                )}
                
                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}
                
                {!loading && !error && salesData.length === 0 && (
                    <p className="flex flex-col items-center justify-center h-64 font-medium text-destructive">
                                <AlertCircle size={32} className="mb-4"/>
                                Nenhuma venda encontrada.
                            </p>
                )}

                {!loading && !error && salesData.length > 0 && (
                    <ChartContainer config={lineChartConfig} className="w-full h-90">
                        <LineChart
                            data={salesData}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                        >
                            <CartesianGrid strokeDasharray="5 5" />
                            <XAxis dataKey="day" className="text-xs" />
                            <YAxis className="text-xs" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type="monotone"
                                dataKey="vendas"
                                stroke="hsl(var(--primary))"
                                strokeWidth={4}
                                dot={{ fill: "hsl(var(--primary))", r: 5 }}
                                activeDot={{ r: 10 }}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
};