"use client";

import { auth } from "@/lib/firabase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth,  (user) => {

            const isLoginPage = pathname === "/login";

            if (!user && !isLoginPage) {
                router.push("/login");
            }

            if (user && isLoginPage) {
                router.push("/");
            }

        });

        return () => unsubscribe();

    }, [pathname, router]);

    return <>{children}</>;
}