import { createContext, useState } from "react";

import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ access: localStorage.getItem("_a") });

  // whenever we set the auth to something, the login is checked
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
