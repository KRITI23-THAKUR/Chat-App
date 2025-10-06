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
  const data = { selectedChat, setSelectedChat, messages, setMessages };
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};
