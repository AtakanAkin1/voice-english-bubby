import { create } from "zustand";

interface SettingsState {
    difficulty: string;
    aiModel: string;
    topic: string;
    voiceReply: boolean;
    score: number;

    setDifficulty: (newDifficulty: string) => void;
    setAIModel: (newAIModel: string) => void;
    setTopic: (newTopic: string) => void;
    setVoiceReply: (newVoiceReply: boolean) => void;
    setScore: (newScore: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    difficulty: "elementary",
    aiModel: "gpt-4o",
    topic: "dailyLife",
    voiceReply: true,
    score: 1,

    setDifficulty: (newDifficulty) =>
        set({ difficulty: newDifficulty }),

    setAIModel: (newAIModel) =>
        set({ aiModel: newAIModel }),

    setTopic: (newTopic) =>
        set({ topic: newTopic }),

    setVoiceReply: (newVoiceReply) =>
        set({ voiceReply: newVoiceReply }),

    setScore: (newScore) =>
        set({ score: newScore }),
}));