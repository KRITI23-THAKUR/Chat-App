import  { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PublicRoutes = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [navigate, auth]);
  return !auth.token ? <Outlet /> : <div>Loading</div>;
};

export default PublicRoutes;
