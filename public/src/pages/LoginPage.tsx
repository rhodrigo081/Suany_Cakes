
import { Wrapper } from '@/components/Wrapper';
import { LoginForm } from './../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export const LoginPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/perfil");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <Wrapper>
            <LoginForm />
        </Wrapper>
    )
}