const ProfilePicture = ({ profilePicture }) => {
  return (
    <div>
      {profilePicture ? (
        <img
          src={profilePicture}
          alt="profile"
          className="w-6 h-6 object-cover rounded-full "
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold"></div>
      )}
    </div>
  );
};

export default ProfilePicture;
