import { CategoryChart } from "@/components/admin/CategoryChart"
import { SalesChart } from "@/components/admin/SalesChart"
import { StatsCard } from "@/components/admin/StatsCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Banknote, ClipboardList, Package, ShoppingCart } from "lucide-react"

export const AdminLayout = () => {
    return (
        <div>
            <div className="py-6 space-y-8">
                <h1 className="text-4xl font-display font-bold text-foreground">Painel Administrativo</h1>

                <div className="flex justify-betweena gap-4">
                    <Button variant={"secondary"} className="w-full text-2xl font-semibold py-6 group rounded-xl"> <Package size={32} className="stroke-[1.5px] text-primary group-hover:text-white" /> Gerenciar Produtos</Button>
                    <Button variant={"secondary"} className="w-full text-2xl font-semibold py-6 group rounded-xl"> <ClipboardList size={32} className="stroke-[1.5px] text-secondary group-hover:text-white" /> Gerenciar Pedidos</Button>
                </div>

                <div className="flex justify-between gap-4">
                    <StatsCard
                        title="Faturamento Bruto" value="R$ 4.000,00" percentage="+12% vs. mês anterior"
                        icon={<Banknote className="text-green" size={24} />} iconBgColor="bg-light-green/30"
                    />
                    <StatsCard
                        title="Ticket Médio" value="R$ 56,40" percentage="+2% vs. mês anterior"
                        icon={<ShoppingCart className="text-secondary" size={24} />} iconBgColor="bg-secondary/20"
                    />
                </div>

                <Tabs defaultValue="vendas">
                    <TabsList className="bg-card-background border border-border rounded-xl flex justify-center gap-2 px-60 w-full">
                        <TabsTrigger value="vendas">Vendas</TabsTrigger>
                        <TabsTrigger value="produtos">Produtos</TabsTrigger>
                        <TabsTrigger value="operacao">Operação</TabsTrigger>
                        <TabsTrigger value="clientes">Clientes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="vendas">
                        <div className="flex gap-4 mt-4">
                            <div className="w-2/3">
                                <SalesChart />
                            </div>
                            <div className="w-1/3">
                                <CategoryChart />
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}