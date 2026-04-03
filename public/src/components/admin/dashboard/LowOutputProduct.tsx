import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatters } from "@/utils/formatters";
import { adminProductsService, type ProductRanking } from "@/services/admin/products";

export const LowOutputProduct = () => {
    const [products, setProducts] = useState<ProductRanking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminProductsService.getLowSelling()
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card className="h-120">
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Produtos com Baixa Saída
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 h-90 flex flex-col justify-center">
                {loading && (
                    <p className="text-sm text-muted-foreground text-center italic">
                        Carregando produtos...
                    </p>
                )}

                {!loading && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full font-medium text-destructive text-center">
                        <AlertCircle size={32} className="mb-4" />
                        <p>Nenhum produto encontrado.</p>
                    </div>
                )}

                {!loading && products.length > 0 && (
                    <div className="space-y-3 overflow-y-auto pr-2">
                        {products.map((item) => (
                            <div key={item.name} className="flex items-center gap-3 rounded-lg border border-accent bg-accent/20 p-3">
                                <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="truncate font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">Apenas {item.totalQuantity} un. vendidas</p>
                                </div>
                                <span className="text-xl font-bold text-accent">
                                    {formatters.formatCurrency(item.totalRevenue)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};