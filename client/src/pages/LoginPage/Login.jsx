import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import { useUser } from "../../context/UserContext.jsx";

export default function LoginPage() {
  const { login } = useUser();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", form);
      const { status, data } = response;

      console.log("🌐 Login Response:", response);

      if (status !== 200 || !data?.token) {
        setError(data?.message || "Login failed.");
        return;
      }

      login(data);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Something went wrong during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] dark:from-[#0f0f0f] dark:via-[#1f1f1f] dark:to-[#121212] transition-all duration-700">
      <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-10 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 drop-shadow-md">
          Welcome Back 🚀
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/50 dark:bg-gray-900/40 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-500 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
