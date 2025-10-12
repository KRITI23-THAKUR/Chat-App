import { MessageSquareIcon } from "lucide-react";
import ProfilePicture from "../profile/ProfilePicture";

const NoMessagesPlaceholder = ({ otherUser }) => {
  return (
    <div className=" max-h-[90%] flex flex-col flex-1 bg-background">
      <header className="flex w-full items-center gap-2 px-10 mt-5  text-card-foreground">
        <ProfilePicture
          user={otherUser}
          profilePicture={otherUser?.profilePicture}
        />
        <span className="font-semibold">{otherUser?.name}</span>
      </header>{" "}
      <div className="flex flex-col bg-background justify-center items-center w-full h-full text-center">
        <div className="size-20 bg-card rounded-full flex items-center justify-center mb-6">
          <MessageSquareIcon className="size-10 text-cyan-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          No messages yet
        </h3>
        <p className="text-slate-400 max-w-md">
          Start the conversation by sending a message to your contact.
        </p>
      </div>
    </div>
  );
};

export default NoMessagesPlaceholder;
