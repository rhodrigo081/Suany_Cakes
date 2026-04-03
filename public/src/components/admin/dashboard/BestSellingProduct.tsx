import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatters } from "@/utils/formatters";
import { adminProductsService, type ProductRanking } from "@/services/admin/products";

export const BestSellingProduct = () => {
    const [products, setProducts] = useState<ProductRanking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminProductsService.getTopSelling()
            .then(setProducts)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-4">Carregando ranking...</div>;

    return (
        <Card className="h-120">
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Top 4 Mais Vendidos
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 h-90">
                {products.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-3 rounded-lg border p-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {i + 1}
                        </span>
                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover" />
                        <div className="flex-1 min-w-0">
                            <p className="truncate font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.totalQuantity} un. vendidas</p>
                        </div>
                        <span className="text-xl font-bold text-primary">
                            {formatters.formatCurrency(item.totalRevenue)}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};