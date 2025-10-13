import Connections from "./Connections";
import SearchBar from "../search/SearchBar";
import { MessageSquare } from "lucide-react";
import ProfileBadgeModal from "../profile/ProfileModal";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
const ChatList = () => {
  const { selectedChat } = useContext(ChatContext);
  return (
    <div
      className={`h-full md:w-[35%] w-full md:flex flex-col bg-background text-foreground/90 px-2 py-4 ${
        selectedChat && Object.keys(selectedChat).length > 0
          ? "hidden md:flex "
          : "flex "
      } `}
    >
      <SearchBar />
      <h2 className="text-lg flex items-center gap-2 px-3.5 md:px-6 font-bold mb-2 mt-6">
        <MessageSquare size={18} color="pink" /> Chats
      </h2>
      <div className="flex-1 custom-scrollbar-hide overflow-y-auto">
        <Connections />
      </div>
      <div className=" bottom-1 mx-2 rounded p-2 ">
        <ProfileBadgeModal />
      </div>
    </div>
  );
};

export default ChatList;