import React, { useState } from "react";
import "./Login.sass";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import SEO from "../../../../components/SEO/SEO";

const Login = () => {
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/accounts/token/", { username: "admin", password: pass })
      .then((res) => {
        localStorage.setItem("_a", res.data.access);
        localStorage.setItem("_r", res.data.refresh);
        setAuth(res.data);
        navigate("/admin");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLoginError("كلمة المرور خاطئة");
        }
      });
  };
  return (
    <div id="login-page">
      <SEO title="تسجيل دخول المشرف - الغدية" />
      <div className="login-component-container">
        <form onSubmit={login}>
          <label htmlFor="password">:من فضلك أدخل رقمك السري</label>
          <input
            name="password"
            type="password"
            placeholder="...كلمة المرور"
            className="input text password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" className="find-more enter">
            يدخل
          </button>
        </form>
        {loginError ? <p style={{ color: "red" }}>{loginError}</p> : null}
      </div>
    </div>
  );
};

export default Login;
