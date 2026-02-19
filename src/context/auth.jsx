import React from "react";
import { useEffect } from "react";

const Authcontext = React.createContext();
const Authprovider = ({ children }) => {
  const [auth, setAuth] = React.useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const pasedAuth = JSON.parse(storedAuth);
    if (storedAuth) {
      setAuth({ ...pasedAuth, user: pasedAuth.user, token: pasedAuth.token });
    }
  }, []);
  return (
    <Authcontext.Provider value={{ auth, setAuth }}>
      {children}
    </Authcontext.Provider>
  );
};
const useAuth = () => React.useContext(Authcontext);

export { useAuth, Authprovider };
