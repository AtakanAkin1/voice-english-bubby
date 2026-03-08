"use client";

"use client";

let cachedVoice: SpeechSynthesisVoice | null = null;

function prepareForSpeech(text: string): string {
    const withoutEmojis = text.replace(
        /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
        ""
    );

    return withoutEmojis
        .replace(/\n+/g, ". ")
        .replace(/,/g, ", ")
        .replace(/\./g, ". ")
        .replace(/\?/g, "? ")
        .replace(/!/g, "! ")
        .replace(/\s+/g, " ")
        .trim();
}

function splitSentences(text: string): string[] {
    return text
        .match(/[^.!?]+[.!?]*/g)
        ?.map(s => s.trim())
        .filter(Boolean) ?? [];
}

export function speakAi(text: string) {
    if (typeof window === "undefined") return;
    if (!text) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const processedText = " " + prepareForSpeech(text);
    const sentences = splitSentences(processedText);

    const selectBestVoice = () => {
        const voices = synth.getVoices();
        if (!voices.length) return null;

        return (
            voices.find(v => v.name.includes("Google UK English Male")) ||
            voices.find(v => v.name.includes("Google US English Male")) ||
            voices.find(v => v.name.includes("Microsoft David")) ||
            voices.find(v => v.name.includes("Microsoft Mark")) ||
            voices.find(v => v.lang === "en-GB") ||
            voices.find(v => v.lang === "en-US") ||
            voices[0]
        );
    };

    const speakSequentially = async () => {
        if (!cachedVoice) cachedVoice = selectBestVoice();

        for (const sentence of sentences) {
            const utterance = new SpeechSynthesisUtterance(sentence);

            utterance.voice = cachedVoice!;
            utterance.lang = "en-US";

            utterance.rate = 1.05;
            utterance.pitch = 0.85;
            utterance.volume = 1;

            synth.speak(utterance);
            await new Promise<void>(res => (utterance.onend = () => res()));
        }
    };

    if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = () => {
            cachedVoice = selectBestVoice();
            void speakSequentially();
        };
    } else {
        void speakSequentially();
    }
}