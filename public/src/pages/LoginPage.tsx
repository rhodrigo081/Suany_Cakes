import { Wrapper } from '@/components/Wrapper';
import { LoginForm } from './../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/Auth';

export const LoginPage = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/perfil");
        }
    }, [user, navigate]);

    return (
        <Wrapper className='flex h-screen justify-center items-center'>
            <LoginForm />
        </Wrapper>
    )
}