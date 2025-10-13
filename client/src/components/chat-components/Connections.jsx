import { useContext, useEffect } from "react";
import useApi from "../../hooks/useApi";
import ConnectionUserList from "./ConnectionUserList";
import { ChatContext } from "../../context/ChatContext";
import { useTheme } from "../../context/ThemeContext";

const Connections = () => {
  const { connections, setConnections, setSelectedChat } =
    useContext(ChatContext);

  const { request } = useApi();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchConnections = async () => {
      const response = await request({
        endPoint: "/chat/connections",
        method: "GET",
      });
      setConnections(response?.connections || []);
    };
    fetchConnections();
  }, [request, setConnections]);

  useEffect(() => {
    setConnections((prev) => {
      const seen = new Set();
      return prev.filter((conn) => {
        if (seen.has(conn._id)) return false;
        seen.add(conn._id);
        return true;
      });
    });
  }, [setConnections]);

  return (
    <>
      <div className="w-full max-h-[90vh] mx-auto text-white rounded px-2 py-2 space-y-2">
        {connections.length === 0 ? (
          <p className="text-card-foreground px-4 text-sm py-6">
            No connections yet
          </p>
        ) : (
          <ul className="space-y-2">
            {connections.map((chat) => (
              <li
                onClick={() => setSelectedChat(chat)}
                key={chat?._id}
                className={`flex flex-col h-16 justify-between bg-card/50  
                 transition-colors p-3 rounded-xl cursor-pointer
                ${theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-800"}
                `}
              >
                <ConnectionUserList users={chat?.users} />
                <div className="text-card-foreground text-xs truncate ml-9.5 -mt-1 italic max-w-[60%]">
                  {chat?.lastMessage?.message || "No messages yet"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Connections;