import EditProfilePicture from "./EditProfilePicture";
import ProfilePicture from "./ProfilePicture";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {LogOut} from "lucide-react";
const Profile = () => {
  const { auth ,logout} = useContext(AuthContext);
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <ProfilePicture profilePicture={auth?.user?.profilePicture} />
          <span className="text-xl text-white ">{auth?.user?.name}</span>
        </div>
        <EditProfilePicture />
        <button onClick={logout}><LogOut /></button>
      </div>
    </div>
  );
};

export default Profile;
