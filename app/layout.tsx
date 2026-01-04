import type { Metadata } from "next";
import {Inter, Nunito_Sans} from "next/font/google";
import "./globals.css";
import ContainerMd from "@/components/containers/ContainerMd";
import Footer from "@/components/footers/Footer";

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
        <body className="antialiased">
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <ContainerMd>
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                    <Footer />
                </ContainerMd>
            </div>

        </div>
        </body>
        </html>
    );
}
