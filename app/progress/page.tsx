"use client";
import React from 'react';
import CustomHeading from "@/components/headings/CustomHeading";
import {Button} from "@/components/ui/button";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdTimer } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import StatCard from "@/components/stats/StatCard";
import {DailySpeakingChart} from "@/components/charts/DailySpeakingChart";
import {SkillBreakdownChart} from "@/components/charts/SkillBreakdownChart";
import {DailyGoal} from "@/components/charts/DailyGoal";

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-15 mt-10 items-stretch">
                <StatCard
                    icon={<RiGraduationCapFill className="text-[#4c78fa]" size={20} />}
                    title="Words Learned"
                    value="1,240"
                    change={{ value: "+12%", positive: true }}
                />
                <StatCard
                    icon={<MdTimer className="text-[#4c78fa]" size={20} />}
                    title="Speaking Time"
                    value="4h 30m"
                    change={{ value: "+5%", positive: true }}
                />
                <StatCard
                    icon={<FaCheckCircle className="text-[#4c78fa]" size={20} />}
                    title="Success Rate"
                    value="85%"
                    change={{ value: "+2%", positive: true }}
                />
            </div>
            <div>
                <DailySpeakingChart/>
            </div>
            <div>
                <SkillBreakdownChart/>
            </div>
            <div>
                <DailyGoal/>
            </div>
        </div>
    );
};

export default Progress;