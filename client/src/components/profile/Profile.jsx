import EditProfilePicture from "./EditProfilePicture";
import ProfilePicture from "./ProfilePicture";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const Profile = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <ProfilePicture profilePicture={auth?.user?.profilePicture} />
          <span className="text-xl text-white ">{auth?.user?.name}</span>
        </div>
        <EditProfilePicture />
      </div>
    </div>
  );
};

export default Profile;
