import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setToken(parsed.token); // ✅ token comes from inside user object
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ one object
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
