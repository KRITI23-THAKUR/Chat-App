import { useState } from "react";
import { Upload } from "lucide-react";
import useApi from "../../hooks/useApi";
import { toast } from "sonner";

const EditProfilePicture = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { request,loading } = useApi();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // if (!profileImage) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("file", profileImage);

    const response = await request({
      endPoint: "/user/profile-picture",
      method: "PATCH",
      body: formData,
    });
    toast(response.message)

    console.log(response);
    setIsOpen(false);
  };

  return (
    <div
      data-theme="dark"
      className="flex items-end justify-end ml-10  bg-card  rounded-xl shadow-xl"
    >
      {/* Minimal upload icon button */}
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-circle btn-sm btn-primary tooltip"
        data-tip="Edit Profile Picture"
      >
        <Upload size={14} />
      </button>

      {/* Modal */}
      {isOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-300">
            <form method="dialog">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            <h3 className="font-semibold text-lg text-center mb-4">
              Edit Profile Picture
            </h3>

            <form
              onSubmit={submitHandler}
              className="flex flex-col items-center gap-4"
            >
              {/* Preview Image */}
              <div className="avatar">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" />
                  ) : (
                    <div className="flex items-center justify-center w-28 h-28 bg-base-100 text-sm text-gray-500 rounded-full">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered file-input-primary w-full"
              />
              <button
                type="submit"
                className="btn btn-primary w-full mt-2 hover:scale-105 transition-transform"
              >
              {loading?"uploading":"upload"}
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EditProfilePicture;
