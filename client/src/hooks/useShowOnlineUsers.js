import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function useShowOnlineUsers(onlineUsers, auth) {
  const prevOnlineUsersRef = useRef([]);
  useEffect(() => {
    const prevUsers = prevOnlineUsersRef.current;
    const prevIds = prevUsers.map((u) => u._id);
    const newIds = onlineUsers.map((u) => u._id);

    // find newly online users
    const newOnline = onlineUsers.filter((u) => !prevIds.includes(u._id));
    // find users who went offline
    const wentOffline = prevUsers.filter((u) => !newIds.includes(u._id));

    // show toasts
    newOnline.forEach((u) => {
      if (u._id !== auth?.user?._id) {
        toast.success(`${u.name} is now online 🟢`);
      }
    });

    wentOffline.forEach((u) => {
      if (u._id !== auth?.user?._id) {
        toast.info(`${u.name} went offline 🔴`);
      }
    });

    prevOnlineUsersRef.current = onlineUsers;
  }, [onlineUsers, auth?.user?._id]);
}
