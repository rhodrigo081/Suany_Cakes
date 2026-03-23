import { PieChart, Pie, Cell, } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const pieChartConfig = {
    doces: { label: 'Doces', color: 'hsl(340, 65%, 55%)' },
    salgados: { label: 'Salgados', color: 'hsl(45, 80%, 55%)' },
    bolos: { label: 'Bolos', color: 'hsl(200, 70%, 55%)' },
};

const categoryData = [
    { name: 'Doces', value: 3000, color: 'hsl(185, 100%, 41%)' },
    { name: 'Salgados', value: 6000, color: 'hsl(47, 41%, 59%)' },
    { name: 'Bolos', value: 1000, color: 'hsl(333, 64%, 48%)' },
];

export const CategoryChart = () => (
    <Card className="h-120">
        <CardHeader>
            <CardTitle className="font-display text-2xl">Vendas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={pieChartConfig} className="h-90">
                <PieChart>
                    <Pie
                        data={categoryData}
                        cx="40%"
                        cy="50%"
                        innerRadius={85}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                    />
                </PieChart>
            </ChartContainer>
        </CardContent>
    </Card>
);