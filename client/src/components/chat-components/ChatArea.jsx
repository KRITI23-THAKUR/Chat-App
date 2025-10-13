import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import useApi from "../../hooks/useApi";
import ShowMessages from "./ShowMessages";
import MessageForm from "./MessageForm";
import ProfilePicture from "../profile/ProfilePicture";
import NoMessagesPlaceholder from "./NoMessagesPlaceholder";
import { ArrowLeftIcon } from "lucide-react";

const ChatArea = () => {
  const {
    messages,
    selectedChat,
    setSelectedChat,
    otherUser,
    addMessage,
    updateConnections,
    updateSelectedChat,
  } = useContext(ChatContext);

  const [message, setMessage] = useState("");
  const { request, loading } = useApi();

  const SubmitMessage = async (e) => {
    e.preventDefault();

    const response = await request({
      endPoint: `/chat/message/${selectedChat._id}`,
      method: "POST",
      body: { message },
    });

    if (response?.success) {
      const newMsg = response.content;
      const chat = response.chat;
      addMessage(newMsg);
      updateConnections(newMsg, chat);
      updateSelectedChat(newMsg, chat);
      selectedChat?.newChat && setSelectedChat(response.chat);
      setMessage("");
    }
  };

  return (
    <div className="md:flex flex-col  h-full w-full">
      {messages?.length === 0 ? (
        <NoMessagesPlaceholder otherUser={otherUser} />
      ) : (
        <div className=" h-[90%] flex flex-col flex-1 bg-background">
          {/* Chat Header */}
          <header className="flex items-center gap-2 px-4 md:px-10 py-4 text-card-foreground">
            <ArrowLeftIcon
              className="md:hidden text-foreground cursor-pointer"
              onClick={() => setSelectedChat(null)}
            />
            <ProfilePicture
              user={otherUser}
              profilePicture={otherUser?.profilePicture}
            />
            <span className="font-semibold">{otherUser?.name}</span>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto md:px-5 pt-2">
            <ShowMessages messages={messages} />
          </div>
        </div>
      )}

      {/* Message Input */}
      <MessageForm
        setMessage={setMessage}
        message={message}
        handleSubmitMessage={SubmitMessage}
        loading={loading}
      />
    </div>
  );
};

export default ChatArea;