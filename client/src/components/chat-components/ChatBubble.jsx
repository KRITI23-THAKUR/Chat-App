import formatDateInWords from "../../utils/format-date";

const ChatBubble = ({ message, isOwn }) => {
  return (
    <div className={`chat p-2 ${isOwn ? "chat-end" : "chat-start"}`}>
      <div className="chat-header flex text-accent font-bold items-center gap-1">
        {!isOwn && <span>{message.sender.name}</span>}
        <time className="text-xs text-accent opacity-50">
          {formatDateInWords(message.createdAt)}
        </time>
      </div>

      <div
        className={`chat-bubble ${
          isOwn
            ? "bg-card text-foreground"
            : "bg-card-foreground font-sans text-card"
        }`}
      >
        {message.message}
      </div>

      <div className="chat-footer opacity-50 text-xs">
        {isOwn ? "Seen" : ""}
      </div>
    </div>
  );
};

export default ChatBubble;
