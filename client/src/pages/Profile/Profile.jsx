import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext.jsx";

const Profile = () => {
  const { user, updateUser } = useUser();

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

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        collegeName: user.collegeName || "",
        district: user.district || "",
        role: user.role || "student",
      });
    }
  }, [user]);

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
      await updateUser(form);
      setIsEditing(false);
    } catch (err) {
      setError("আপডেট করতে সমস্যা হয়েছে, পরে চেষ্টা করুন।");
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen flex justify-center items-start
        bg-gradient-to-br from-green-200 via-blue-300 to-purple-400
        dark:from-green-900 dark:via-blue-900 dark:to-purple-900
        py-12 px-6
      "
    >
      <div
        className="
          w-full max-w-4xl
          bg-white/30 dark:bg-gray-900/40
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          border border-white/30 dark:border-gray-700/50
          p-12
          text-gray-900 dark:text-white
          overflow-hidden
        "
      >
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
