import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <Lottie
                animationData={loadingAnimation}
                loop
                style={{ width: 140, height: 140 }}
            />
        </div>
    );
};

export default FullScreenLoader;