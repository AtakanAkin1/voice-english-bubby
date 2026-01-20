import React from "react";
import Message from "@/components/chats/Message";
import Microphone from "@/components/voices/Microphone";
import {UserNameConstants} from "@/constants/UserNameConstants";

export default function Home() {
    return (
      <div className="flex flex-col flex-1">
          {/* Chat Messages */}
          <div className="flex-1 overflow-auto px-30">
              <Message text="Hello, I am a chat!" isUser={true} userName={UserNameConstants.You} />
              <Message text="Hello, how can I help you?" isUser={false} userName={UserNameConstants.Voxy} />
              <Message text="Can I speak English ?" isUser={true} userName={UserNameConstants.You} />
              <Message text="Of course, Where you english study ?" isUser={false} userName={UserNameConstants.Voxy} />
          </div>

          {/* Mic Button */}
          <div className="flex flex-col items-center justify-center py-4">
              <Microphone />
              <span className="font-inter pt-5">Hold on speak</span>
          </div>
      </div>
  );
}
