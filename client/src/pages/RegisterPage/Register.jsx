import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import { useUser } from "../../context/UserContext.jsx";
import logo from "../../assets/logo.svg"; // ✅ Logo import

export default function RegisterPage() {
  const { login } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    collegeName: "",
    district: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/register", form);
      const { status, data } = response;

      if (
        ![200, 201].includes(status) ||
        data?.message === "User already exists"
      ) {
        setError(data?.message || "Registration failed.");
        return;
      }

      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong while registering.");
      console.error("❌ Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-200 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        {/* 🔥 Logo here */}
        <img
          src={logo}
          alt="Admission Mate"
          className="h-16 md:h-20 mx-auto mb-4 object-contain"
        />

        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
          />
          <Input
            label="College Name"
            name="collegeName"
            value={form.collegeName}
            onChange={handleChange}
            placeholder="Dhaka College"
          />
          <Input
            label="District"
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="Dhaka"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-500 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={["name", "email", "password"].includes(name)}
      className="mt-1 block w-full px-4 py-2 bg-white/60 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
    />
  </div>
);
