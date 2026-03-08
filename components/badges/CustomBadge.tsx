import React from 'react';
interface ICustomBadgeProps {
    text: string;
}
const CustomBadge = (props: ICustomBadgeProps) => {
    return (
        <span className="inline-flex items-center rounded-md bg-[#4c78fa] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm">
          {props.text}
        </span>
    );
};

export default CustomBadge;