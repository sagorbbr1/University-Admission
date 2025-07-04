import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);

  // Close sidebar on route change ONLY if open and on small screen
  useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const handleLinkClick = (link) => {
    navigate(link);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-md"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen w-[250px] p-5
          bg-gradient-to-b from-green-200 via-blue-300 to-purple-400/80
          dark:from-green-900 dark:via-blue-900 dark:to-purple-900/80
          border-r border-white/30 dark:border-gray-700
          shadow-2xl backdrop-blur-xl
          transition-transform duration-500 ease-in-out will-change-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-10">
          <h1 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 drop-shadow-md">
            🎓 AdmissionApp
          </h1>
        </div>

        <ul className="space-y-4">
          {features.map(({ title, link }) => (
            <li key={link}>
              <button
                onClick={() => handleLinkClick(link)}
                className={`w-full text-left block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname.startsWith(link)
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-white/40 dark:hover:bg-white/10 hover:text-indigo-900 dark:hover:text-white"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
