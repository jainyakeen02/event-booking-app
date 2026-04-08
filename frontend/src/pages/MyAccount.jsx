import { useEffect, useState } from "react";
import axios from "axios";

function MyAccount() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    profilePic: "",
    email: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");
  const baseURL = "http://localhost:5000";

  const getInitial = (name) => {
    if (!name) return "U";
    return name.trim().charAt(0).toUpperCase();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fullProfilePic = data.profilePic
          ? `${baseURL}${data.profilePic}`
          : "";

        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          bio: data.bio || "",
          profilePic: data.profilePic || "",
          email: data.email || "",
          role: data.role || "",
        });

        setPreview(fullProfilePic);
      } catch (error) {
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/profile`,
        {
          name: formData.name,
          phone: formData.phone,
          bio: formData.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(data.message || "Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      setMessage("Please choose an image first");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const uploadData = new FormData();
      uploadData.append("profilePic", selectedFile);

      const { data } = await axios.put(
        `${baseURL}/api/users/profile/photo`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        profilePic: data.profilePic,
      }));

      setPreview(`${baseURL}${data.profilePic}`);
      setSelectedFile(null);
      setMessage(data.message || "Profile photo uploaded successfully");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to upload profile photo"
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Account</h1>

        {message && (
          <div className="mb-4 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl px-4 py-3">
            {message}
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = document.getElementById("fallback-avatar");
                if (fallback) fallback.style.display = "flex";
              }}
              className="w-32 h-32 rounded-full object-cover border-4 border-red-100 shadow-lg"
            />
          ) : null}

          <div
            id="fallback-avatar"
            style={{ display: preview ? "none" : "flex" }}
            className="w-32 h-32 rounded-full border-4 border-red-100 shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white items-center justify-center text-4xl font-bold"
          >
            {getInitial(formData.name)}
          </div>

          <div className="mt-5 w-full max-w-sm">
            <label className="block mb-2 font-medium text-gray-700">
              Upload Profile Photo
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleFileChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
            />

            <button
              type="button"
              onClick={handlePhotoUpload}
              disabled={uploading}
              className="w-full mt-3 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={formData.role}
              disabled
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 capitalize"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-200 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyAccount;
