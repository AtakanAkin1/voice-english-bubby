"use client";
import { useRouter } from "next/navigation";

interface CustomButtonProps {
    text: string;
    href: string;
}

const CustomButton = (props: CustomButtonProps) => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(props.href)}
            className="bg-gray-100 border-1 border-gray-300 p-1 rounded-md hover:text-white hover:bg-[#4c78fa]
               cursor-pointer w-20"
        >
            <span className="font-inter">{props.text}</span>
        </button>
    );
};

export default CustomButton;
