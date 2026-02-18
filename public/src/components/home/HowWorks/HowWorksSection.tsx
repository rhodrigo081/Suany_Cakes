import { MessageCircle, Store, Truck } from "lucide-react";
import { HowWorksCard } from "./HowWorksCard";

export const HowWorksSection = () => {
    const steps = [
        {
            icon: <MessageCircle size={32} className="text-primary"/>,
            iconBgColor: "bg-primary/10",
            title: "1. Faça seu Pedido",
            description: "Monte seu carrinho e finalize via WhatsApp. Você será redirecionado para confirmar seu pedido."
        },
        {
            icon: <Store size={32} className="text-secondary"/>,
            iconBgColor: "bg-secondary/10",
            title: "2. Retirada na Loja",
            description: "Retire seu pedido em nossa loja no horário combinado. Produtos fresquinhos esperando por você!"
        },
        {
            icon: <Truck size={32} />,
            iconBgColor: "bg-accent/20",
            title: "3. Delivery",
            description: "Entregas são realizadas por terceiros. Consulte disponibilidade e taxas ao finalizar seu pedido."
        }
    ];

    return (
        <section className="relative flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-10">
                <h1 className="text-6xl font-bold text-center text-foreground">
                    Como Funciona
                </h1>

                <div className="grid grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <HowWorksCard
                            key={index}
                            {...step}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}