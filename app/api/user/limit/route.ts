import {NextResponse} from "next/server";
import {adminAuth} from "@/lib/firabase/adminFirebase";
import {getDailyLimit} from "@/lib/user/user.service";

export async function GET(req: Request) {

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = await adminAuth.verifyIdToken(token);

    const uid = decoded.uid;

    const limit = await getDailyLimit(uid);

    return NextResponse.json(limit);
}