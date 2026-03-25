import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/utils/scrollToTop";


export const Layout = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />
            <main className="flex-row w-full min-h-screen pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
