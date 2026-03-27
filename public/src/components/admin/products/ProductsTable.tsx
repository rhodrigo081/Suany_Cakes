import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductsTableRow } from "./ProductsTableRow";
import type { Product } from "@/types/Product";
import { useMemo } from "react";

interface ProductsTableProps {
    products: Product[];
    search: string;
}

export const ProductsTable = ({ products, search }: ProductsTableProps) => {

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