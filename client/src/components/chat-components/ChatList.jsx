import Connections from "./Connections";
import SearchBar from "../search/SearchBar";
import Profile from "../profile/Profile";
import { MessageSquare } from "lucide-react";
const ChatList = () => {
  return (
    <div className="h-full md:w-[35%] hidden md:flex flex-col bg-background text-foreground/90 px-2 py-4">
      <SearchBar />
      <h2 className="text-lg flex items-center gap-2 px-6 font-bold mt-6">
        <MessageSquare size={18} color="pink" /> Chats
      </h2>
      <div className="flex-1 custom-scrollbar-hide overflow-y-auto">
        <Connections />
      </div>
      <div className=" bottom-1 mx-2 rounded p-2 ">
        <Profile />
      </div>
    </div>
  );
};

export default ChatList;
