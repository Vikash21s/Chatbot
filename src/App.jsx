import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
    const [chatHistory, setChatHistory] = useState([]); // Correct state initialization
    const [showChatbot, setShowChatbot] = useState(false); // Boolean value
    const chatBodyRef = useRef();

    const generateBotResponse = async (history) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}`,
                {
                    contents: [{ role: "user", parts: [{ text: history }] }],
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const apiResponseText =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No response from API.";
            setChatHistory((prev) =>
                prev.map((msg) =>
                    msg.text === "Thinking..."
                        ? { role: "model", text: apiResponseText }
                        : msg
                )
            );
        } catch (error) {
            console.error("Error fetching API response:", error);
            setChatHistory((prev) =>
                prev.map((msg) =>
                    msg.text === "Thinking..."
                        ? {
                            role: "model",
                            text: "Something went wrong. Try again later.",
                        }
                        : msg
                )
            );
        }
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chatHistory]);

    return (
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
            <button
                onClick={() => {
                    setShowChatbot((prev) => !prev);
                    console.log("Show chatbot toggled:", !showChatbot);
                }}
                id="chatbot-toggler"
            >
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-rounded">close</span>
            </button>
            <div className="chatbot-popup">
                <div className="chat-header">
                    <div className="header-info">
                        <ChatbotIcon />
                        <h2 className="logo-text">Chatbot</h2>
                    </div>
                    <button  
                        onClick={() => {
                            setShowChatbot((prev) => !prev);
                            console.log("Show chatbot toggled:", !showChatbot);
                        }}
                    className="material-symbols-rounded">
                        keyboard_arrow_down
                    </button>
                </div>

                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <ChatbotIcon />
                        <p className="message-text">
                            Hey there ✨ <br /> How can I help you today?
                        </p>
                    </div>

                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                </div>

                <div className="chat-footer">
                    <ChatForm
                        setChatHistory={setChatHistory}
                        generateBotResponse={generateBotResponse}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
