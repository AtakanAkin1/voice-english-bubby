import React from 'react';
import { FaMicrophone } from "react-icons/fa6";


const Microphone = () => {
    return (
        <div className="bg-[#4c78fa] p-7 rounded-full">
            <FaMicrophone   style={{color: "white", fontSize: "3rem"}} />
        </div>
    );
};

export default Microphone;