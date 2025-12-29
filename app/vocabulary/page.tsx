import React from 'react';
import CustomHeading from "@/components/headings/CustomHeading";
import {Button} from "@/components/ui/button";
import { GoPlus } from "react-icons/go";


const Vocabulary = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <CustomHeading text="Vocabulary List" textDirection="justify-left" />
                    <span className="text-xs text-muted-foreground">
                        Manage and review the words you've collected.
                    </span>
                </div>
                <div>
                    <Button variant="default" size="sm">
                        <GoPlus /> Add New Word
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Vocabulary;