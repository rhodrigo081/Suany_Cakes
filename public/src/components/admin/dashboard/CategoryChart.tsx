import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/chart";
import { dashboardService, type CategorySalesDTO } from "@/services/admin/dashboard";
import { CATEGORY_LABELS, type CategorySlug } from "@/types/Product";

const CATEGORY_COLORS: Record<CategorySlug, string> = {
    CANDY: "hsl(185, 100%, 41%)",
    SAVORY: "hsl(47, 41%, 59%)",
    CAKE: "hsl(333, 64%, 48%)",
};

const pieChartConfig = {
    CANDY: { label: 'Doces', color: "hsl(185, 100%, 41%)" },
    SAVORY: { label: 'Salgados', color: "hsl(47, 41%, 59%)" },
    CAKE: { label: 'Bolos', color: "hsl(333, 64%, 48%)" },
};

export const CategoryChart = () => {
    const [data, setData] = useState<CategorySalesDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        dashboardService
            .fetchSalesByCategory()
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const chartData = data.map((item) => {
        const categoryKey = item.category.toUpperCase() as CategorySlug;
        return {
            category: categoryKey,
            name: categoryKey,
            displayName: CATEGORY_LABELS[categoryKey],
            value: Number(item.value),
            fill: CATEGORY_COLORS[categoryKey],
        };
    });

    return (
        <Card className="h-120 overflow-visible">
            <CardHeader>
                <CardTitle className="font-display text-2xl">Vendas por Categoria</CardTitle>
            </CardHeader>
            <CardContent className="overflow-visible">
                {!loading && !error && (
                    <ChartContainer config={pieChartConfig} className="h-90 w-full">
                        <PieChart margin={{ left: 40, right: 40 }}>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={85}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="value"
                                nameKey="name"
                                labelLine={true}
                                label={({ x, y, textAnchor, displayName, percent, fill }) => (
                                    <text
                                        x={x}
                                        y={y}
                                        fill={fill}
                                        textAnchor={textAnchor}
                                        dominantBaseline="central"
                                    >
                                        {`${displayName} ${(percent * 100).toFixed(0)}%`}
                                    </text>
                                )}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                                formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                            />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
};