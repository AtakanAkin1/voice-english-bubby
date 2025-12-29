import React from 'react';

interface customHeadingProps{
    text: string;
    textDirection: string;
}
const CustomHeading = (props:customHeadingProps) => {
    return (
        <div className={`w-full flex items-center ${props.textDirection} mb-2`}>
            <h3 className="font-nunito font-bold text-xl">{props.text}</h3>
        </div>
    );
};

export default CustomHeading;