import { useRef, useState } from "react";

const ChatForm = ({ setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state

    const handleUserMessageSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();

        if (!userMessage) {
            // Optionally, show a message indicating the input is empty.
            console.log("Please enter a message");
            return;
        }

        inputRef.current.value = ""; // Clear input field
        setIsSubmitting(true); // Disable input while waiting for response

        setChatHistory((history) => {
            const updatedHistory = [
                ...history,
                { role: "user", text: userMessage },
                { role: "model", text: "Thinking..." },
            ];

            generateBotResponse(updatedHistory); // Directly call to avoid delay
            return updatedHistory;
        });
    };

    return (
        <form className="chat-form" onSubmit={handleUserMessageSubmit}>
            <input
                ref={inputRef}
                type="text"
                placeholder="Message..."
                className="message-input"
                required
                disabled={isSubmitting} // Disable input while waiting for response
            />
            <button type="submit" className="material-symbols-rounded" disabled={isSubmitting}>
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;
