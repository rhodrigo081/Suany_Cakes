import { products } from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatters } from "@/utils/formatters";

const lowProducts = [
    { id: '6', sold: 8, revenue: 56 },
    { id: '8', sold: 12, revenue: 48 },
    { id: '5', sold: 15, revenue: 45 },
];

const getProduct = (id: string) => products.find((p) => p.id === id);

export const LowOutputProduct = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-display text-2xl">
                    Produtos com Baixa Saída
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {lowProducts.map((item) => {
                    const product = getProduct(item.id);
                    if (!product) return null;
                    return (
                        <div key={item.id} className="flex items-center gap-3 rounded-lg border border-accent bg-accent/20 p-3">
                            <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                            <div className="flex-1 min-w-0">
                                <p className="truncate font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">Apenas {item.sold} un. vendidas</p>
                            </div>
                            <span className="text-xl font-bold text-accet">
                                {formatters.formatCurrency(item.revenue)}
                            </span>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    )
}