import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import useApi from "../../hooks/useApi";
import ShowMessages from "./ShowMessages";
import MessageForm from "./MessageForm";
import ProfilePicture from "../profile/ProfilePicture";
import NoMessagesPlaceholder from "./NoMessagesPlaceholder";

const LIMIT = 50;

const ChatArea = () => {
  const { messages, setMessages, selectedChat, otherUser } =
    useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [fetching, setFetching] = useState(false);
  const { request, loading } = useApi();

  const chatContainerRef = useRef(null);
  const scrollToBottomFlag = useRef(true);

  // Fetch messages from backend
  const fetchMessages = async (pageNumber = 1) => {
    if (!selectedChat?._id || fetching) return;

    setFetching(true);
    try {
      const response = await request({
        endPoint: `/chat/messages/${selectedChat._id}?page=${pageNumber}&limit=${LIMIT}`,
      });

      if (response?.messages?.length > 0) {
        if (pageNumber === 1) {
          // Initial load → scroll to bottom
          setMessages(response.messages.reverse());
          scrollToBottomFlag.current = true;
        } else {
          // Load older messages → prepend and preserve scroll
          const prevScrollHeight = chatContainerRef.current.scrollHeight;
          setMessages(prev => [...response.messages.reverse(), ...prev]);
          setTimeout(() => {
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight - prevScrollHeight;
          }, 50);
        }

        setHasMorePage(response.hasMorePage);
        setPage(pageNumber);
      } else {
        setHasMorePage(false);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setFetching(false);
    }
  };

  // Load messages when chat changes
  useEffect(() => {
    if (!selectedChat?._id) return;
    setMessages([]);
    setPage(1);
    setHasMorePage(true);
    fetchMessages(1);
  }, [selectedChat]);

  // Scroll to bottom for initial load
  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (scrollToBottomFlag.current && page === 1) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        scrollToBottomFlag.current = false;
      }, 50);
    }
  }, [messages, page]);

  // Infinite scroll → load older messages
  const handleScroll = () => {
    if (!chatContainerRef.current || fetching || !hasMorePage) return;
    if (chatContainerRef.current.scrollTop === 0) {
      fetchMessages(page + 1);
    }
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMorePage, fetching]);

  // Send message
  const SubmitMessage = async (e) => {
    e.preventDefault();
    const response = await request({
      endPoint: `/chat/message/${selectedChat._id}`,
      method: "POST",
      body: { message },
    });
    if (response?.success) {
      setMessages(prev => [...prev, response.content]);
      setMessage("");

      // Scroll to bottom after sending
      setTimeout(() => {
        if (chatContainerRef.current)
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 50);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {messages?.length === 0 ? (
        <NoMessagesPlaceholder />
      ) : (
        <div className="max-h-[90%] flex flex-col flex-1 bg-background">
          {/* Chat Header */}
          <header className="flex items-center gap-2 px-10 mt-5 text-card-foreground">
            <ProfilePicture
              user={otherUser}
              profilePicture={otherUser?.profilePicture}
            />
            <span className="font-semibold">{otherUser?.name}</span>
          </header>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-5 pt-2 flex flex-col"
          >
            {fetching && page > 1 && (
              <p className="text-center text-gray-500 text-sm py-2">
                Loading older messages...
              </p>
            )}
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