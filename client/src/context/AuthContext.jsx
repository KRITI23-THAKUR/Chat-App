import { useState, createContext, useEffect } from "react";
import { getToken, removeToken } from "../lib/localstorage";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ token: getToken(), user: null });
  const { request } = useApi();

  const getCurrUser = async () => {
    if (!getToken()) {
      return;
    }
    try {
      const response = await request({
        endPoint: "user/me",
        method: "GET",
      });
      if (response.success) {
        setAuth((prev) => ({ ...prev, user: response.user }));
      }
    } catch (error) {
      console.log(error);
      setAuth({
        token: null,
        user: null,
      });
    }
  };

  useEffect(() => {
    getCurrUser();
  }, [navigate]);
  const logout = async () => {
    await request({
      endPoint: "auth/logout",
    });
    removeToken();
    setAuth({
      token: null,
      user: null,
    });
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
