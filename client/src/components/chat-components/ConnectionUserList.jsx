import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProfilePicture from "../profile/ProfilePicture";

const ConnectionUserList = ({ users }) => {
  const { auth } = useContext(AuthContext);
  const user = users?.find((u) => u?._id !== auth?.user?._id);

  return (
    <div className="flex items-center space-x-3">
      <ProfilePicture
        profilePicture={
          users?.length === 1 ? users[0]?.profilePicture : user?.profilePicture
        }
      />
      <div className="flex flex-col">
        <span className="font-medium text-foreground">
          {users?.length === 1 ? users[0]?.name : user?.name}
        </span>
      </div>
    </div>
  );
};

export default ConnectionUserList;
