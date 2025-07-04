import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored?.user && stored?.token) {
        setUser(stored.user);
        setToken(stored.token);
      } else if (stored?.name && stored?.email && stored?.token) {
        const { token, ...userWithoutToken } = stored;
        setUser(userWithoutToken);
        setToken(token);
      } else {
        localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData.user || userData);
    setToken(userData.token);
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
