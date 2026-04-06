import { BestSellingProduct } from "@/components/admin/dashboard/BestSellingProduct"
import { CategoryChart } from "@/components/admin/dashboard/CategoryChart"
import { CustomerRetention } from "@/components/admin/dashboard/CustomerRetention"
import { LowOutputProduct } from "@/components/admin/dashboard/LowOutputProduct"
import { MostRequestedNeighborhoods } from "@/components/admin/dashboard/MostRequestedNeighborhoods"
import { OrdersStatus } from "@/components/admin/dashboard/OrdersStatus"
import { SalesChart } from "@/components/admin/dashboard/SalesChart"
import { Scheduling } from "@/components/admin/dashboard/Scheduling"
import { StatsCard } from "@/components/admin/StatsCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dashboardService, type DashboardStatsDTO } from "@/services/admin/dashboard"
import { formatters } from "@/utils/formatters"
import { Banknote, ClipboardList, Package, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const AdminLayout = () => {
    const [data, setData] = useState<DashboardStatsDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.fetchStats()
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);


    return (
        <div>
            <div className="py-6 space-y-6">
                <h1 className="text-4xl font-display font-bold text-foreground">Painel Administrativo</h1>

                <div className="flex justify-betweena gap-4">
                    <Link to={"/gerenciar-produtos"} className="w-full"><Button variant={"secondary"} className="w-full text-2xl font-semibold py-6 group rounded-xl bg-card-background"> <Package size={32} className="stroke-[1.5px] text-primary group-hover:text-white" /> Gerenciar Produtos</Button></Link>
                    <Link to={"/gerenciar-pedidos"} className="w-full"><Button variant={"secondary"} className="w-full text-2xl font-semibold py-6 group rounded-xl bg-card-background"> <ClipboardList size={32} className="stroke-[1.5px] text-secondary group-hover:text-white" /> Gerenciar Pedidos</Button></Link>
                </div>

                <div className="flex justify-between gap-4">
                    <StatsCard
                        title="Faturamento Bruto" value={loading ? "Carregando..." : error ? `${error}` : formatters.formatCurrency(data?.totalRevenue ?? 0)}
                        icon={<Banknote className="text-green" size={24} />} iconBgColor="bg-light-green/30"
                    />
                    <StatsCard
                        title="Ticket Médio" value={loading ? "Carregando..." : error ? `${error}` : formatters.formatCurrency(data?.averageTicket ?? 0)}
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
                        <OrdersStatus />
                        <Scheduling />
                    </TabsContent>
                    <TabsContent value="customers" className="grid grid-cols-2 gap-6">
                        <CustomerRetention />
                        <MostRequestedNeighborhoods />
                    </TabsContent>

                </Tabs>
            </div>
        </div >
    )
}