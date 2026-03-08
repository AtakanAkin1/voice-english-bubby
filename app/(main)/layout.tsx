import type { Metadata } from "next";
import {Inter, Nunito_Sans} from "next/font/google";
import "../globals.css";
import ContainerMd from "@/components/containers/ContainerMd";
import Footer from "@/components/footers/Footer";
import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import {Toaster} from "sonner";


const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const nunito = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-nunito",
});

export const metadata: Metadata = {
    title: "Voice English Buddy",
    description: "Practice English",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
        <link rel="icon" href="/brainLogo.ico"/>
        <body className="antialiased">
        <AuthGuard>
            <div className="h-screen flex flex-col overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0">
                    <ContainerMd>
                        <Toaster
                            position="top-center"
                            toastOptions={{
                                style: {
                                    background: "#4c78fa",
                                    color: "white",
                                    border: "none"
                                }
                            }}
                        />
                        <main className="flex-1 flex flex-col min-h-0 overflow-auto">
                            {children}
                        </main>
                        <Footer />
                    </ContainerMd>
                </div>

            </div>
        </AuthGuard>
        </body>
        </html>
    );
}
