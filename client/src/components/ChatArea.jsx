import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import useApi from "../hooks/useApi";
import ShowMessages from "./chat-components/ShowMessages";
import { AuthContext } from "../context/AuthContext";
import Message from "../components/TypeMessage";

const PAGE = 1;
const LIMIT = 50;

const ChatArea = () => {
  const { auth } = useContext(AuthContext);
  const { messages, setMessages } = useContext(ChatContext);

  const { request } = useApi();
  const { selectedChat } = useContext(ChatContext);
  useEffect(() => {
    const fetchMessage = async () => {
      if (!selectedChat?._id) return;
      const response = await request({
        endPoint: `/chat/messages/${selectedChat._id}?page=${PAGE}&limit=${LIMIT}`,
        method: "GET",
      });
      setMessages(response?.messages || []);
    };
    fetchMessage();
  }, [selectedChat, request, setMessages]);

  return (
    <div className=" h-full w-full bg-background flex flex-col">
      <div className="text-primary/70 font-bold px-6 py text-3xl font-sans ">
        {selectedChat?.users?.find((user) => user._id != auth?.user?._id)?.name}
      </div>

      <div className="p-2">
        <h2 className="text-2xl font-bold"></h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <ShowMessages messages={messages} />
      </div>
      <Message />
    </div>
  );
};
export default ChatArea;
