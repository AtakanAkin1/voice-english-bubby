import {BuildSystemPrompt} from "@/utils/buildSystemPrompt";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {UserNameConstants} from "@/constants/userNameConstants";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export interface IConversationParams {
    history: { role: UserNameConstants; content: string }[];
    difficulty: string;
    topic: string;
}
interface IGenerateResponse{
    message: string;
}
export const Generate = async (data: IConversationParams): Promise<IGenerateResponse> => {
    const {history,difficulty,topic} = data;
    const generatePrompt = BuildSystemPrompt(difficulty, topic);

    const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: generatePrompt },
        ...history.map(msg => ({
            role: msg.role as "user" | "assistant",
            content: msg.content
        }))
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
    });

    return {
        message: response.choices[0].message.content || ""
    };
}