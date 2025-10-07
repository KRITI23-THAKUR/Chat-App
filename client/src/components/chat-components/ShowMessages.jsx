import { useContext } from "react";
import ChatBubble from "./ChatBubble";
import { AuthContext } from "../../context/AuthContext";

const ShowMessages = ({ messages }) => {
  const { auth } = useContext(AuthContext);
  const userId = auth?.user?._id;             

  return (
    <div className="flex flex-col gap-2 p-3 overflow-y-auto">
      {messages?.map((m) => (
        <ChatBubble
          key={m._id}
          message={m}
          isOwn={m.sender._id === userId}
        />
      ))}
    </div>
  );
};

export default ShowMessages;
