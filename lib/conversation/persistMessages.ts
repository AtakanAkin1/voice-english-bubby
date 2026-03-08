import {adminFirestore} from "@/lib/firabase/adminFirebase";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export async function persistMessages({conversationId,difficulty,topic,messages,userId}:
{
    conversationId: string;
    userId?: string;
    difficulty: string;
    topic: string;
    messages: Message[];
}){
    try {
        const conversationRef = adminFirestore
            .collection("conversations")
            .doc(conversationId);

        const snapshot = await conversationRef.get();
        if (!snapshot.exists) {
            await conversationRef.set({
                userId: userId ?? null,
                difficulty,
                topic,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        } else {
            await conversationRef.update({
                updatedAt: new Date(),
            });
        }
        const batch = adminFirestore.batch();
        const messagesRef = conversationRef.collection("messages");

        messages.forEach((msg) => {
            const ref = messagesRef.doc();
            batch.set(ref, {
                role: msg.role,
                content: msg.content,
                createdAt: new Date(),
            });
        });

        await batch.commit();
    }
    catch(err){
        console.error("Persist messages failed (ignored):", err);
    }
}