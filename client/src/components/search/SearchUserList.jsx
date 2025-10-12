import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import useApi from "../../hooks/useApi";

const SearchUserList = ({ users }) => {
  const { setSelectedChat } = useContext(ChatContext);
  const { request } = useApi();

  const handleSelectChat = async (user) => {
    const response = await request({
      endPoint: `/chat/${user._id}`,
    });
    console.log("r", response);
    if (response?.success && response?.chat) {
      setSelectedChat(response.chat);
    } else {
      setSelectedChat({
        _id: user._id,
        users: [user],
        newChat: true,
      });
    }
  };
  if (!users || users.length === 0) return null;

  return (
    <ul className=" w-full rounded-2xl bg-card-foreground text-card shadow-md h-[85%] overflow-y-auto">
      {users.map((user) => (
        <li
          key={user._id}
          onClick={() => handleSelectChat(user)}
          className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-all duration-150"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-400 flex items-center justify-center text-white font-semibold">
            {user.name?.[0]?.toUpperCase() || "?"}
          </div>

          <div className="flex flex-col">
            <span className="text-sm -mt-1 font-medium text-muted">
              @{user.name || "unknown"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchUserList;
