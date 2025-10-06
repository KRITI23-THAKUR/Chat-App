import { useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import ConnectionUserList from "./chat-components/ConnectionUserList";
import { ChatContext } from "../context/ChatContext";
const Connections = () => {
  const {setSelectedChat } = useContext(ChatContext);
  const { request } = useApi();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const response = await request({
        endPoint: "/chat/connections",
        method: "GET",
      });
      setConnections(response.connections || []);
    };
    fetchConnections();
  }, [request]);

  return (
    <div className="w-full h-[90vh] max-w-md mx-auto bg-gray-900 text-white rounded-2xl shadow-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold text-gray-100 mb-3">Connections</h2>

      {connections.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          No connections yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {connections.map((chat) => (
            <li
              onClick={() => setSelectedChat(chat)}
              key={chat._id}
              className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-xl cursor-pointer"
            >
              <ConnectionUserList users={chat?.users} />
              <div className="text-gray-400 text-sm truncate ml-3 max-w-[60%]">
                {chat?.lastMessage?.message || "No messages yet"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Connections;
