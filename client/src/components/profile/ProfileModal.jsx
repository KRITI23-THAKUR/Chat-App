import { useState, useContext } from "react";
import { LogOut, Moon, Sun, X } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import useApi from "../../hooks/useApi";
import { toast } from "sonner";

const ProfileBadgeModal = () => {
  const { auth, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { request, loading } = useApi();

  // ✅ handle upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!profileImage) return toast.error("Please select an image first.");

    const formData = new FormData();
    formData.append("file", profileImage);

    const response = await request({
      endPoint: "/user/profile-picture",
      method: "PATCH",
      body: formData,
    });

    toast.success(response.message || "Profile updated successfully!");
    setIsOpen(false);
  };

  return (
    <>
      {/* 🟢 Profile Badge Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer flex-shrink-0 w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary hover:ring-4 hover:scale-105 transition-all duration-200 shadow-md"
      >
        <img
          src={auth?.user?.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      {/* 🟣 Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl shadow-2xl w-11/12 max-w-sm p-6 relative animate-in fade-in zoom-in duration-200 border border-border">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition"
            >
              <X size={20} />
            </button>

            {/* Profile Section */}
            <div className="flex flex-col items-center gap-3 mt-2">
              <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary ring-offset-2 ring-offset-background shadow-md">
                <img
                  src={
                    previewImage ||
                    auth?.user?.profilePicture ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-semibold text-lg">
                {auth?.user?.name || "User"}
              </h2>

              {/* File Input */}
              <label className="cursor-pointer flex flex-col items-center text-sm font-medium text-primary hover:underline">
                Change Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-4"></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium">
                {theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"}
              </span>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Save Button */}
            {profileImage && (
              <button
                onClick={submitHandler}
                disabled={loading}
                className="btn btn-primary w-full mt-3"
              >
                {loading ? "Uploading..." : "Save Changes"}
              </button>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBadgeModal;