"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import {useSettingsStore} from "@/store/settingsStore";
import {useChatStore} from "@/store/chatStore";
import {speakAi} from "@/utils/voiceSpeaking/speakAi";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/aiLoading.json";
import {getOrCreateConversationId}from "@/utils/conversationTransaction";
import {UserNameConstants} from "@/constants/userNameConstants";
import { auth } from "@/lib/firabase/firebase";
import {toast} from "sonner";

const Microphone = () => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const {
        addUserMessage,
        addAiMessage,
        messages
    } = useChatStore();
    const {
        difficulty,
        topic
    } = useSettingsStore();

    const handleClick = async () => {
       try {
           if (!isRecording) {
               debugger;
               const stream = await navigator.mediaDevices.getUserMedia({
                   audio: true,
               });

               const mediaRecorder = new MediaRecorder(stream);

               mediaRecorder.ondataavailable = (event) => {
                   audioChunksRef.current.push(event.data);
               };

               mediaRecorder.onstop = async () => {
                   const audioBlob = new Blob(audioChunksRef.current, {
                       type: "audio/webm",
                   });

                   audioChunksRef.current = [];

                   // const formData = new FormData();
                   // formData.append("file", audioBlob, "audio.webm");
                   // formData.append("difficulty", difficulty);
                   // formData.append("topic", topic);
                   // formData.append("history", JSON.stringify(messages.slice(-6)));

                   const transcribeFormData = new FormData();
                   transcribeFormData.append("file", audioBlob, "audio.webm");

                   const response = await fetch("/api/transcribe", {
                       method: "POST",
                       body: transcribeFormData,
                   });

                   const transcribeResponse = await response.json();
                   const userText:string = transcribeResponse.text;
                   if(userText){
                       addUserMessage(userText);
                   }
                   const updatedHistory = [
                       ...messages.slice(-5),
                       { role: UserNameConstants.User, content: userText }
                   ];
                   const conversationId = getOrCreateConversationId();
                   const token = await auth.currentUser?.getIdToken();

                   const generateRes = await fetch("/api/generate", {
                       method: "POST",
                       headers:{
                           "Content-Type": "application/json",
                           "Authorization": `Bearer ${token}`
                       },
                       body: JSON.stringify({
                           history: updatedHistory,
                           difficulty,
                           topic,
                           conversationId,
                       }),
                   });

                   if (!generateRes.ok) {
                       const err = await generateRes.json();
                       setIsLoading(false);
                       toast.error(err.error);
                       return;
                   }
                   console.log(generateRes);
                   const generateData = await generateRes.json();
                   if(generateData.aiText){
                        addAiMessage(generateData.aiText);
                        speakAi(generateData.aiText);

                        setIsLoading(false);
                   }

                   // if (data?.userText && data?.aiText) {
                   //     addUserMessage(data.userText);
                   //     addAiMessage(data.aiText);
                   //
                   //     speakAi(data.aiText);
                   //     setIsLoading(false);
                   // }
               };

               mediaRecorder.start();
               mediaRecorderRef.current = mediaRecorder;
               setIsRecording(true);
           } else {
               mediaRecorderRef.current?.stop();
               setIsRecording(false);
               setIsLoading(true);
           }
       }catch (error) {
           console.log("error", error);
       }finally {

       }
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">

                {isRecording && (
                    <motion.div
                        className="absolute w-24 h-24 rounded-full bg-[#4c78fa]/30 blur-sm"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                )}
                {isLoading ? (
                    <div className="relative">
                        <Lottie
                            animationData={loadingAnimation}
                            loop
                            style={{ width: 120, height: 120 }}
                        />
                    </div>
                ) : (
                    <motion.button
                        onClick={handleClick}
                        className="relative z-10 bg-[#4c78fa] p-6 rounded-full text-white cursor-pointer"
                        animate={isRecording ? { scale: 1.1 } : { scale: 1 }}
                    >
                        {isRecording ? <FaPause size={28} /> : <FaMicrophone size={28} />}
                    </motion.button>
                )}
            </div>

            <motion.span
                className={`${isLoading ? "" : "mt-5"} text-sm text-muted-foreground`}
                animate={{ opacity: isRecording ? 1 : 0.7 }}
            >
                {isLoading ? "Thinking..." : isRecording ? "Recording..." : "Tap to speak"}
            </motion.span>
        </div>
    );
};

export default Microphone;