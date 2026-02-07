import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Layout = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="mb-50">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
