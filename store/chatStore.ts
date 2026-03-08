import { create } from "zustand";
import { nanoid } from "nanoid";
import {UserNameConstants} from "@/constants/userNameConstants";

export interface ChatMessage {
    id: string;
    role: UserNameConstants;
    content: string;
    createdAt: number;
}

interface ChatState {
    messages: ChatMessage[];

    addUserMessage: (text: string) => void;
    addAiMessage: (text: string) => void;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],

    addUserMessage: (text) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: nanoid(),
                    role: UserNameConstants.User,
                    content: text,
                    createdAt: Date.now(),
                },
            ],
        })),

    addAiMessage: (text) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: nanoid(),
                    role: UserNameConstants.Assistant,
                    content: text,
                    createdAt: Date.now(),
                },
            ],
        })),

    clearMessages: () => set({ messages: [] }),
}));
