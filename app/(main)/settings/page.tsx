"use client"
import React, {useEffect, useState} from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {RadialProgress} from "@/components/ui/radial-progress";
import CustomBox from "@/components/boxs/CustomBox";
import styles from "./settings.module.css";
import { Switch } from "@/components/ui/switch";
import CustomHeading from "@/components/headings/CustomHeading";
import {useSettingsStore} from "@/store/settingsStore";
import {auth} from "@/lib/firabase/firebase";

const Settings = () => {
    const [maxDaily] = useState<number>(50);
    const {
        difficulty,
        setDifficulty,
        aiModel,
        setAIModel,
        topic,
        setTopic,
        voiceReply,
        setVoiceReply,
        dailyRequest,
        setDailyRequest
    } = useSettingsStore();

    const getDailyRequest =  async () => {
        const token = await auth.currentUser?.getIdToken();

        const res = await fetch("/api/user/limit", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        debugger;
        const data = await res.json();
        const {used} = data;
        setDailyRequest(used);
        console.log(data);
    }
    useEffect(() => {
        void getDailyRequest();
    }, []);
    return (
        <div className="flex flex-col pb-10">
            <CustomHeading text="Settings" textDirection="justify-center" />
            <div className="flex flex-col gap-5 items-center justify-center mx-50">
                <CustomBox>
                   <div className={styles.boxDiv}>
                       <span className="font-nunito">AI Model</span>
                       <Select
                           value={aiModel}
                           onValueChange={setAIModel}
                       >
                           <SelectTrigger className="w-[180px]">
                               <SelectValue/>
                           </SelectTrigger>
                           <SelectContent>
                               <SelectGroup>
                                   <SelectItem value="gpt-4o">
                                       GPT-4o
                                   </SelectItem>
                               </SelectGroup>
                           </SelectContent>
                       </Select>
                   </div>
                </CustomBox>
                <CustomBox>
                    <div className={styles.boxDiv}>
                        <span className="font-nunito">Difficulty</span>
                        <Select
                            value={difficulty}
                            onValueChange={(value) => setDifficulty(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="beginner">
                                        Beginner <span className="ml-2 text-xs text-muted-foreground">Elementary</span>
                                    </SelectItem>

                                    <SelectItem value="elementary">
                                        Elementary <span className="ml-2 text-xs text-muted-foreground">Pre-Intermediate</span>
                                    </SelectItem>

                                    <SelectItem value="intermediate" >
                                        Intermediate
                                    </SelectItem>

                                    <SelectItem value="upperIntermediate">
                                        Upper-Intermediate
                                    </SelectItem>

                                    <SelectItem value="advanced">
                                        Advanced
                                    </SelectItem>
                                    <SelectItem value="proficiency">
                                        Proficiency <span className="ml-2 text-xs text-muted-foreground">Native-like</span>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CustomBox>
                <CustomBox>
                    <div className={styles.boxDiv}>
                        <span className="font-nunito">Topic</span>
                        <Select
                            value={topic}
                            onValueChange={setTopic}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="dailyLife">
                                        Daily Life
                                    </SelectItem>

                                    <SelectItem value="sports">
                                        Sports
                                    </SelectItem>

                                    <SelectItem value="histories">
                                        Histories
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CustomBox>
                <CustomBox>
                    <div className={styles.boxDiv}>
                        <span className="font-nunito">Voice Reply</span>
                        <Switch
                            checked={voiceReply}
                            onCheckedChange={(checked) => setVoiceReply(checked)}
                            disabled
                        />
                    </div>
                </CustomBox>
                <CustomBox>
                   <div>
                       <RadialProgress value={dailyRequest} max={maxDaily} description={"Daily AI Usage"}/>
                       <div className="text-center">
                           You have 50 AI requests available each day. <br/>Every request increases your remaining count by 1.
                       </div>
                   </div>
                </CustomBox>
            </div>
        </div>
    );
};

export default Settings;