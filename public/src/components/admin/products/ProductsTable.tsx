import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductsTableRow } from "./ProductsTableRow";
import type { Product } from "@/types/Product";
import { useEffect, useMemo, useState } from "react";
import { productsService } from "@/services/customer/products";
import { AlertCircle, Loader2 } from "lucide-react";

interface ProductsTableProps {
    search: string;
}

export const ProductsTable = ({ search }: ProductsTableProps) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filteredProducts = useMemo(() => {
        const searchTerm = search.toLowerCase();

        return products
            .filter((product) => {
                const matchesSearch = searchTerm
                    ? product.name.toLowerCase().includes(searchTerm)
                    : true;

                return matchesSearch;
            })
    }, [products, search]);

    useEffect(() => {
        let isMounted = true;

        productsService.getAllProducts()
            .then((data) => {
                if (isMounted) setProducts(data);
            })
            .catch((err) => {
                if (isMounted) setError(err.message || "Erro ao carregar produtos.");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    if (loading) {
        return (
            <div className="w-full flex h-64 flex-col items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Carregando pedidos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex h-64 flex-col items-center justify-center gap-2 text-destructive">
                <AlertCircle className="h-8 w-8" />
                <p>{error}</p>
            </div>
        );
    }



    return (
        <Table
            className="bg-card-background">
            <TableHeader>
                <TableRow>
                    <TableHead>Foto</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Excluir</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredProducts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            <p className="font-medium text-muted-foreground">Nenhum produto encontrado</p>
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductsTableRow key={product.id} product={product} />
                    ))
                )}
            </TableBody>
        </Table>
    )
}