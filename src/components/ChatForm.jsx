import { useRef, useState } from "react";

const ChatForm = ({ setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUserMessageSubmit = async (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();

        if (!userMessage) {
            console.log("Please enter a message");
            return;
        }

        inputRef.current.value = ""; // Clear input field
        setIsSubmitting(true); // Disable input while waiting for response

        setChatHistory((history) => [
            ...history,
            { role: "user", text: userMessage },
            { role: "model", text: "Thinking..." },
        ]);

        // Call the API
        await generateBotResponse(userMessage);

        setIsSubmitting(false); // Re-enable input
    };

    return (
        <form className="chat-form" onSubmit={handleUserMessageSubmit}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Message..."
                className="message-input"
                required
                disabled={isSubmitting}
            />
            <button type="submit" className="material-symbols-rounded" disabled={isSubmitting}>
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;
