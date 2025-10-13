import { useContext, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { AuthContext } from "../../context/AuthContext";

const ShowMessages = ({ messages = {} }) => {
  const { auth } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col p-1 md:p-3 h-full custom-scrollbar-hide  overflow-y-auto">
      {messages.length > 0 &&
        messages.map((m) => (
          <ChatBubble
            key={m?._id}
            message={m}
            isOwn={m?.sender?._id === auth?.user?._id}
          />
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ShowMessages;