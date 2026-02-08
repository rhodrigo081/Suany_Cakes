import { Banknote, MapPin } from "lucide-react";
import { FaPix } from "react-icons/fa6";
import Logo from "@/assets/suany_carla_cake_logo.svg"
import { InfoCard } from '@/components/ui/infoCard';

export const AboutPage = () => {

    return (
        <div className="pb-20">
            <section className="relative bg-gradient-to-r from-background/100 via-primary/30 to-secondary/40 py-40 px-60 flex items-center justify-between overflow-hidden">
                <div className="text-center w-xl">
                    <h1 className="text-5xl font-semibold font-display text-foreground mb-6">Nossa História</h1>
                    <p className="text-2xl font-medium text-justify leading-relaxed ">
                        A Suany Cakes nasceu do amor pela confeitaria e do desejo de transformar momentos simples em memórias inesquecíveis.
                        Cada produto que sai da nossa cozinha carrega um pedacinho do nosso carinho e dedicação.
                    </p>
                </div>
                <img
                    src={Logo}
                    alt="Suany Carla"
                    className="w-100"
                />
            </section>

            <main className="pt-12 flex flex-col gap-8">
                <InfoCard title="Localização">
                    <p className="text-accent-foreground flex items-center gap-2">
                        <MapPin /> São Lourenço - PE
                    </p>
                </InfoCard>

                <InfoCard title="Formas de Pagamento">
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-accent-foreground">
                            <Banknote size={20} /> Dinheiro
                        </li>
                        <li className="flex items-center gap-3 text-accent-foreground">
                            <FaPix size={20} /> Pix
                        </li>
                    </ul>
                </InfoCard>
            </main>
        </div>
    );

}