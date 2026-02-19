import { useState } from "react";
import { useAuth } from "../context/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await fetch("https://ecommerce-c1r1.onrender.com/auth/userauth", {
          method: "GET",
          headers: {
            Authorization: auth.token,
          },
        });
        const data = await res.json();
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <h1>Loading....</h1>;
}
