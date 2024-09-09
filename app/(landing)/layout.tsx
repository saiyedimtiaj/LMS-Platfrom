"use client"
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ReactNode } from "react";


const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Header />
            <div className="min-h-[calc(100vh-464px)] flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default layout;