import React from "react";
import { useNavigate } from "react-router-dom";

const NotAdminPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] text-gray-800 dark:text-white p-6">
      <div className="max-w-3xl w-full bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700 shadow-xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-400">
          প্রবেশাধিকার সীমাবদ্ধ ⚠️
        </h2>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          শুধুমাত্র{" "}
          <span className="text-red-600 dark:text-red-400 font-semibold">
            অ্যাডমিন
          </span>{" "}
          ইউজাররা এই পেজটি দেখতে পারে।
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md transition"
        >
          🔙 ড্যাশবোর্ডে ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default NotAdminPrompt;
