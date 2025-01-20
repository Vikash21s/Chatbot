import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({chat}) => {
    return (
        <div className={`message ${chat.role=== "mode" ? "bot" : "user"}-message`}>
            {chat.role=== "model" && <ChatbotIcon />}
            <p className="message-text">{chat.text}</p>
         </div>
    );
};

export default ChatMessage;