import { products } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatters } from "@/utils/formatters";

const topProducts = [
    { id: '3', sold: 47, revenue: 5640 },
    { id: '1', sold: 128, revenue: 832 },
    { id: '2', sold: 210, revenue: 630 },
    { id: '7', sold: 23, revenue: 2185 },
    { id: '4', sold: 95, revenue: 427.5 },
];

const getProduct = (id: string) => products.find((p) => p.id === id);

export const BestSellingProduct = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Top 5 Mais Vendidos
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {topProducts.map((item, i) => {
                    const product = getProduct(item.id);
                    if (!product) return null;
                    return (
                        <div key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                {i + 1}
                            </span>
                            <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                            <div className="flex-1 min-w-0">
                                <p className="truncate font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{item.sold} un. vendidas</p>
                            </div>
                            <span className="text-xl font-bold text-primary">
                                {formatters.formatCurrency(item.revenue)}
                            </span>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    )
}