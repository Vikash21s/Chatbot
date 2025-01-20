import { useRef } from "react";

const ChatForm = ({ setChatHistory }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";

        // Update chat history with user message
        setChatHistory((history) => [
            ...history,
            { role: "user", text: userMessage },
        ]);
        setTimeout(() => setChatHistory(history => [...history, {role: "model", text: "Thinking..."}]), 600)

    };

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input
                ref={inputRef} // Added ref
                type="text"
                placeholder="Message..."
                className="message-input"
                required
            />
            <button type="submit" className="material-symbols-rounded">
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;
