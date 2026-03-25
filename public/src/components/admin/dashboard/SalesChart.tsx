import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const salesData = [
    { day: '01/01', vendas: 320 },
    { day: '05/01', vendas: 480 },
    { day: '08/01', vendas: 390 },
    { day: '10/01', vendas: 520 },
    { day: '12/01', vendas: 610 },
    { day: '15/01', vendas: 450 },
    { day: '17/01', vendas: 580 },
    { day: '19/01', vendas: 710 },
    { day: '21/01', vendas: 640 },
    { day: '23/01', vendas: 830 },
    { day: '25/01', vendas: 760 },
    { day: '27/01', vendas: 690 },
    { day: '30/01', vendas: 920 },
];

const lineChartConfig = {
    vendas: {
        label: 'Vendas (R$)',
        color: 'hsl(var(--primary))',
    },
};



export const SalesChart = () => {
    return (

        <Card className="h-120">
            <CardHeader>
                <CardTitle className="font-display text-2xl">Vendas do Último Mês</CardTitle>
            </CardHeader>
            <CardContent className='h-full'>
                <ChartContainer config={lineChartConfig} className="w-full h-90">
                    <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="5 5"/>
                        <XAxis dataKey="day" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="vendas"
                            stroke="hsl(var(--primary))"
                            strokeWidth={4}
                            dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                            activeDot={{ r: 10 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};