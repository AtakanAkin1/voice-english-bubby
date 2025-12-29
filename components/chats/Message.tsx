import React from 'react';

interface  MessageProps {
    text: string;
    isUser: boolean;
    userName?: string;
}
const Message = (props: MessageProps) => {
    const { text, isUser, userName } = props;
    return (
        <div
            className={`flex items-center gap-2 mb-3 ${
                isUser ? "self-end flex-row-reverse" : "self-start"
            }`}
        >
            {/* Username bubble */}
            <div
                className={`px-2 py-2 rounded-lg ${
                    isUser ? "bg-gray-100 font-inter" : "bg-blue-500 text-white font-inter"
                }`}
            >
                {userName}
            </div>

            {/* Message bubble */}
            <div
                className={`px-3 py-2 rounded-lg max-w-[300px]  ${
                    isUser ? "bg-gray-100 font-nunito" : "bg-blue-500 text-white font-nunito"
                }`}
            >
                {text}
            </div>
        </div>
    );
};

export default Message;