// components/NotLoggedInPrompt/NotLoggedInPrompt.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const NotLoggedInPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl w-full bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700 shadow-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
          আপনি লগইন করেননি
        </h2>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          অনুগ্রহ করে{" "}
          <span
            className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            লগইন করুন
          </span>{" "}
          অথবা{" "}
          <span
            className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            রেজিস্টার করুন
          </span>{" "}
          ড্যাশবোর্ড ব্যবহার করতে।
        </p>
      </div>
    </div>
  );
};

export default NotLoggedInPrompt;
