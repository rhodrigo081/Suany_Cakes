import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { CATEGORY_LABELS, IS_ACTIVE_LABEL, type Product } from "@/types/Product"
import { formatters } from "@/utils/formatters";
import { Pencil, Trash2 } from "lucide-react";

interface ProductsTableRowProps {
    product: Product;
}

export const ProductsTableRow = ({ product }: ProductsTableRowProps) => {
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
                <Badge className="text-base">
                    {IS_ACTIVE_LABEL[product.isActive]}
                </Badge>
            </TableCell>


            <TableCell>
                <div className="flex justify-center items-center gap-4">
                    <Button variant="ghost" buttonSize="icon">
                        <Pencil />
                    </Button>
                    <Button variant="destructive" buttonSize="icon">
                        <Trash2 />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}