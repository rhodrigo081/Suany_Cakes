import { Mail, Lock, User, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const RegisterForm = () => {

    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <div className="flex items-center justify-center pt-20">
            <div className="w-xl bg-card-background rounded-4xl border border-gray-100 shadow-sm p-8 md:p-12">

                <div className="text-center mb-8">
                    <h1 className="text-5xl font-display font-bold text-foreground">
                        Criar Conta
                    </h1>
                    <p className="text-accent-foreground text-xl mt-1">
                        Junte-se a Suany <span className='text-primary'>Cakes</span>
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
                        label="Nome"
                        type="text"
                        icon={User}
                        placeholder="Seu nome"
                    />

                    <Input
                        label="Sobrenome"
                        type="text"
                        icon={User}
                        placeholder="Seu sobrenome"
                    />

                    <Input
                        label="E-mail"
                        type="email"
                        icon={Mail}
                        placeholder="seu@email.com"
                    />

                    <Input
                        label="Telefone"
                        type="tel"
                        icon={Phone}
                        placeholder="(00) 00000-0000"
                    />

                    <Input
                        label="Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                    />

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                    />

                    <div className="flex items-start gap-3 py-2">
                        <label className="relative flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                            />

                            <div className="w-6 h-6 border-2 border-primary rounded-full transition-all 
            peer-checked:bg-primary peer-checked:border-primary 
            flex items-center justify-center">

                                <svg
                                    className={`w-3.5 h-3.5 text-white transition-opacity ${isAgreed ? 'opacity-100' : 'opacity-0'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={4}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </label>

                        <span className="text-base text-accent-foreground">
                            Eu concordo com os{' '}
                            <Link to="/termos" className="text-primary font-bold hover:underline">
                                Termos de Uso
                            </Link>{' '}
                            e{' '}
                            <Link to="/privacidade" className="text-primary font-bold hover:underline">
                                Política de Privacidade
                            </Link>
                        </span>
                    </div>

                    <Button
                        type="submit"
                        disabled={!isAgreed}
                        className={`w-full text-xl font-semibold rounded-xl py-6 transition-all ${!isAgreed ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                            }`}
                    >
                        Criar Conta
                    </Button>
                </form>

                <p className="text-center mt-6 text-accent-foreground text-sm">
                    Já tem uma conta?{' '}
                    <Link to="/login">
                        <button className="text-primary font-bold hover:underline cursor-pointer hover:opacity-80">
                            Entrar
                        </button>
                    </Link>
                </p>
            </div >
        </div >
    );
};
