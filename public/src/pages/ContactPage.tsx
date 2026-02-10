import { Button } from '@/components/ui/button';
import { ContactCard } from '@/components/ui/contactCard';
import { MessageCircle, Phone, Instagram, Clock, MoveRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

export const ContactPage = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-display font-bold text-foreground mb-2">Entre em Contato</h2>
                <p className="text-accent-foreground text-base">Estamos aqui para atender você!</p>
            </div>

            <div className="flex justify-center items-center gap-8">

                <div className="space-y-6">
                    <ContactCard
                        title="WhatsApp"
                        icon={<MessageCircle className="text-primary" size={24} />}
                        iconBgColor="bg-primary/10"
                    >
                        <p>(81) 99999-9999</p>
                        <a href="#" className="text-pink-500 hover:underline inline-flex items-center gap-1 mt-1">
                            Enviar mensagem <MoveRight className="stroke-[1px]" />
                        </a>
                    </ContactCard>

                    <ContactCard
                        title="Telefone"
                        icon={<Phone className="text-secondary" size={24} />}
                        iconBgColor="bg-secondary/10"
                    >
                        <p>(81) 99999-9999</p>
                        <p className="text-sm">Atendemos de segunda a sábado</p>
                    </ContactCard>

                    <ContactCard
                        title="Instagram"
                        icon={<Instagram className="text-foreground" size={24} />}
                        iconBgColor="bg-accent/40"
                    >
                        <p>@suanycarlacake</p>
                        <a href="https://www.instagram.com/suanycarlacake/" className="text-pink-500 hover:underline inline-flex items-center gap-1 mt-1">
                            Seguir <MoveRight className="stroke-[1px]" />
                        </a>
                    </ContactCard>
                </div>

                <div className="space-y-6 flex flex-col">
                    <ContactCard
                        title="Horário de Funcionamento"
                        icon={<Clock className="text-primary" size={24} />}
                        iconBgColor="bg-primary/10"
                    >
                        <div className="grid grid-cols-2 mt-2">
                            <span>Segunda - Sexta</span> <span className="font-bold text-right text-black ml-24">8h - 18h</span>
                            <span>Sábado</span> <span className="font-bold text-right text-black ml-24">8h - 14h</span>
                            <span>Domingo</span> <span className="font-bold text-right text-black ml-24">Fechado</span>
                        </div>
                    </ContactCard>

                    <div className="bg-linear-140 from-primary to-secondary rounded-2xl p-8 text-center text-white shadow-lg">
                        <h3 className="text-2xl font-serif mb-2">Pronto para fazer seu pedido?</h3>
                        <p className="text-sm mb-6 opacity-90">
                            Entre em contato pelo WhatsApp para encomendas e informações.
                        </p>
                        <Button variant="secondary" className='w-1/2 bg-background text-accent-foreground'>
                            <FaWhatsapp size={20} />
                            Falar no Whatsapp
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
};