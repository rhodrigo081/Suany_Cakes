import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
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
