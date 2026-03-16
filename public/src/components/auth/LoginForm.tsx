import { Mail, Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/Auth';
import { loginSchema, type LoginFormData } from '@/schemas/LoginSchema';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data);
            navigate('/');
        } catch (error) {
            alert("E-mail ou senha incorretos.");
            console.error(error);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

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
                </div>

                <div className="flex items-center my-8">
                    <div className="flex-1 border-1 border-border"></div>
                    <span className="px-4 text-foreground text-sm">ou</span>
                    <div className="flex-1 border-1 border-border"></div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('email')}
                        label="E-mail"
                        type="email"
                        icon={Mail}
                        placeholder="seu@email.com"
                        isRequired={true}
                        error={errors.email?.message}
                    />

                    <Input
                        {...register('password')}
                        label="Senha"
                        type="password"
                        icon={Lock}
                        placeholder="••••••••"
                        isRequired={true}
                        error={errors.password?.message}
                        rightElement={
                            <button type="button" className="text-xs text-primary hover:opacity-80 font-bold cursor-pointer hover:underline">
                                Esqueceu a senha?
                            </button>
                        }
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className='w-full text-xl font-semibold rounded-xl py-6'
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <p className="text-center mt-6 text-accent-foreground text-sm">
                    Não tem uma conta?{' '}
                    <Link to="/cadastro">
                        <span className="text-primary font-bold hover:underline cursor-pointer hover:opacity-80">
                            Criar conta
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
};