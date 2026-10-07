import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const BACKEND_URL = "https://yama-flays-backend.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET SAVED LOGIN
  // =====================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedToken =
          localStorage.getItem("token") ||
          sessionStorage.getItem("token");

        const savedUser =
          localStorage.getItem("user") ||
          sessionStorage.getItem("user");

        if (!savedToken) {
          setLoading(false);
          return;
        }

        setToken(savedToken);

        // Use saved user first
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            setUser(null);
          }
        }

        // Verify token with backend
        const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          logout();
          return;
        }

        setUser(data.user);

        // Keep updated user information
        if (localStorage.getItem("token")) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        if (sessionStorage.getItem("token")) {
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("AUTH CHECK ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = (loginData, remember = false) => {
    const { token: newToken, user: newUser } = loginData;

    if (!newToken || !newUser) {
      return;
    }

    setToken(newToken);
    setUser(newUser);

    if (remember) {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("user", JSON.stringify(newUser));

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  // =====================================================
  // AUTH STATUS
  // =====================================================

  const isAuthenticated = Boolean(token && user);

  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =======================================================
// CUSTOM HOOK
// =======================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;