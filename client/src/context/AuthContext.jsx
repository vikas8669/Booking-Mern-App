import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../Config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const response = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
      });

      setUser(response.data);
    } catch (error) {
      const errMsg = error.response?.data?.error || "Login failed";
      throw new Error(errMsg); // ✅ Throw error to be caught in LoginPage
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const changePassword = async ({ currentPassword, newPassword, confirmNewPassword }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/change-password`,
        { currentPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      );

      await logout(); // Force re-login

      return {
        success: true,
        message: response.data.message || "Password changed successfully. Please log in again.",
        redirect: "/login",
      };
    } catch (error) {
      const errMsg = error.response?.data?.error || "Password change failed";
      return { success: false, message: errMsg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
