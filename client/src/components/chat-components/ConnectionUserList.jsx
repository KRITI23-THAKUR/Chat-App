import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ConnectionUserList = ({ users }) => {
  const { auth } = useContext(AuthContext);
  const user = users?.find((u) => u?._id !== auth?.user?._id);

  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
        {users.length === 1
          ? users[0].name.charAt(0).toUpperCase()
          : user?.name?.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-gray-100">
          {users.length === 1 ? users[0].name : user?.name}
        </span>
        <span className="text-xs text-gray-400">Online</span>
      </div>
    </div>
  );
};

export default ConnectionUserList;
