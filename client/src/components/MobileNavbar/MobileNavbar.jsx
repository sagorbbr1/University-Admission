import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate, Link } from "react-router-dom";

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
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-green-600">
          🎓 AdmissionApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <span className="text-gray-700 dark:text-gray-200">
              👋 {user.user?.name}
            </span>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-green-500 hover:underline">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 dark:text-gray-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-green-400 dark:bg-gray-800 py-4 px-6 space-y-3 border-t border-gray-200 dark:border-gray-700">
          {user && (
            <p className="text-gray-700 dark:text-gray-200">
              👋 {user.user?.name}
            </p>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-green-500 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
