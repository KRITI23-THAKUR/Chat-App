import { createContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import {socket} from "../socket";

// eslint-disable-next-line react-refresh/only-export-components
export const ChatContext = createContext({
  selectedChat: {},
  setSelectedChat: () => {},
  messages: [],
  setMessages: () => {},
  connections: [],
  setConnections: () => {},
  otherUser: null,
  loading: false,
});

const PAGE = 1;
const LIMIT =  1000;

export const ChatProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [messages, setMessages] = useState([]);
  const otherUser = selectedChat?.users?.[0];
  const { request, loading } = useApi();

  const addMessage = (newMsg) =>
    setMessages((prev) => {
      const exists = prev.some((m) => m._id === newMsg._id);
      if (exists) return prev;
      return [...prev, newMsg];
    });

  const updateConnections = (newMsg, chat) => {
    if (!chat || !chat._id) return;
    setConnections((prev) => {
      const existingChat = prev.find((conn) => conn._id === chat._id);
      if (existingChat) {
        const updatedChat = { ...existingChat, lastMessage: newMsg };
        const filtered = prev.filter((conn) => conn._id !== updatedChat._id);
        return [updatedChat, ...filtered];
      }
      return [chat, ...prev];
    });
  };

  const updateSelectedChat = (newMsg, chat) =>
    setSelectedChat((prev) => {
      if (prev?._id === chat?._id) return { ...prev, lastMessage: newMsg };
      return prev;
    });

  useEffect(() => {
    const updateMessages = async (selectedChat) => {
      if (!selectedChat?._id) return;
      const response = await request({
        endPoint: `/chat/messages/${selectedChat._id}?page=${PAGE}&limit=${LIMIT}`,
      });
      response?.success && setMessages(response.messages);
    };
    updateMessages(selectedChat);
  }, [request, selectedChat]);

  useEffect(() => {
    const handleNewMessage = (response) => {
      const { newMessage, chat } = response;
      if (chat?._id === selectedChat?._id) addMessage(newMessage);

      updateConnections(newMessage, chat);
      updateSelectedChat(newMessage, chat);
    };
    socket.on("new-message", handleNewMessage);
    return () => socket.off("new-message", handleNewMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = {
    connections,
    setConnections,
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    otherUser,
    addMessage,
    updateConnections,
    updateSelectedChat,
    loading,
  };
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};
