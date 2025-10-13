import formatDateInWords from "../../utils/format-date";

const ChatBubble = ({ message, isOwn }) => {
  if (!message) return null;
  return (
    <div className={`chat px-3 md:pr-6 ${isOwn ? "chat-end" : "chat-start"}`}>
      <div className="chat-footer flex text-accent  items-center gap-2">
        <time className="text-[9px] text-card-foreground/70 opacity-50">
          {formatDateInWords(message.createdAt)}
        </time>
      </div>

      <div
        className={`chat chat-bubble chat-bubble-ghost text-sm  px-4 py-2 rounded-2xl ${
          isOwn ? "bg-card text-foreground" : "bg-accent-content text-white"
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default ChatBubble;