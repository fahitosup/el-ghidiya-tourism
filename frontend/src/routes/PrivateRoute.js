import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthProvider";
import jwtDecode from "jwt-decode";
import { useNavigate, Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxios from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const { auth } = useAuth();

  const checkAuthenticated = () => {
    // send a request to the backend that verifies the admin access token
    axios
      .post("accounts/token/verify/", { token: auth.access })
      .then((res) => setAllowed(true))
      .catch((err) => navigate("/login"));
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return allowed ? <Outlet /> : <></>;
};

export default PrivateRoute;
