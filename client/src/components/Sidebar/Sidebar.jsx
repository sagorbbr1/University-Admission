import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useUser } from "../../context/UserContext";
import logo from "../../assets/logo.svg";

const Sidebar = ({ features }) => {
  console.log("Rendering Sidebar with features:", features);
  const { logout, user } = useUser();
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
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-500 text-white p-2 rounded-lg shadow-md"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40
          w-[250px] p-5
          bg-gradient-to-b from-green-200 via-blue-300 to-purple-400/80
          dark:from-green-900 dark:via-blue-900 dark:to-purple-900/80
          border-r border-white/30 dark:border-gray-700
          shadow-2xl backdrop-blur-xl
          transition-transform duration-500 ease-in-out will-change-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          min-h-screen
        `}
      >
        <div className="flex items-center justify-center mt-10 md:mt-0">
          <div className="text-center">
            <img
              src={logo}
              alt="Admission Mate"
              className="h-20 md:h-20 object-contain mx-auto drop-shadow-lg"
            />
          </div>
        </div>

        <ul className="space-y-3 md:space-y-2">
          {features.map(({ title, link }) => (
            <li key={link}>
              <button
                onClick={() => handleLinkClick(link)}
                className={`w-full text-left block px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === link
                    ? "bg-purple-600 text-white shadow-md"
                    : "hover:bg-white/40 dark:hover:bg-white/10 hover:text-indigo-900 dark:hover:text-white"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
          <li>
            {user && (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-full text-left block px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-800 transition-all duration-300"
              >
                🚪 লগআউট
              </button>
            )}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
