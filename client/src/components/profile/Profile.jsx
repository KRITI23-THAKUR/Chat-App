import { useContext } from "react";
import { LogOut, XIcon } from "lucide-react";

import EditProfilePicture from "./EditProfilePicture";
import ProfilePicture from "./ProfilePicture";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Profile = () => {
  const { auth, logout } = useContext(AuthContext);
  const { toggleTheme } = useTheme();

  return (
    <div className="bg-card p-2 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between gap-4">
        {/* Profile Info */}
        <div className="flex items-center gap-2">
          <ProfilePicture profilePicture={auth?.user?.profilePicture} />
          <span className=" font-semibold ">{auth?.user?.name}</span>
        </div>

        {/* Edit and Logout */}
        <div className="flex items-center gap-2">
          <EditProfilePicture />
          <button onClick={toggleTheme}>
            <XIcon />
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;