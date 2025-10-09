import { useContext, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
const ShowMessages = ({ messages = {} }) => {
  const { auth } = useContext(AuthContext);
  const userId = auth?.user?._id;
  const messagesArray = Object.values(messages);

  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  console.log(messagesArray);
  return (
    <div ref={containerRef} className="flex flex-col gap-2 p-3 overflow-y-auto">
      {messagesArray?.map((m) => (
        <ChatBubble
          key={m?._id}
          message={m}
          isOwn={m?.sender?._id === userId}
        />
      ))}
    </div>
  );
};

export default ShowMessages;
