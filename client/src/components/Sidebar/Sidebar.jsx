import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const features = [
  { title: "📊 Dashboard", link: "/dashboard" },
  { title: "⏱️ মক টেস্ট", link: "/mock" },
  { title: "📚 প্রশ্ন ব্যাংক", link: "/questionbank" },
  { title: "📊 রেজাল্ট বিশ্লেষণ", link: "/results" },
  { title: "📥 Mistake Bank", link: "/mistake-bank" },
  { title: "🔥 ডেইলি চ্যালেঞ্জ", link: "/daily-challenge" },
  { title: "📣 নোটিশ / আপডেট", link: "/notices" },
  { title: "💬 আলোচনা ফোরাম", link: "/forum" },
  { title: "👥 প্রোফাইল", link: "/profile" },
];

const Sidebar = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useUser();

  return (
    <aside className="w-[250px]  sticky top-0 p-5 backdrop-blur-xl bg-gradient-to-b from-green-200 via-blue-300 to-purple-400/80 dark:from-green-900 dark:via-blue-900 dark:to-purple-900/80 border-r border-white/30 dark:border-gray-700 shadow-2xl transition-all duration-500">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 drop-shadow-md">
          🎓 AdmissionApp
        </h1>
      </div>

      <ul className="space-y-4">
        {features.map(({ title, link }) => (
          <li key={link}>
            <Link
              to={link}
              className={`block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                location.pathname.startsWith(link)
                  ? "bg-indigo-600 text-white shadow-md"
                  : "hover:bg-white/40 dark:hover:bg-white/10 hover:text-indigo-900 dark:hover:text-white"
              }`}
            >
              {title}
            </Link>
          </li>
        ))}
        {
          <li className="mt-6">
            <Link
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="block px-3 py-2 rounded-lg bg-orange-400 text-white hover:bg-blue-700 transition font-bold shadow-md"
            >
              👤 Logout
            </Link>
          </li>
        }

        {isAdmin && (
          <li className="mt-6">
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-bold shadow-md"
            >
              🔧 Admin Panel
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
