import React from "react";
import CustomBox from "@/components/boxs/CustomBox";
import {AiOutlineRise} from "react-icons/ai";

interface  StatCardProps  {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    change?: {
        value: string;
        positive?: boolean;
    };
    bgColor?: string;
}

const StatCard = (props: StatCardProps) => {
    const { icon, title, value, change,bgColor } = props;
    const backgroundClass = bgColor ? "" : "bg-gray-100";
    const backgroundStyle = bgColor ? { backgroundColor: bgColor } : undefined;

    return (
        <CustomBox>
            <div className="w-1/2">

                <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${backgroundClass}`}
                    style={backgroundStyle}
                >
                    {icon}
                </div>

                <div className="mt-4">
                  <span className="font-nunito text-sm text-muted-foreground">
                    {title}
                  </span>
                </div>

                <div className="flex items-center gap-5 mt-2">
                  <span className="text-3xl font-bold">
                    {value}
                  </span>

                    {change && (
                        <div
                            className={`flex items-center gap-1 text-sm font-medium ${
                                change.positive ? "text-[#228E52]" : "text-red-500"
                            }`}
                        >
                            <AiOutlineRise />
                            {change.value}
                        </div>
                    )}
                </div>
            </div>
        </CustomBox>
    );
}
export default StatCard;