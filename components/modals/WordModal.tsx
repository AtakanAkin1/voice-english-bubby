import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect, useState} from "react";
import {WORD_STATUS_OPTIONS, WordStatus} from "@/constants/wordStatus";
import {WordTypes, WORD_TYPES_OPTIONS} from "@/constants/wordTypes";
import {IVocabulary} from "@/lib/vocabulary.service";

interface WordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: "add" | "edit";
    onSubmit: (data: WordFormData) => void;
    data?: IVocabulary
}
export interface WordFormData {
    word: string;
    definition: string | null;
    example: string | null;
    type: WordTypes;
    status: WordStatus;
}

const WordModal = ({ open, mode, onOpenChange, onSubmit, data }: WordModalProps) => {
    const [word, setWord] = useState<string>('');
    const [definition, setDefinition] = useState<string>('');
    const [example, setExample] = useState<string>('');
    const [type, setType] = useState<WordTypes>(WordTypes.Verb);
    const [status, setStatus] = useState<WordStatus>(WordStatus.Learning);

    useEffect(() => {
        if(mode === "edit" && data){
            setWord(data.word);
            setDefinition(data.definition ?? '');
            setExample(data.example ?? '');
            setType(data.wordType);
            setStatus(data.wordStatus);
        }
        if(mode === "add"){
            setWord('');
            setDefinition('');
            setExample('');
            setType(WordTypes.Verb);
            setStatus(WordStatus.Learning);
        }
    },[mode,data]);
    const handleSubmit = () => {
        onSubmit({
            word: word.trim(),
            definition: definition || null,
            example: example || null,
            type: type,
            status: status,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <DialogTitle className="text-[#4c78fa]">
                        {mode === "add" ? "Add New Word" : "Edit Word"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Word"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Definition"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Example"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                    />

                    <Select
                        value={String(type)}
                        onValueChange={(val) => setType(Number(val))}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Choose word type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {WORD_TYPES_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={String(opt.value)}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {
                        mode === "edit" && (
                            <Select
                                value={String(status)}
                                onValueChange={(val) => setStatus(Number(val))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose word status..." />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {WORD_STATUS_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={String(opt.value)}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }
                    <Button className="w-full" onClick={handleSubmit}>
                        {mode === "add" ? "Save" : "Update"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WordModal;
