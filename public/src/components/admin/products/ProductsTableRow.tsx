import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { adminProductsService } from "@/services/admin/products";
import { CATEGORY_LABELS, type Product } from "@/types/Product"
import { formatters } from "@/utils/formatters";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductsTableRowProps {
    product: Product;
}

export const ProductsTableRow = ({ product }: ProductsTableRowProps) => {

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editar-produto/${product.id}`);
    };


    const handleDelete = async () => {
        if (confirm(`Tem certeza que deseja excluir "${product.name}"?`)) {
            try {
                await adminProductsService.productDelete(product.id);
                alert("Produto excluído com sucesso!");
                window.location.reload();
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
                alert("Erro ao excluir produto.");
            }
        }
    };

    return (
        <TableRow>
            <TableCell className="flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-md object-cover"
                />
            </TableCell>

            <TableCell className="font-medium text-xl">{product.name}</TableCell>

            <TableCell>
                <Badge variant="ghost" className="text-base">
                    {CATEGORY_LABELS[product.category]}
                </Badge>
            </TableCell>

            <TableCell className="text-primary text-2xl font-bold">
                {formatters.formatCurrency(product.price)}
            </TableCell>

            <TableCell>
                <Badge
                    className={`${product.isActive ? "bg-primary" : "bg-destructive"} text-base`}
                >
                    {product.isActive ? "Disponível" : "Indisponível"}
                </Badge>
            </TableCell>


            <TableCell>
                <div className="flex justify-center items-center gap-4">
                    <Button variant="ghost" buttonSize="icon" onClick={handleEdit}>
                        <Pencil />
                    </Button>
                    <Button variant="destructive" buttonSize="icon" onClick={handleDelete}>
                        <Trash2 />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}