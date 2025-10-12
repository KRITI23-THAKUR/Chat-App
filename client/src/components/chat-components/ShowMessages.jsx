import { useContext } from "react";
import ChatBubble from "./ChatBubble";
import { AuthContext } from "../../context/AuthContext";

const ShowMessages = ({ messages = [] }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col p-3 h-full custom-scrollbar-hide">
      {messages.length > 0 &&
        messages.map((m) => (
          <ChatBubble
            key={m._id}
            message={m}
            isOwn={m.sender._id === auth.user._id}
          />
        ))}
    </div>
  );
};

export default ShowMessages;