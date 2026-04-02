import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductsTableRow } from "./ProductsTableRow";
import type { Product } from "@/types/Product";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { adminProductsService } from "@/services/admin/products";

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

        adminProductsService.getAllProducts()
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
                <p className="text-muted-foreground">Carregando produtos...</p>
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
                    <TableHead>Ação</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredProducts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6}>
                            <p className="flex flex-col items-center justify-center h-64 font-medium text-destructive">
                                <AlertCircle size={32} className="mb-4"/>
                                Nenhum produto encontrado
                            </p>
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