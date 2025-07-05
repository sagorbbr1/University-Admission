import React from "react";
import { useNavigate } from "react-router-dom";

const adminSections = [
  { label: "➕ Add Question", path: "/admin/add-question" },
  { label: "📁 Bulk Upload", path: "/admin/bulk-upload" },
  { label: "📝 All Questions", path: "/admin/questions" },
  { label: "👥 All Students", path: "/admin/users" },
  { label: "📊 Mock Test Results", path: "/admin/mock-results" },
  { label: "🔍 Mistake Overview", path: "/admin/mistakes" },
  { label: "📢 Announcements", path: "/admin/announcements" },
  { label: "🚪 Logout", path: "/" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e1bee7] to-[#f3e5f5] text-gray-800 p-6">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-12 drop-shadow-lg animate-pulse">
        🛠️ Admin Control Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {adminSections.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white/30 backdrop-blur-xl border border-indigo-400/40 rounded-3xl p-6 text-center text-lg font-semibold text-indigo-700 hover:text-indigo-900 shadow-lg hover:shadow-indigo-300 transition-all select-none"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
