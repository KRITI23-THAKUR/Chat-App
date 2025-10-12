import { useEffect, useState } from "react";
import { socket } from "../socket";


export default function useSocket(user) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user) return;
    socket.emit("register", user);

    const handleOnlineUsers = (users) => setOnlineUsers(users);
    socket.on("online-users", handleOnlineUsers);

    return () => socket.off("online-users", handleOnlineUsers);
  }, [user]);
  return { socket, onlineUsers };
}
