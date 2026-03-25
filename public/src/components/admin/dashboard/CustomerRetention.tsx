import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"

export const CustomerRetention = () => {

    const data = [
        { name: "Recurrent", value: 51 },
        { name: "Others", value: 49 },
    ];


    const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))"];
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
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                                startAngle={-90}
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[42px] font-bold text-foreground">51%</span>
                    </div>
                </div>

                <p className="text-accent-foreground text-sm text-center leading-tight">
                    dos clientes compraram mais de uma vez
                </p>

                <div className="w-full space-y-3 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-semibold text-base">Total de Clientes</span>
                        <span className="font-bold text-primary text-lg">58</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-semibold text-base">Clientes Recorrentes</span>
                        <span className="font-bold text-secondary text-lg">47</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-foreground font-semibold text-base">Novos Este Mês</span>
                        <span className="font-bold text-primary text-lg">11</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}