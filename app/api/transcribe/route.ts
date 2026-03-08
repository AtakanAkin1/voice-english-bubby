import { NextResponse } from "next/server";
import { Transcribe } from "@/lib/ai/transcribe";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const text = await Transcribe(file);

        return NextResponse.json({ text });

    } catch (error) {
        return NextResponse.json(
            { error: "Transcription failed" },
            { status: 500 }
        );
    }
}