import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide icons, or use Heroicons
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md md:hidden fixed top-0 w-full z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-green-600">🎓 AdmissionApp</h1>

        <button
          onClick={toggleMenu}
          className="text-gray-800 dark:text-gray-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="bg-green-400 dark:bg-gray-800 py-4 px-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
          {user ? (
            <>
              <p className="text-gray-700 dark:text-gray-200">
                👋 {user.user.name}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-gray-500">Not logged in</p>
          )}
        </div>
      )}
    </header>
  );
}
