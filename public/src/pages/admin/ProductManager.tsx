import { ProducstTable } from "@/components/admin/products/ProducstTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wrapper } from "@/components/Wrapper"
import { MOCK_PRODUCTS } from "@/data/products"
import { Plus, Search, Undo2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export const ProductManager = () => {
    const [search, setSearch] = useState("");

    return (
        <Wrapper className="p-10 flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link to={"/dashboard"}>
                    <Button variant="secondary" buttonSize="icon" className="text-muted-foreground">
                        <Undo2 />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-serif font-semibold text-foreground">Gerenciar Produtos</h1>
                    <p className="text-muted-foreground text-sm">{MOCK_PRODUCTS.length} Produtos encontrados</p>
                </div>
            </div>
            <div className="bg-none w-full flex justify-between items-end">
                <Input icon={Search}
                    placeholder="Buscar Produto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button buttonSize="base">
                    <Plus />
                    Novo Produto
                </Button>
            </div>

            <ProducstTable
            products={MOCK_PRODUCTS}
            search={search}/>
        </Wrapper>
    )
}