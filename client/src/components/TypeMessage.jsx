import { useContext, useState } from "react";
import useApi from "../hooks/useApi";
import { SendHorizontal } from "lucide-react";
import { ChatContext } from "../context/ChatContext";

const Message = () => {
  const { setMessages, otherUser } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  const { request, loading } = useApi();
  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await request({
      endPoint: `/chat/message/${otherUser._id}`,
      method: "POST",
      body: { message },
    });
    console.log(response);
    if (response?.message) {
      setMessages((prev) => [...prev, response.content]);
      setMessage("");
    }
  };

  return (
    <div className="relative w-full items-center justify-center  p-2 flex  ">
      <form action="" onSubmit={submitHandler} className=" w-[94%] gap-4 flex">
        <input
          type="text"
          placeholder="type a message.."
          value={message}
          className="input bg-card-foreground font-mono font-bold border-none rounded-full w-full"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button>
          {loading ? (
            "sending"
          ) : (
            <SendHorizontal className="inline" size={30} color="purple" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Message;
