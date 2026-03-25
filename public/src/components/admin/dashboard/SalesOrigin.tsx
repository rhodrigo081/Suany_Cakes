import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    pedidos: { label: 'Pedidos', color: 'hsl(var(--primary))' },
};

const originData = [
    { name: 'WhatsApp', pedidos: 68, color: 'hsl(142, 70%, 45%)' },
    { name: 'Instagram', pedidos: 45, color: 'hsl(340, 75%, 55%)' },
    { name: 'Acesso Direto', pedidos: 32, color: 'hsl(220, 70%, 55%)' },
    { name: 'Indicação', pedidos: 15, color: 'hsl(45, 80%, 50%)' },
];

export const SalesOrigin = () => {
    return (
        <Card className="h-120">
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Origem das Vendas
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} >
                    <BarChart data={originData} layout="vertical" margin={{ top: 20, right: 10, bottom: 0, left: 15 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" className="text-sm" />
                        <YAxis type="category" dataKey="name" className="text-sm" width={65} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="pedidos" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}