import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: "add" | "edit";
}

const WordModal = ({ open, onOpenChange, mode = "add" }: WordModalProps) => {
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
                    />
                    <input
                        type="text"
                        placeholder="Usage"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Example"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose your type..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="noun">Noun</SelectItem>
                                <SelectItem value="verb">Verb</SelectItem>
                                <SelectItem value="adjective">Adjective</SelectItem>
                                <SelectItem value="adverb">Adverb</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button className="w-full">
                        {mode === "add" ? "Save" : "Update"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WordModal;
