import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { connectdb } from "./config/db.js";
import http from "http";
import { initSocket } from "./socket/socket.js";

const server = http.createServer(app);
initSocket(server);

connectdb();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
