import React from 'react';
interface ContainerProps{
    children: React.ReactNode;
}

const CustomBox = ({children} : ContainerProps) => {
    return (
        <div className="box-border size-full border-1 p-5 rounded-lg w-2/3">
            {children}
        </div>
    );
};

export default CustomBox;