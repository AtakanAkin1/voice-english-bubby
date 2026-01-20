"use client"
import React from 'react';
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

const Settings = () => {
    const {
        difficulty,
        setDifficulty,
        aiModel,
        setAIModel,
        topic,
        setTopic,
        voiceReply,
        setVoiceReply,
        score
    } = useSettingsStore();

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

                                   <SelectItem value="claude" disabled>
                                       Claude <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                                   </SelectItem>

                                   <SelectItem value="gemini" disabled>
                                       Google Gemini <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
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

                                    <SelectItem value="sports" disabled>
                                        Sports <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
                                    </SelectItem>

                                    <SelectItem value="histories" disabled>
                                        Histories <span className="ml-2 text-xs text-muted-foreground">(Coming Soon)</span>
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
                        />
                    </div>
                </CustomBox>
                <CustomBox>
                   <div>
                       <RadialProgress value={score} max={15} description={"Daily Goal"}/>
                       <div className="text-center">
                           Your data entries contribute to the model's <br/>learning process.
                       </div>
                   </div>
                </CustomBox>
            </div>
        </div>
    );
};

export default Settings;