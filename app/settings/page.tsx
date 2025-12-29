import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {RadialProgress} from "@/components/ui/radial-progress";
import CustomBox from "@/components/boxs/CustomBox";
import styles from "./settings.module.css";
import { Switch } from "@/components/ui/switch";
import CustomHeading from "@/components/headings/CustomHeading";

const Settings = () => {
    return (
        <div className="flex flex-col pb-10">
            <CustomHeading text="Settings" textDirection="justify-center" />
            <div className="flex flex-col gap-5 items-center justify-center">
                <CustomBox>
                   <div className={styles.boxDiv}>
                       <span className="font-nunito">AI Model</span>
                       <Select>
                           <SelectTrigger className="w-[180px]">
                               <SelectValue placeholder="GPT-4o" />
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
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Intermediate" />
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
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Daily Life" />
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
                        <Switch />
                    </div>
                </CustomBox>
                <CustomBox>
                   <div className="">
                       <RadialProgress value={300} max={900}/>

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