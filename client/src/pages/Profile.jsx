import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [imageUploading, setImageUploading] = useState(false);

  const handleFileUpload = async (file) => {
  try {
    setImageUploading(true);
    const data = new FormData();
    data.append("avatar", file);

    const res = await fetch("/server/auth/upload-avatar", {
      method: "POST",
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const result = await res.json();
    setImageUploading(false);

    if (result.success) {
      console.log("Uploaded Image URL:", result.url);
      setFormData((prev) => ({ ...prev, avatar: result.url }));
    }
  } catch (error) {
    setImageUploading(false);
    console.error("Upload failed:", error.message);
  }
};

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Dispatch update profile API logic here
  };

  return (
    <div className="p-3 max-w-lg mx-auto my-10">
      {/* Single Controlled Hidden File Input */}
      <input
        type="file"
        ref={fileRef}
        hidden
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Manage Your Details
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Profile</h1>
          <p className="text-xs text-gray-500 mt-2">
            Update your account settings and personal photo.
          </p>
        </div>

        {/* Profile Image with Dynamic State & Loading Indicator */}
        <div className="self-center flex flex-col items-center gap-2">
          <img
            onClick={() => fileRef.current.click()}
            src={
              formData.avatar ||
              currentUser?.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="profile"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }}
            className="rounded-full h-24 w-24 object-cover cursor-pointer border-2 border-gray-200 shadow-sm hover:opacity-80 transition-all"
          />
          {imageUploading && (
            <p className="text-xs text-blue-600 font-medium animate-pulse">
              Uploading image...
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-xs font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              defaultValue={currentUser?.username}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-slate-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              id="email"
              defaultValue={currentUser?.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-slate-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              id="password"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm focus:outline-slate-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-900 text-white rounded-xl p-3 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all mt-2"
          >
            Update Profile
          </button>
        </form>

        <div className="flex justify-between items-center pt-2 text-xs font-semibold">
          <button
            type="button"
            className="text-red-600 hover:underline transition-all"
          >
            Delete Account
          </button>
          <button
            type="button"
            className="text-red-600 hover:underline transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}