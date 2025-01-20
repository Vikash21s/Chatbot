// import { useRef } from "react";

// const ChatForm = () => {
//     const inputRef = useRef();

//     const handleFromSubmit = (e) => {
//         e.preventDefault();
//         const userMessage = inputRef.current.value.trim();
//         if(!userMessage) return;

//         console.log(userMessage);
//     }

//     return (
//         <from action="#" className="chat-form" onSubmit={handleFromSubmit}>
//                     <input ref={inputRef} type="text" placeholder="Message..."
//                      className="message-input" required/>
//                      <button className="material-symbols-rounded">arrow_upward </ button>
//                 </from>
//     );
// };

// export default ChatForm 