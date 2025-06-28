import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", photo: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/user/profile");
      if (res.ok) {
        setUser(res.data);
        setForm({
          name: res.data.name,
          email: res.data.email,
          photo: res.data.photo,
        });
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await api.put("/user/profile", form);
    if (res.ok) {
      setUser(res.data);
      setEditMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-950 text-white flex items-center justify-center p-4">
      <div className="bg-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-md backdrop-blur-lg border border-cyan-300/20">
        <div className="text-center">
          <img
            src={form.photo || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-400/60 shadow-md"
          />
          {editMode && (
            <input
              type="text"
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full bg-transparent border-b border-cyan-400 text-center py-1 mb-4 focus:outline-none placeholder-white/70"
            />
          )}
        </div>

        <div className="space-y-4">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full bg-transparent border-b border-cyan-400 py-1 focus:outline-none placeholder-white/70"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-center">
              👤 {user.name}
            </h2>
          )}

          {editMode ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-transparent border-b border-cyan-400 py-1 focus:outline-none placeholder-white/70"
            />
          ) : (
            <p className="text-center text-cyan-100">📧 {user.email}</p>
          )}
        </div>

        <div className="mt-6 text-center">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-xl text-sm font-semibold mr-3 shadow-md"
              >
                💾 Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-md"
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl text-sm font-semibold shadow-md"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
