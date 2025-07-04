import React from "react";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBookOpen,
  FaClipboardList,
  FaChartBar,
  FaFireAlt,
  FaTools,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cards = [
    {
      title: "মক টেস্ট",
      icon: <FaClipboardList size={28} />,
      link: "/mock",
    },
    {
      title: "প্রশ্ন ব্যাংক",
      icon: <FaBookOpen size={28} />,
      link: "/questionbank",
    },
    {
      title: "রেজাল্ট বিশ্লেষণ",
      icon: <FaChartBar size={28} />,
      link: "/results",
    },
    {
      title: "ডেইলি চ্যালেঞ্জ",
      icon: <FaFireAlt size={28} />,
      link: "/daily-challenge",
    },
  ];

  return (
    <div className="px-4 md:px-8 py-6 min-h-screen bg-gradient-to-br from-green-200 via-blue-300 to-purple-400 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 backdrop-blur-xl rounded-xl shadow-inner">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 backdrop-blur-md p-6 rounded-xl bg-white/30 dark:bg-gray-800/40 shadow-md border border-white/30 dark:border-gray-700/30">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            👋 স্বাগতম, {user?.name}!
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            প্রতিদিনের অনুশীলন, পরীক্ষা ও বিশ্লেষণের মধ্য দিয়ে নিজের সামর্থ্যকে
            ছাড়িয়ে যাওয়ার এটাই সময়। এখানে তুমি প্রস্তুতির প্রতিটি ধাপে সাপোর্ট
            পাবে — মক টেস্ট, ডেইলি চ্যালেঞ্জ, রেজাল্ট ট্র্যাকিং এবং আরও অনেক
            কিছু।
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FaUserCircle />
            প্রোফাইল
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            লগআউট
          </button>
        </div>
      </div>

      {/* Admin Panel Button for admins */}
      {user?.role === "admin" && (
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-lg font-semibold transition"
          >
            <FaTools size={22} />
            Admin Panel
          </button>
        </div>
      )}

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map(({ title, icon, link }) => (
          <div
            key={title}
            onClick={() => navigate(link)}
            className="bg-white/30 dark:bg-gray-700/40 hover:bg-white/40 dark:hover:bg-indigo-600/40 backdrop-blur-lg shadow-xl rounded-xl p-5 cursor-pointer transition-all border border-white/20 dark:border-gray-600"
          >
            <div className="text-indigo-700 dark:text-indigo-300 mb-3">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
