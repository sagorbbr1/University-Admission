import React, { useState, useEffect } from "react";
import api from "../../utils/api.js";
import { useUser } from "../../context/UserContext.jsx";
import Spinner from "../../components/Spninner/Spinner.jsx";
import NotLoggedInPrompt from "../../components/NotLoggedInPrompt/NotLoggedInPrompt.jsx";

const Profile = () => {
  const { user, token, logout, login } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    collegeName: "",
    district: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/auth/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          collegeName: res.data.collegeName || "",
          district: res.data.district || "",
          role: res.data.role || "student",
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(
          err.response?.data?.error || "প্রোফাইল তথ্য লোড করতে সমস্যা হয়েছে।"
        );
        if (err.response?.status === 401) {
          logout();
        }
      }
    };

    fetchProfile();
  }, [token, logout]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePhone = (phone) => {
    if (!phone) return true;
    return /^01[3-9]\d{8}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("নাম অবশ্যই দিতে হবে।");
      return;
    }

    if (!validatePhone(form.phone)) {
      setError("সঠিক ফোন নম্বর দিন (যেমন: 017XXXXXXXX)।");
      return;
    }

    try {
      const res = await api.put(
        "/auth/user/profile",
        {
          name: form.name,
          phone: form.phone,
          collegeName: form.collegeName,
          district: form.district,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      login({ ...user, ...res.data, token });
      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "আপডেট করতে সমস্যা হয়েছে, পরে চেষ্টা করুন।"
      );
    }
  };

  // If user not logged in, show fallback with full layout
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 text-white">
        <NotLoggedInPrompt />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 text-gray-800 dark:text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 py-12 px-6">
      <div className="w-full max-w-4xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50 p-12 text-gray-900 dark:text-white overflow-hidden">
        <h2 className="text-5xl font-extrabold mb-12 text-center tracking-wide">
          প্রোফাইল তথ্য
        </h2>

        {error && (
          <p className="mb-8 text-red-600 dark:text-red-400 font-semibold text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {[
            {
              label: "নাম",
              name: "name",
              type: "text",
              placeholder: "আপনার পূর্ণ নাম লিখুন",
            },
            {
              label: "ইমেইল (পরিবর্তনযোগ্য নয়)",
              name: "email",
              type: "email",
              disabled: true,
            },
            {
              label: "ফোন নম্বর",
              name: "phone",
              type: "text",
              placeholder: "017XXXXXXXX",
            },
            {
              label: "কলেজের নাম",
              name: "collegeName",
              type: "text",
              placeholder: "আপনার কলেজের নাম",
            },
            {
              label: "জেলা",
              name: "district",
              type: "text",
              placeholder: "আপনার জেলা",
            },
            { label: "ভূমিকা", name: "role", type: "text", disabled: true },
          ].map(({ label, name, type, placeholder, disabled }) => (
            <div
              key={name}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center"
            >
              <label
                htmlFor={name}
                className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-1 md:mb-0"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled || !isEditing}
                className={`col-span-1 md:col-span-2 rounded-2xl px-5 py-4 text-xl
                  focus:outline-none
                  ${
                    disabled || !isEditing
                      ? "bg-gray-100 dark:bg-gray-700 border border-gray-300 cursor-not-allowed text-gray-500 dark:text-gray-400"
                      : "bg-white dark:bg-gray-800 border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                  }
                `}
              />
            </div>
          ))}

          <div className="flex justify-center gap-10 mt-12 flex-wrap">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-16 py-4 rounded-3xl bg-indigo-600 text-white text-2xl font-semibold hover:bg-indigo-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-16 py-4 rounded-3xl bg-green-600 text-white text-2xl font-semibold hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      name: user.name || "",
                      email: user.email || "",
                      phone: user.phone || "",
                      collegeName: user.collegeName || "",
                      district: user.district || "",
                      role: user.role || "student",
                    });
                    setError("");
                    setIsEditing(false);
                  }}
                  className="px-16 py-4 rounded-3xl bg-gray-400 text-white text-2xl font-semibold hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
