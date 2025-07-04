import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        // Expected format: { user: {...}, token: "..." }
        if (parsed.user && parsed.token) {
          setUser(parsed.user);
          setToken(parsed.token);
        }
        // Maybe flat format: { name, email, ... , token }
        else if (parsed.token && (parsed.name || parsed.email)) {
          const { token, ...userWithoutToken } = parsed;
          setUser(userWithoutToken);
          setToken(token);
        } else {
          console.warn(
            "⚠️ Unrecognized user format in localStorage, clearing..."
          );
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("❌ Invalid JSON in localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // userData should be an object like { user: {...}, token: "..." }
  // or { name, email, ..., token } flat object
  const login = (userData) => {
    if (!userData) return;

    if (userData.user && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData.user);
      setToken(userData.token);
    } else if (userData.token && (userData.name || userData.email)) {
      const { token, ...userWithoutToken } = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userWithoutToken);
      setToken(token);
    } else {
      console.warn("⚠️ login: invalid userData format", userData);
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
