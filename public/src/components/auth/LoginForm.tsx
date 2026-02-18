import { Mail, Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    return (
        <div className="flex items-center justify-center pt-20">
            <div className="w-xl bg-card-background rounded-4xl border border-gray-100 shadow-sm p-8 md:p-12">

                <div className="text-center mb-8">
                    <h1 className="text-5xl font-display font-bold text-foreground">
                        Bem-vindo de volta!
                    </h1>
                    <p className="text-accent-foreground text-xl mt-1">
                        Entre na sua conta para continuar
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <Button variant="tertiary">
                        <FaGoogle size={20} /> Continuar com Google
                    </Button>
                    <Button variant="tertiary">
                        <FaFacebook size={20} /> Continuar com Facebook
                    </Button>
                    <Button variant="tertiary">
                        <FaApple size={20} /> Continuar com Apple
                    </Button>
                </div >

                <div className="flex items-center my-8">
                    <div className="flex-1 border-1 border-border"></div>
                    <span className="px-4 text-foreground text-sm">ou</span>
                    <div className="flex-1 border-1 border-border"></div>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                

                    <Input
                        label="E-mail"
                        type="email"
                        icon={Mail}
                        placeholder="seu@email.com"
                    />

                    <Input
                        label="Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                        rightElement={
                            <button type="button" className="text-xs text-primary hover:opacity-80 font-bold cursor-pointer hover:underline">
                                Esqueceu a senha?
                            </button>
                        }
                    />

                    <Button
                        type="submit"
                        className='w-full text-xl font-semibold rounded-xl py-6'
                    >
                        Entrar
                    </Button>
                </form>

                <p className="text-center mt-6 text-accent-foreground text-sm">
                    Não tem uma conta?{' '}
                    <Link to="/cadastro">
                        <button className="text-primary font-bold hover:underline cursor-pointer hover:opacity-80">
                            Criar conta
                        </button>
                    </Link>
                </p>
            </div >
        </div >
    );
};