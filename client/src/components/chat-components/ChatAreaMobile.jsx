import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import useApi from "../../hooks/useApi";
import ShowMessages from "./ShowMessages";
import MessageForm from "./MessageForm";
import ProfilePicture from "../profile/ProfilePicture";
import NoMessagesPlaceholder from "./NoMessagesPlaceholder";
import { ArrowLeft } from "lucide-react";

const ChatAreaMobile = () => {
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
    <div className="flex flex-col h-full w-full bg-background">
      {messages?.length === 0 ? (
        <NoMessagesPlaceholder otherUser={otherUser} />
      ) : (
        <div className="flex flex-col flex-1">
          {/* Header with back button */}
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
            <button
              onClick={() => setSelectedChat(null)}
              className="flex items-center justify-center text-foreground"
            >
              <ArrowLeft size={20} />
            </button>
            <ProfilePicture
              user={otherUser}
              profilePicture={otherUser?.profilePicture}
            />
            <span className="font-medium text-sm truncate">
              {otherUser?.name}
            </span>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 pt-2 pb-16">
            <ShowMessages messages={messages} />
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-background">
        <MessageForm
          setMessage={setMessage}
          message={message}
          handleSubmitMessage={SubmitMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChatAreaMobile;
