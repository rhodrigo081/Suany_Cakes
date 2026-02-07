import heroImage from "@/assets/hero_block_pic.svg"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { GradientText } from "../ui/gradientText"

export const HeroSection = () => {

    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 w-full">
                <img src={heroImage} className="w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/100 via-background/60 to-background/5"></div>
            </div>

            <div className="container relative py-75 px-40 flex flex-col justify-center">
                <div className="max-w-wxl animate-fade-up space-y-6">
                    <h1 className="text-6xl font-bold leading-tight tracking-tight">
                        Doces & Salgados
                        <br />
                        <GradientText colors={["#00C0D1", "#C72C71"]} animationSpeed={5} showBorder={false} direction="horizontal" yoyo={true}>Artesanais</GradientText>
                    </h1>
                    <p className="text-xl/6 text-muted-foreground w-xl">
                        Transformamos ingredientes de qualidade em momentos inesquecíveis.
                        Encomende agora e adoce o seu dia.
                    </p>
                </div>

                <div className="flex gap-4 pt-4">
                    <Link to="/catalogo">
                        <Button buttonSize="lg" className="group w-full gap-2 sm:w-auto">
                            Ver Catálogo
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link to="/contato">
                        <Button buttonSize="lg" variant="secondary" className="w-full sm:w-auto">
                            Fale Conosco
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )

}