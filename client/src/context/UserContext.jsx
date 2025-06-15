import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // optional, if you want auth headers later

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        // Format: { user: {...}, token: "..." }
        if (parsed.user && parsed.token) {
          setUser(parsed.user);
          setToken(parsed.token);
        }

        // Fallback: { name, email, token } flat format
        else if (parsed.name && parsed.email && parsed.token) {
          const { token, ...userWithoutToken } = parsed;
          setUser(userWithoutToken);
          setToken(token);
        }

        // Invalid or unexpected format
        else {
          console.warn("⚠️ Unrecognized user format in localStorage");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("❌ Invalid JSON in localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.user && userData.token) {
      setUser(userData.user);
      setToken(userData.token);
    } else if (userData.name && userData.email && userData.token) {
      const { token, ...userWithoutToken } = userData;
      setUser(userWithoutToken);
      setToken(token);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
