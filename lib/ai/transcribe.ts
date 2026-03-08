import OpenAI from "openai";

export const Transcribe = async (file: File) :Promise<string | null> => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
        language: "en",
        temperature: 0,
        prompt:
            "Speaker may mix Turkish words but mostly speaks English. Transcribe literally."
    });

    return transcription.text ? transcription.text : null;
};