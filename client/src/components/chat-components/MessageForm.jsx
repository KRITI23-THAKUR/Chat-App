import { SendHorizontal } from "lucide-react";

const MessageForm = ({ setMessage, message, handleSubmitMessage, loading }) => {
  return (
    <div className="relative w-full items-center justify-center  px-3 flex  ">
      <form
        action=""
        onSubmit={(e) => handleSubmitMessage(e)}
        className=" w-[94%] gap-4 flex"
      >
        <input
          type="text"
          placeholder="your message.."
          value={message}
          className="
          input 
          w-full 
          rounded-2xl 
          font-semibold 
          px-4 
          py-2 
          shadow
          bg-accent/1 
         text-card-foreground 
          dark:bg-card/60 
          placeholder:text-neutral-400 
          dark:placeholder:text-neutral-500
          focus:outline-none 
          focus:ring-2 
          focus:ring-primary/20 
          focus:border-transparent 
          transition 
          duration-200
        "
          onChange={(e) => setMessage(e.target.value)}
        />

        <button>
          {loading ? (
            "sending"
          ) : (
            <SendHorizontal
              className="inline bg-accent-content rounded-full p-2 cursor-pointer"
              size={35}
              color="white"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
