"use client"
import React, {useState,useEffect} from 'react';
import CustomHeading from "@/components/headings/CustomHeading";
import {Button} from "@/components/ui/button";
import {BsFilterLeft} from "react-icons/bs";
import {IoFilterOutline} from "react-icons/io5";
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
import WordModal from "@/components/modals/WordModal";
import {speakVocabulary} from "@/utils/voiceSpeaking/speakVocabulary";
import { WordFormData } from "@/components/modals/WordModal";
import {
    addVocabulary,
    ICreate,
    getVocabularies,
    IVocabulary,
    getVocabularyById,
    IUpdate, updateVocabulary, getVocabulariesBySearch
} from "@/lib/vocabulary/vocabulary.service";
import {WORD_STATUS_BADGE_VARIANT_MAP, WORD_STATUS_LABEL_MAP} from "@/constants/wordStatus";
import {TbVocabularyOff} from "react-icons/tb";
import {WORD_TYPES_BADGE_VARIANT_MAP, WORD_TYPES_LABEL_MAP} from "@/constants/wordTypes";
import {Skeleton} from "@/components/ui/skeleton";

const Vocabulary = () => {

    //#region UseState
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [vocabulary, setVocabulary] = useState<IVocabulary[]>([]);
    const [selectedVocabulary, setSelectedVocabulary] = useState<IVocabulary>();
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    //#endregion

    //#region UseEffect
    useEffect(() => {
        void fetchVocabulary();
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (search) {
                const result = await getVocabulariesBySearch(search.toLowerCase());
                setVocabulary(result);
            }else{
                await fetchVocabulary();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);
    //#endregion

    //#region HandleEvent
    const fetchVocabulary = async () => {
        setIsLoading(true);
        const vocabulary = await getVocabularies();
        setVocabulary(vocabulary);
        setIsLoading(false);
    }

    const handleSubmitEvent = async (data: WordFormData) => {
        if(modalMode === "add"){
            const create: ICreate = {
                word: data.word,
                definition: data.definition || '',
                example: data.example || '',
                wordType: data.type,
                wordStatus: data.status,
                searchText: data.word.toLowerCase()
            };
            await addVocabulary(create);

        }
        if(modalMode === "edit"){
            const update: IUpdate = {
                id: data.id!,
                word: data.word,
                definition: data.definition || '',
                example: data.example || '',
                wordType: data.type || '',
                wordStatus: data.status || '',
                searchText: data.word.toLowerCase()
            };
            await updateVocabulary(update);
        }
        await fetchVocabulary();
    }

    const handleEditModel = async (id: string) => {
        const vocabulary = await getVocabularyById(id);
        setSelectedVocabulary(vocabulary);
        setModalMode("edit");
        setOpenModal(true);
    }
    //#endregion

    return (
        <div className="flex flex-col pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <CustomHeading text="Vocabulary List" textDirection="justify-left"/>
                    <span className="text-xs text-muted-foreground">
                        Manage and review the words you've collected.
                    </span>
                </div>
                <div>
                    <Button
                        size="sm"
                        onClick={() => {
                            setModalMode("add");
                            setOpenModal(true);
                        }}
                    >
                        Add Vocabulary
                    </Button>
                </div>
            </div>
            <Card className="w-full mt-10">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <InputGroup className="bg-gray-100">
                                <InputGroupInput
                                    placeholder="Search for a word..."
                                    onChange={(e) => setSearch(e.target.value)}
                                />
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

            {
                isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 items-stretch">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="flex flex-col h-full">
                                <CardHeader className="p-2 px-5">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-5 w-20 rounded-md" />
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1">
                                    <Skeleton className="h-6 w-32 mb-3 rounded-md" />
                                    <Skeleton className="h-4 w-full mb-2 rounded-md" />
                                    <Skeleton className="h-4 w-5/6 mb-2 rounded-md" />
                                    <Skeleton className="h-16 w-full mt-4 rounded-xl" />
                                </CardContent>

                                <CardFooter className="border-t">
                                    <div className="flex items-center justify-between w-full pt-3">
                                        <Skeleton className="h-5 w-16 rounded-md" />
                                        <Skeleton className="h-5 w-5 rounded-full" />
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : vocabulary.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 items-stretch">
                        {vocabulary.map((item) => (
                            <Card key={item.id} className="flex flex-col h-full hover:shadow-md transition">
                                <CardHeader className="p-2 px-5">
                                    <div className="flex items-center justify-between">
                                        <Badge variant={WORD_STATUS_BADGE_VARIANT_MAP[item.wordStatus]}>
                                            {WORD_STATUS_LABEL_MAP[item.wordStatus]}
                                        </Badge>
                                        <HiSpeakerWave
                                            className="cursor-pointer hover:scale-110 transition"
                                            color="#4c78fa"
                                            size={20}
                                            onClick={() => {
                                                speakVocabulary({
                                                    word: item.word,
                                                    definition: item.definition ?? "",
                                                    example: item.example ?? "",
                                                })
                                            }}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <h3 className="font-inter text-lg font-semibold">
                                        {item.word}
                                    </h3>
                                    {/*<span className="block text-xs text-muted-foreground mt-1">*/}
                                    {/*  {item.phonetic}*/}
                                    {/*</span>*/}
                                    <div className="font-inter pt-2">
                                        {item.definition}
                                    </div>
                                    <blockquote className="bg-gray-100 rounded-xl mt-4 p-3 text-sm text-muted-foreground italic">
                                        “{item.example}”
                                    </blockquote>
                                </CardContent>
                                <CardFooter className="border-t">
                                    <div className="flex items-center justify-between w-full pt-3">
                                        <Badge variant={WORD_TYPES_BADGE_VARIANT_MAP[item.wordType]}>
                                            {WORD_TYPES_LABEL_MAP[item.wordType]}
                                        </Badge>
                                        <HiOutlineDotsHorizontal
                                            className="cursor-pointer hover:scale-110 transition"
                                            onClick={() => handleEditModel(item.id)}
                                        />
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-[#4c78fa] mt-30">
                        <TbVocabularyOff  size={40} className="mb-3" />
                        <p className="text-base font-medium font-nunito">
                            Your Vocabulary Is Empty
                        </p>
                        <p className="text-sm font-nunito">
                            Add your first words and start your learning journey.
                        </p>
                    </div>
                )
            }
            <WordModal
                open={openModal}
                onOpenChange={setOpenModal}
                mode={modalMode}
                onSubmit={handleSubmitEvent}
                data={selectedVocabulary}
            />
            {/*{isLoading && <FullScreenLoader />}*/}
        </div>
    );
};

export default Vocabulary;