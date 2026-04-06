import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { dashboardService, type CustomerRetentionDTO } from "@/services/admin/dashboard";


export const CustomerRetention = () => {
    const [retention, setRetention] = useState<CustomerRetentionDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await dashboardService.fetchCustomerRetention();
                setRetention(data);
            } catch (error) {
                console.error("Erro ao carregar dados de retenção", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const percentage = retention?.retentionPercentage ?? 0;

    const chartData = [
        { name: "Recurrent", value: percentage },
        { name: "Others", value: Math.max(0, 100 - percentage) },
    ];


    <span className="text-[42px] font-bold text-foreground">
        {loading ? "..." : `${percentage}%`}
    </span>

    const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))"];

    if (loading) {
        return (
            <Card className="h-120 flex items-center justify-center">
                <span className="text-muted-foreground">Carregando...</span>
            </Card>
        );
    }

    return (
        <Card className="h-120">
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Retenção dos Clientes
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center w-full">
                <div className="relative h-48 w-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[42px] font-bold text-foreground">
                            {retention?.retentionPercentage}%
                        </span>
                    </div>
                </div>

                <p className="text-accent-foreground text-sm text-center leading-tight max-w-[180px] mt-2">
                    dos clientes compraram mais de uma vez
                </p>

                <div className="w-full space-y-3 pt-6">
                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium text-base">Total de Clientes</span>
                        <span className="font-bold text-primary text-lg">
                            {retention?.totalCustomers}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium text-base">Clientes Recorrentes</span>
                        <span className="font-bold text-secondary text-lg">
                            {retention?.recurringCustomers}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium text-base">Novos Este Mês</span>
                        <span className="font-bold text-primary text-lg">
                            {retention?.newCustomersThisMonth}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};