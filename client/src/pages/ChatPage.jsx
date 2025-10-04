import  { useContext } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { AuthContext } from "../context/AuthContext";

const ChatPage = () => {

  const{auth,setAuth}=useContext(AuthContext)
  console.log(auth)
  return (
    <div className="w-full  flex items-center justify-center p-4 bg-slate-900 min-h-screen">
      <BorderAnimatedContainer>
       {auth?.user?.name}
        {/* <div className="text-center text-white  w-full ">{}</div>
        <div className="  text-center text-white  w-full h-[600px]">Right</div> */}
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
