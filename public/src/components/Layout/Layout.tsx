import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "@/utils/scrollToTop";
import { ModalProduct } from "../ui/modalProduct";

export const Layout = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />
            <main className="flex-grow w-full min-h-screen pt-20">
                <Outlet />
            </main>
            <Footer />

            <ModalProduct />
        </div>
    );
};
