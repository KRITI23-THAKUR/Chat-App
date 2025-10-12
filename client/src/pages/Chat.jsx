import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import NoConversationPlaceholder from "../components/chat-components/NoConversationPlaceholder";
import ChatList from "../components/chat-components/ChatList";
import ChatArea from "../components/chat-components/ChatArea";
const Chat = () => {
  const { selectedChat } = useContext(ChatContext);
  return (
    <div className="h-screen w-full">
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
