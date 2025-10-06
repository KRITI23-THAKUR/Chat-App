import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import useApi from "../hooks/useApi";
import ShowMessages from "./chat-components/ShowMessages";

const PAGE = 1;
const LIMIT = 10;

const ChatArea = () => {
  const [messages, setMessages] = useState();
  const { request } = useApi();
  const { selectedChat } = useContext(ChatContext);
  console.log(selectedChat);

  useEffect(() => {
    const fetchMessage = async () => {
      if (!selectedChat?._id) return;
      const response = await request({
        endPoint: `/chat/messages/${selectedChat._id}?page=${PAGE}&limit=${LIMIT}`,
        method: "GET",
      });
      setMessages(response.messages);
    };
    fetchMessage();
  }, [selectedChat, request]);
  console.log(messages);

  return (
    <div className="h-full bg-black  text-white w-full">
      
      <ShowMessages messages={messages}/>
    </div>
  );
};

export default ChatArea;
