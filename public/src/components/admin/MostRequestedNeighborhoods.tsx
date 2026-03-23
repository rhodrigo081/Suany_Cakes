import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress";

const neighborhoodData = [
    { name: 'Boa Viagem', pedidos: 42 },
    { name: 'Espinheiro', pedidos: 28 },
    { name: 'Casa Forte', pedidos: 22 },
    { name: 'Madalena', pedidos: 18 },
    { name: 'Aflitos', pedidos: 15 },
    { name: 'Graças', pedidos: 14 },
    { name: 'Derby', pedidos: 11 },
    { name: 'Torre', pedidos: 10 },
];

const maxPedidos = Math.max(...neighborhoodData.map((n) => n.pedidos));

export const MostRequestedNeighborhoods = () => {
    return (<Card className="h-120">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-xl">
                Bairros que Mais Pedem
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {neighborhoodData.map((n, i) => (
                <div key={n.name} className="flex items-center gap-2">
                    <span className="w-5 text-base text-muted-foreground">{i + 1}.</span>
                    <span className="w-24 truncate text-base">{n.name}</span>
                    <div className="flex-1">
                        <Progress value={(n.pedidos / maxPedidos) * 100} className="h-2" />
                    </div>
                    <span className="w-8 text-right text-base font-medium">{n.pedidos}</span>
                </div>
            ))}
        </CardContent>
    </Card>)
}