import React from 'react';
import Header from "@/components/headers/Header";
interface ContainerProps{
    children: React.ReactNode;
}
const ContainerMd = ({children} : ContainerProps) => {
    return (
        <div className="container mx-auto px-14 flex flex-col flex-1">
            <Header />
            {children}
        </div>
    );
};

export default ContainerMd;