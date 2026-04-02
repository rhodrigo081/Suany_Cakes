import { ProductsTable } from "@/components/admin/products/ProductsTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Wrapper } from "@/components/Wrapper"
import { adminProductsService } from "@/services/admin/products"
import { Plus, Search, Undo2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ProductManagerPage = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        adminProductsService.countAllProducts()
            .then((count) => {
                if (isMounted) setData(count);
            })
            .catch((err) => {
                if (isMounted) setError(err.message || "Erro ao carregar contagem");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    return (
        <Wrapper className="p-10 flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link to={"/dashboard"}>
                    <Button variant="secondary" buttonSize="icon" className="text-muted-foreground">
                        <Undo2 />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-4xl font-serif font-semibold text-foreground">Gerenciar Pedidos</h1>
                    <p className="text-muted-foreground text-sm">{loading ? (
                        "Carregando..."
                    ) : error ? (
                        <span className="text-destructive">{error}</span>
                    ) : (
                        data == 1 || data == 0 ? `${data} Produto encontrado` :
                            `${data} Produtos encontrados`
                    )}</p>
                </div>
            </div>
            <div className="bg-none w-full flex justify-between items-end">
                <Input icon={Search}
                    placeholder="Buscar Produto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Link to="/novo-produto">
                    <Button buttonSize="base">
                        <Plus />
                        Novo Produto
                    </Button>
                </Link>
            </div>

            <ProductsTable
                search={search} />
        </Wrapper>
    )
}