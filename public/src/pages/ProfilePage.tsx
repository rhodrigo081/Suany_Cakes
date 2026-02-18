import { AddressCard } from '@/components/profile/AddressCard';
import { Button } from '@/components/ui/button';
import { Wrapper } from '@/components/Wrapper';
import { useAddresses } from '@/contexts/AddressContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Phone, Mail, MapPin, Plus, Pencil, } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
};

export const ProfilePage = () => {
    const { user, logout } = useAuth();
    const { addresses } = useAddresses();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    const initials = (user.firstName[0] + (user.lastName?.[0] || "")).toUpperCase();

    return (
        <Wrapper className="py-12 px-40 flex flex-col gap-8 ">
            <section className="bg-card-background rounded-3xl overflow-hidden shadow-sm border border-border">
                <div className="h-32 w-full bg-gradient-to-r from-primary/40 to-secondary/40" />
                <div className="px-6 pb-6 relative">
                    <div className="flex flex-col md:flex-row md:items-end justify-between -mt-12 gap-4">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/100 to-secondary/100 flex items-center justify-center text-white text-6xl font-bold font-display">
                                    {initials}
                                </div>
                            </div>
                            <div className="text-center md:text-left pb-2">
                                <h1 className="text-3xl font-bold text-foreground font-display">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-sm text-accent-foreground">
                                    Cliente desde {formatDate(user.createdAt)}
                                </p>
                            </div>
                        </div>
                        <Link to="/editar-perfil">
                            <Button variant="secondary">
                                <Pencil size={16} />
                                Editar Perfil
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-card-background shadow-sm rounded-2xl px-4 pt-4 border border-border">
                <h2 className="text-2xl font-bold text-foreground font-display">Informações de Contato</h2>
                <div className="py-6 px-2 text-accent-foreground flex gap-2 items-center">
                    <Phone size={20} />
                    <p className=" font-medium">{user.phone || "Não informado"}</p>
                </div>
                <hr className="w-full" />
                <div className="py-6 px-2 text-accent-foreground flex gap-2 items-center">
                    <Mail size={20} />
                    <p className=" font-medium">{user.email}</p>
                </div>
            </section>

            <section className="bg-card-background rounded-3xl border border-border shadow-sm">
                <div className="p-5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <MapPin size={22} className="text-primary" />
                        <h2 className="text-xl font-bold text-foreground font-display">Meus Endereços</h2>
                    </div>
                    <Link to="/novo-endereco">
                        <Button buttonSize="sm">
                            <Plus size={16} /> Adicionar
                        </Button>
                    </Link>
                </div>
                <AddressCard addresses={addresses} />
            </section>

            <div className="flex justify-center pt-8">
                <Button
                    variant="destructive"
                    onClick={logout}
                    buttonSize="lg"
                    className='border  border-border rounded-xl hover:border-destructive transition-all duration-300'
                >
                    <LogOut size={20} />
                    Sair da Conta
                </Button>

            </div>
        </Wrapper>
    );
};