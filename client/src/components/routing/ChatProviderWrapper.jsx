import { Outlet } from "react-router-dom";
import { ChatProvider } from "../../context/ChatContext";

const ChatProviderWrapper = () => {
  return (
    <ChatProvider>
      <Outlet />
    </ChatProvider>
  );
};

export default ChatProviderWrapper;
