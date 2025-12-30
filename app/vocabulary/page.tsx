import React from 'react';
import CustomHeading from "@/components/headings/CustomHeading";
import {Button} from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { IoSearchSharp } from "react-icons/io5";

const Vocabulary = () => {
    return (
        <div className="flex flex-col">
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
                    <InputGroup className="bg-gray-100">
                        <InputGroupInput placeholder="Search for a word..." />
                        <InputGroupAddon>
                            <IoSearchSharp />
                        </InputGroupAddon>
                    </InputGroup>
                    <Button variant="default" size="sm">
                        <GoPlus/> Add New Word
                    </Button>
                </CardHeader>
            </Card>
        </div>
    );
};

export default Vocabulary;