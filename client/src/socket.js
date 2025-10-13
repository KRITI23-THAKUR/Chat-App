import {io} from "socket.io-client"

export const socket=io(import.meta.env.VITE_SERVER_URI,{
    transports:["websocket"],
    withCredentials:true
})