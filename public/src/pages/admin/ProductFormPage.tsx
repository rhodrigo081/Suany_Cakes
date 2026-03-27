import { ProductForm } from "@/components/admin/products/ProductForm"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/Wrapper"
import { Undo2 } from "lucide-react"
import { Link } from "react-router-dom"

export const ProductFormPage = () => {
    return (
        <Wrapper className="p-10 flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link to={"/dashboard"}>
                    <Button variant="secondary" buttonSize="icon" className="text-muted-foreground">
                        <Undo2 className="h-6 w-6" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-serif font-semibold text-foreground">Novo Produto</h1>
                </div>
            </div>

            <ProductForm />
        </Wrapper>
    )
}