import { BestSellingProduct } from "@/components/admin/BestSellingProduct"
import { CategoryChart } from "@/components/admin/CategoryChart"
import { CustomerRetention } from "@/components/admin/CustomerRetention"
import { LowOutputProduct } from "@/components/admin/LowOutputProduct"
import { MostRequestedNeighborhoods } from "@/components/admin/MostRequestedNeighborhoods"
import { OrdersStates } from "@/components/admin/OrdersStates"
import { SalesChart } from "@/components/admin/SalesChart"
import { SalesOrigin } from "@/components/admin/SalesOrigin"
import { Scheduling } from "@/components/admin/Scheduling"
import { StatsCard } from "@/components/admin/StatsCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Banknote, ClipboardList, Package, ShoppingCart } from "lucide-react"

export const AdminLayout = () => {
    return (
        <div>
            <div className="py-6 space-y-6">
                <h1 className="text-4xl font-display font-bold text-foreground">Painel Administrativo</h1>

                <div className="flex justify-betweena gap-4">
                    <Button variant={"secondary"} className="w-full text-2xl font-semibold py-6 group rounded-xl bg-card-background"> <Package size={32} className="stroke-[1.5px] text-primary group-hover:text-white" /> Gerenciar Produtos</Button>
                    <Button variant={"secondary"} className="w-full text-2xl font-semibold py-6 group rounded-xl bg-card-background"> <ClipboardList size={32} className="stroke-[1.5px] text-secondary group-hover:text-white" /> Gerenciar Pedidos</Button>
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

                <Tabs defaultValue="sales">
                    <TabsList className="bg-card-background border border-border rounded-xl flex justify-center gap-4 px-60 w-full mb-4">
                        <TabsTrigger value="sales">Vendas</TabsTrigger>
                        <TabsTrigger value="products">Produtos</TabsTrigger>
                        <TabsTrigger value="operations">Operação</TabsTrigger>
                        <TabsTrigger value="customers">Clientes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sales">
                        <div className="flex gap-4">
                            <div className="w-2/3">
                                <SalesChart />
                            </div>
                            <div className="w-1/3">
                                <CategoryChart />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="products" className="grid grid-cols-2 gap-6">
                                <BestSellingProduct />
                                <LowOutputProduct />
                    </TabsContent>
                    <TabsContent value="operations" className="grid grid-cols-2 gap-6">
                        <OrdersStates />
                        <Scheduling />
                    </TabsContent>
                    <TabsContent value="customers" className="grid grid-cols-3 gap-6">
                        <CustomerRetention />
                        <SalesOrigin />
                        <MostRequestedNeighborhoods />
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}