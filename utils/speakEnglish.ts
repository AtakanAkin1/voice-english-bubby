"use client";

interface ISpeakEnglish{
    word: string;
    definition: string;
    example: string;
}

interface ISpeechPart{
    text: string;
    rate: number;
    pitch: number;
    pauseAfter: number;
}

export function speakEnglish(props: ISpeakEnglish) {
    if (typeof window === "undefined") return;

    const { word, definition, example } = props;
    const synth = window.speechSynthesis;

    const parts: ISpeechPart[] = [
        { text: word, rate: 0.8, pitch: 1.1, pauseAfter: 500 },
        { text: definition, rate: 0.9, pitch: 1, pauseAfter: 400 },
        { text: example, rate: 1, pitch: 1, pauseAfter: 0 },
    ];

    let index = 0;

    const speakNext = () => {
        if (index >= parts.length) return;

        const part = parts[index];
        const utterance = new SpeechSynthesisUtterance(part.text);

        const voices = synth.getVoices();
        const voice =
            voices.find(v => v.name.includes("Google UK English")) ||
            voices.find(v => v.name.includes("Google US English")) ||
            voices[0];

        utterance.voice = voice ?? null;
        utterance.lang = "en-US";
        utterance.rate = part.rate;
        utterance.pitch = part.pitch;

        utterance.onend = () => {
            index++;
            setTimeout(speakNext, part.pauseAfter);
        };

        synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = () => speakNext();
    } else {
        synth.cancel();
        speakNext();
    }
}
