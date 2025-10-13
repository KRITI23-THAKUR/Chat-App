import { Server } from "socket.io";

export let io = null;
export const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URI,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("register", (user) => {
      if (!user?._id) return;
      onlineUsers.set(user._id, { socketId: socket.id, user });
      console.log(`💥 ${user.name} is ONLINE (socket: ${socket.id})`);

      io.emit(
        "online-users",
        Array.from(onlineUsers.values()).map((v) => v.user)
      );
    });

    socket.on("disconnect", () => {
      let disconnectedUserId = null;
      for (const [userId, { socketId }] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          console.log(`❌ User ${userId} went offline`);
          break;
        }
      }
      io.emit(
        "online-users",
        Array.from(onlineUsers.values()).map((v) => v.user)
      );
    });
  });
};
