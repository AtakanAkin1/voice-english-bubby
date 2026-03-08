'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { IoMdSettings } from 'react-icons/io'
import { TbVocabulary } from 'react-icons/tb'
import { GiProgression } from 'react-icons/gi'
import React from "react";

export default function BottomNav() {
    const pathname = usePathname()

    return (
        <div className="flex items-center justify-center gap-15 py-5 border-t border-gray-200">

            <Link
                href="/settings"
                className={`font-inter hover:text-[#4c78fa] ${
                    pathname === '/settings' ? 'text-[#4c78fa]' : ''
                }`}
            >
                <div className="flex flex-col items-center">
                    <IoMdSettings size={20} />
                    Settings
                </div>
            </Link>

            <Link
                href="/vocabulary"
                className={`font-inter hover:text-[#4c78fa] ${
                    pathname === '/vocabulary' ? 'text-[#4c78fa]' : ''
                }`}
            >
                <div className="flex flex-col items-center">
                    <TbVocabulary size={20} />
                    Vocabulary
                </div>
            </Link>

            <Link
                href=""
                className={`font-inter hover:text-[#4c78fa] ${
                    pathname === '/progress' ? 'text-[#4c78fa]' : ''
                }`}
            >
                <div className="flex flex-col items-center">
                    <GiProgression size={20} />
                    Progress <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                </div>
            </Link>

        </div>
    )
}