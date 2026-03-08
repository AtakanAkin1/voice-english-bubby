    "use client"
    import React, {useRef,useEffect} from "react";
    import Message from "@/components/chats/Message";
    import AiBotAnimation from "@/assets/aiBot.json";
    import Lottie from "lottie-react";
    import Microphone from "@/components/voices/Microphone";
    import {useChatStore} from "@/store/chatStore";
    import {getOrCreateConversationId} from "@/utils/conversationTransaction";
    import {auth} from "@/lib/firabase/firebase";
    import {onAuthStateChanged} from "firebase/auth";

    export default function Home() {
        const {
            addUserMessage,
            addAiMessage
        } = useChatStore();
        const messages = useChatStore((state) => state.messages);
        const bottomRef = useRef<HTMLDivElement | null>(null);

        const getDbMessages = async (user:any)  => {

            const conversationId  = getOrCreateConversationId();

            if (!conversationId) return;
            if (messages.length > 0) return;

            try {

                const token = await user.getIdToken();

                const res = await fetch("/api/resume",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({conversationId})
                });

                if(!res.ok) return;

                const data = await res.json();

                if (!data.messages || data.messages.length === 0) return;

                data.messages.forEach((msg:any) => {

                    if(msg.role === "user"){
                        addUserMessage(msg.content);
                    }else{
                        addAiMessage(msg.content);
                    }

                });

            }catch (err) {
                console.error("Resume failed:", err);
            }
        };

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {

                if(!user) return;

                await getDbMessages(user);

            });
            return () => unsubscribe();
        }, []);
        useEffect(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 min-h-0 overflow-auto px-30">
                {messages.length === 0 ? (
                    <div className="flex justify-center">
                        <Lottie
                            animationData={AiBotAnimation}
                            loop
                            style={{ width: 350, height: 350 }}
                        />
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <Message
                                key={msg.id}
                                text={msg.content}
                                isUser={msg.role === "user"}
                                userName={msg.role === "user" ? "Me" : "Voxy"}
                            />
                        ))}
                        <div ref={bottomRef} />
                    </>
                )}
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center py-4">
                <Microphone />
            </div>
        </div>
    );
}
