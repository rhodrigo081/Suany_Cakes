import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { dashboardService, type NeighborhoodRankingDTO } from "@/services/admin/dashboard";

export const MostRequestedNeighborhoods = () => {
    const [neighborhoodData, setNeighborhoodData] = useState<NeighborhoodRankingDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await dashboardService.fetchNeighborhoodRanking();
                setNeighborhoodData(data);
            } catch (error) {
                console.error("Erro ao buscar ranking de bairros:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const maxPedidos = neighborhoodData.length > 0
        ? Math.max(...neighborhoodData.map((n) => n.orderCount))
        : 0;

    if (loading) {
        return (
            <Card className="h-120 flex items-center justify-center">
                <span className="text-muted-foreground">Carregando bairros...</span>
            </Card>
        );
    }

    return (
        <Card className="h-120 overflow-hidden">
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Bairros que Mais Pedem
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {neighborhoodData.map((n, i) => (
                    <div key={n.neighborhood} className="flex items-center gap-3">
                        <span className="w-5 text-sm font-medium text-muted-foreground">
                            {i + 1}.
                        </span>

                        <span className="w-28 truncate text-sm font-semibold text-foreground">
                            {n.neighborhood}
                        </span>

                        <div className="flex-1">
                            <Progress
                                value={(n.orderCount / maxPedidos) * 100}
                                className="h-2 bg-accent/20"
                            />
                        </div>

                        <span className="w-8 text-right text-sm font-bold text-foreground">
                            {n.orderCount}
                        </span>
                    </div>
                ))}

                {neighborhoodData.length === 0 && (
                    <p className="text-center text-muted-foreground py-10">
                        Nenhum dado de entrega encontrado.
                    </p>
                )}
            </CardContent>
        </Card>
    );
};