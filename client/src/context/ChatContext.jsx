import { createContext, useState } from "react";

export const ChatContext = createContext({
  selectedChat: {},
  setSelectedChat: () => {},
  messages: [],
  setMessages: () => {},
});

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({});
  const [messages, setMessages] = useState([]);

  const otherUser = selectedChat?.users?.[0];
  const data = {
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    otherUser,
  };
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};
