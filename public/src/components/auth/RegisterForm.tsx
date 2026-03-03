import { Mail, Lock, User, Phone } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '@/zustand/Auth';
import { formatters } from '@/utils/formatters';

export const RegisterForm = () => {

    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const { register, isLoading } = useAuthStore();

    const handleGoogleLogin = () => {

        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");

        const limitedValue = rawValue.slice(0, 11);
        const maskPhone = formatters.maskPhone(limitedValue)

        setPhone(maskPhone);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData.entries());
        const password = data.password as string;
        const confirmPass = data.confirmPass as string;
        const phoneValue = data.phone as string;

        if (password !== confirmPass) {
            alert("As senhas não coincidem!");
            return;
        }

        const rawPhone = formatters.clearMask(phoneValue);

        const payload = {
            firstName: data.firstName as string,
            lastName: data.lastName as string,
            email: data.email as string,
            password: password,
            phone: rawPhone,
            confirmPass: confirmPass
        };

        try {
            await register(payload);
            alert("Conta criada com sucesso!");
            navigate('/login');
        } catch (error) {
            console.error("Erro na validação do Spring:" + error);
            alert("Erro ao registrar. Verifique se os dados estão corretos.");
        }
    };

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
                    <Button onClick={handleGoogleLogin} variant="tertiary">
                        <FaGoogle size={20} /> Continuar com Google
                    </Button>
                </div >

                <div className="flex items-center my-8">
                    <div className="flex-1 border-1 border-border"></div>
                    <span className="px-4 text-foreground text-sm">ou</span>
                    <div className="flex-1 border-1 border-border"></div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <Input
                        name='firstName'
                        label="Nome"
                        type="text"
                        icon={User}
                        placeholder="Seu nome"
                    />

                    <Input
                        name='lastName'
                        label="Sobrenome"
                        type="text"
                        icon={User}
                        placeholder="Seu sobrenome"
                    />

                    <Input
                        name='email'
                        label="E-mail"
                        type="email"
                        icon={Mail}
                        placeholder="seu@email.com"
                    />

                    <Input
                        name='phone'
                        label="Telefone"
                        type="tel"
                        value={phone}
                        icon={Phone}
                        onChange={handlePhoneChange}
                        placeholder="(00) 00000-0000"
                    />

                    <Input
                        name='password'
                        label="Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                    />

                    <Input
                        name='confirmPass'
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
                        disabled={!isAgreed || isLoading}
                        className={`w-full text-xl font-semibold rounded-xl py-6 transition-all ${!isAgreed ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                            }`}
                    >
                        {isLoading ? "Criando conta..." : "Criar Conta"}
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
