import ChatArea from "../components/ChatArea";
import ChatList from "../components/ChatList";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { ChatContext } from "../context/ChatContext";
import { useContext } from "react";

const Chat = () => {
  const data = useContext(ChatContext);
  // console.log(data.selectedChat)
  return (
    <div className="h-screen w-full  ">
      <div className="flex w-full h-full items-center justify-center">
        <ChatList />
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;
