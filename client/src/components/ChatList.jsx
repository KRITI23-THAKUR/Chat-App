import Connections from "./Connections";
import SearchBar from "./search/SearchBar";

const ChatList = () => {
  return (
    <div className="h-full md:w-[30%] hidden md:flex flex-col bg-gray-900 border-r border-gray-800 p-4">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-white mb-3">Chats</h1>
        <SearchBar />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <Connections />
      </div>
    </div>
  );
};

export default ChatList;
