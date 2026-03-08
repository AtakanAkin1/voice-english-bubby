import { NextResponse } from "next/server";
import { Generate } from "@/lib/ai/generate";
import {persistMessages} from "@/lib/conversation/persistMessages";
import {adminAuth} from "@/lib/firabase/adminFirebase";
import {checkDailyLimit} from "@/lib/user/user.service";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { history, difficulty, topic, conversationId } = body;
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.replace("Bearer ", "");
        const decodedToken = await adminAuth.verifyIdToken(token);

        const limit = await checkDailyLimit(decodedToken.uid);
        if(!limit.allowed) {
            return NextResponse.json(
                { error: "Daily AI limit reached" },
                { status: 429 }
            );
        }
        const response = await Generate({
            history,
            difficulty,
            topic
        });

        void persistMessages({
            difficulty: difficulty,
            topic: topic,
            conversationId: conversationId,
            userId: decodedToken.uid,
            messages: [
                history[history.length - 1],
                { role: "assistant", content: response.message },
            ]
        });

        return NextResponse.json({
            aiText: response.message
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Generate failed" },
            { status: 500 }
        );
    }
}