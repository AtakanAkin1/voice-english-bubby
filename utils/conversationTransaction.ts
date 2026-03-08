import {nanoid} from "nanoid";

export function getOrCreateConversationId(): string {
    if (typeof window === "undefined") return "";

    const today = new Date().toISOString().split("T")[0];

    const storedId = localStorage.getItem("conversationId");
    const storedDate = localStorage.getItem("conversationDate");

    if (!storedId || storedDate !== today) {
        const newId = nanoid();

        localStorage.setItem("conversationId", newId);
        localStorage.setItem("conversationDate", today);

        return newId;
    }

    return storedId;
}