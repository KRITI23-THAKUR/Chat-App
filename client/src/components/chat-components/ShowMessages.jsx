import ChatBubble from "./ChatBubble";

const ShowMessages = ({ messages }) => {
  return (
    <div className="">
      {messages?.map((m) => {
        return <ChatBubble key={m._id} message={m}/>
      })}

      {/* <div className="chat chat-start">
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">2 hour ago</time>
        </div>
        <div className="chat-bubble chat-end chat">I loved you.</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div> */}
    </div>
  );
};

export default ShowMessages;
