import React from 'react';
import CustomHeading from "@/components/headings/CustomHeading";
import {Button} from "@/components/ui/button";
import {GoPlus} from "react-icons/go";
import {BsFilterLeft} from "react-icons/bs";
import {IoFilterOutline} from "react-icons/io5";
import {VocabularyCardWord} from "@/mockDatas/VocabularyCardWord";
import {
    Card, CardContent, CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import {IoSearchSharp} from "react-icons/io5";
import {Badge} from "@/components/ui/badge";
import {HiSpeakerWave} from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Vocabulary = () => {
    return (
        //To-Do: Kod tekrarı var..
        <div className="flex flex-col pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <CustomHeading text="Vocabulary List" textDirection="justify-left"/>
                    <span className="text-xs text-muted-foreground">
                        Manage and review the words you've collected.
                    </span>
                </div>
                <div>
                    <Button variant="default" size="sm">
                        <GoPlus/> Add New Word
                    </Button>
                </div>
            </div>
            <Card className="w-full mt-10">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <InputGroup className="bg-gray-100">
                                <InputGroupInput placeholder="Search for a word..."/>
                                <InputGroupAddon>
                                    <IoSearchSharp/>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                                <IoFilterOutline/> All Status
                            </Button>
                            <Button variant="outline" size="sm">
                                <BsFilterLeft/>
                                Newest First
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 items-stretch">
                {VocabularyCardWord.map((item, i) => (
                    <Card key={i} className="flex flex-col h-full hover:shadow-md transition">
                        <CardHeader className="p-2 px-5">
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary">{item.type}</Badge>
                                <HiSpeakerWave
                                    className="cursor-pointer hover:scale-110 transition"
                                    color="#4c78fa"
                                    size={20}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <h3 className="font-inter text-lg font-semibold">
                                {item.word}
                            </h3>
                            <span className="block text-xs text-muted-foreground mt-1">
                              {item.phonetic}
                            </span>
                            <div className="font-inter pt-2">
                                {item.definition}
                            </div>
                            <blockquote className="bg-gray-100 rounded-xl mt-4 p-3 text-sm text-muted-foreground italic">
                                “{item.example}”
                            </blockquote>
                        </CardContent>
                        <CardFooter className="border-t">
                            <div className="flex items-center justify-between w-full pt-3">
                                <Badge variant="outline">{item.status}</Badge>
                                <HiOutlineDotsHorizontal className="cursor-pointer hover:scale-110 transition"/>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Vocabulary;