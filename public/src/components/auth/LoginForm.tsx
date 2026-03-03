import { Mail, Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext/useAuth';

export const LoginForm = () => {

    const navigate = useNavigate();

    const handleGoogleLogin = () => {

        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const credentials = Object.fromEntries(formData.entries());

        try {
            const data = await authService.login(credentials);

            login(data.token, data.user);

            navigate('/');
        } catch (error) {
            alert(error + "E-mail ou senha incorretos.");
        }
    }

    return (
        <div className="flex items-center justify-center">
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
                        name='email'
                        label="E-mail"
                        type="email"
                        icon={Mail}
                        placeholder="seu@email.com"
                    />

                    <Input
                        name='password'
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