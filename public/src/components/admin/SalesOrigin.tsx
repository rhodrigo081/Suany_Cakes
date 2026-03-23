import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
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
    return (<Card className="h-120">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl">
                Origem das Vendas
            </CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="w-full">
                <BarChart data={originData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
                    <XAxis type="number" className="text-xs" />
                    <YAxis type="category" dataKey="name" className="text-xs" width={65} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="pedidos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>)
}