import React from 'react';
import CustomHeading from "@/components/headings/CustomHeading";
import {Button} from "@/components/ui/button";
import { RiGraduationCapFill } from "react-icons/ri";
import CustomBox from "@/components/boxs/CustomBox";
import { MdTimer } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const Progress = () => {
    return (
        //To-Do: Update code repeat...
        <div className="flex flex-col pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <CustomHeading text="Your Learning Journey" textDirection="justify-left"/>
                    <span className="text-xs text-muted-foreground">
                        Track your speaking progress and milestones
                    </span>
                </div>
                <div className="flex items-center justify-end w-1/6 gap-5">
                    <Button variant="ghost" className="hover:text-[#4c78fa]" size="sm">
                        Last 7 days
                    </Button>
                    <Button variant="ghost" className="hover:text-[#4c78fa]" size="sm">
                        Last 30 days
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10 items-stretch">
                <CustomBox>
                   <div>
                       <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                           <RiGraduationCapFill className="text-[#4c78fa]" size={20} />
                       </div>
                   </div>
                </CustomBox>
                <CustomBox>
                    <div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                            <MdTimer className="text-[#4c78fa]" size={20} />
                        </div>
                    </div>
                </CustomBox>
                <CustomBox>
                    <div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                            <FaCheckCircle className="text-[#4c78fa]" size={20} />
                        </div>
                    </div>
                </CustomBox>
            </div>
        </div>
    );
};

export default Progress;