import { Banknote, MapPin } from "lucide-react";
import { FaPix } from "react-icons/fa6";
import Logo from "@/assets/suany_carla_cake_logo.svg"
import { InfoCard } from '@/components/ui/infoCard';
import { Wrapper } from "@/components/Wrapper";

export const AboutPage = () => {

    return (
        <Wrapper>
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

            <main className="pt-12 flex flex-col gap-8 px-60">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold">Localização</h1>
                    <InfoCard>
                        <p className="text-accent-foreground flex items-center gap-2">
                            <MapPin size={24}/> São Lourenço - PE
                        </p>
                    </InfoCard>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold">Formas de Pagamento</h1>
                    <InfoCard>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-3 text-accent-foreground">
                                <Banknote size={24} /> Dinheiro
                            </li>
                            <li className="flex items-center gap-3 text-accent-foreground">
                                <FaPix size={24} /> Pix
                            </li>
                        </ul>
                    </InfoCard>
                </div>
            </main>
        </Wrapper>
    );

}