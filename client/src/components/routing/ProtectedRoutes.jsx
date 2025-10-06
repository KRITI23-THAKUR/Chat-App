import  { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, [navigate, auth]);
  return auth.token ? <Outlet /> : <div>Loading</div>;
};

export default ProtectedRoutes;
