import { RegisterForm } from "@/components/auth/RegisterForm"
import { Wrapper } from "@/components/Wrapper"
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {

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
            <RegisterForm />
        </Wrapper>
    )
}