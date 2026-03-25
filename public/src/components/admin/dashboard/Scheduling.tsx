import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Progress } from "../../ui/progress";

const upcomingOrders = [
    { date: 'Hoje', count: 3 },
    { date: 'Amanhã', count: 5 },
    { date: 'Qua, 12/02', count: 2 },
    { date: 'Qui, 13/02', count: 4 },
    { date: 'Sex, 14/02', count: 8 },
    { date: 'Sáb, 15/02', count: 12 },
    { date: 'Dom, 16/02', count: 6 },
];

const maxCount = Math.max(...upcomingOrders.map((d) => d.count));

export const Scheduling = () => {
    return (
        <Card className="h-120">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-2xl">
                    Agendamentos
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {upcomingOrders.map((day) => (
                    <div key={day.date} className="flex items-center gap-3">
                        <span className="w-24 text-base font-medium">{day.date}</span>
                        <div className="flex-1">
                            <Progress value={(day.count / maxCount) * 100} className="h-3" />
                        </div>
                        <span className="w-10 text-right text-base font-bold">{day.count}</span>
                    </div>
                ))}
                <div className="flex justify-between border border-border p-6 rounded-xl">
                    <h1 className="text-4xl font-inter font-semibold">Total: </h1>
                    <h1 className="text-4xl font-inter font-semibold text-primary">{maxCount}</h1>
                </div>
            </CardContent>
        </Card>
    )
}