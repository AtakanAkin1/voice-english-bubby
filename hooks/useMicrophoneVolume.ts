import { useRef } from "react";

const SILENCE_THRESHOLD = 10;
const SILENCE_DURATION = 1200;

export const useMicrophoneVolume = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const silenceStartRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const start = async (
        onVolume: (v: number) => void,
        onSilence: () => void
    ) => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        const tick = () => {
            analyser.getByteFrequencyData(dataArray);

            const volume =
                dataArray.reduce((a, b) => a + b, 0) / bufferLength;

            onVolume(volume);

            if (volume < SILENCE_THRESHOLD) {
                if (!silenceStartRef.current) {
                    silenceStartRef.current = Date.now();
                }

                if (Date.now() - silenceStartRef.current > SILENCE_DURATION) {
                    stop();
                    onSilence();
                    return;
                }
            } else {
                silenceStartRef.current = null;
            }

            animationFrameRef.current = requestAnimationFrame(tick);
        };

        tick();
    };

    const stop = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        audioContextRef.current?.close();

        audioContextRef.current = null;
        analyserRef.current = null;
        dataArrayRef.current = null;
        silenceStartRef.current = null;
    };

    return { start, stop };
};
