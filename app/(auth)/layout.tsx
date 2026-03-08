import "../globals.css";
import {Inter, Nunito_Sans} from "next/font/google";
import LoginFooter from "@/components/footers/LoginFooter";
import ContainerMd from "@/components/containers/ContainerMd";
import { Toaster } from 'sonner';
import React from "react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const nunito = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-nunito",
});

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
        <link rel="icon" href="/brainLogo.ico"/>
        <body className="flex flex-col min-h-screen">
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
            <main className="flex flex-1 items-center justify-center">
                {children}
            </main>
        </ContainerMd>
        <LoginFooter/>
        </body>
        </html>
    )
}