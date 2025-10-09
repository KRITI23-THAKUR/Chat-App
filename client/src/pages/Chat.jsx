import ChatArea from "../components/ChatArea";
import ChatList from "../components/ChatList";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
const Chat = () => {
  const { selectedChat } = useContext(ChatContext);
  return (
    <div className="h-screen w-full  ">
      <div className="flex w-full h-full items-center justify-center">
        <ChatList />
        {selectedChat && Object.keys(selectedChat).length > 0 ? (
          <ChatArea />
        ) : (
          <NoConversationPlaceholder />
        )}
      </div>
    </div>
  );
};

export default Chat;
