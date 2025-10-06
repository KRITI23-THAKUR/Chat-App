import formatDateInWords from "../../utils/format-date";

const ChatBubble = ({ message }) => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-header">
          {message.sender.name}
          <time className="text-xs opacity-50">{formatDateInWords(message.createdAt)}</time>
        </div>
        <div className="chat-bubble bg-slate-900 text-white">{message.message}</div>
        <div className="chat-footer opacity-50">Seen</div>
      </div>
    </div>
  );
};

export default ChatBubble;
