"use client"
import React from 'react';
import Image from "next/image";
import CustomButton from "@/components/buttons/CustomButton";
import {usePathname} from "next/navigation";
import CustomBadge from "@/components/badges/CustomBadge";

const Header = () => {
    const pathname : string = usePathname();
    const isHome : boolean = pathname === "/";

    return (
        <div className="w-full mt-3 mb-7 border-b-1 border-gray-200 pb-5">
            <div className="flex items-center justify-between">
                <div className="flex w-1/2 items-center">
                    <div className="mr-5">
                        <Image
                            src="/brainLogo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="block">
                        <div className="flex justify-center items-center gap-2 text-lg font-bold font-inter">
                            Voice English Buddy
                            <CustomBadge text="Beta"/>
                        </div>
                        <div className="block text-sm text-gray-500 font-nunito">Practice English by speaking with AI
                        </div>
                    </div>
                </div>
                {pathname !== "/login" && (
                    <CustomButton
                        text={isHome ? "Settings" : "Back"}
                        href={isHome ? "/settings" : "/"}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;