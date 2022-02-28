import React, { useContext, useEffect } from "react";
import Setting from "./Setting";
import { auth, loginGoogle } from "./../firebase";
import { UserContext } from "../context/UserContext";
import { PainterProvider } from "../context/PainterContext";
import { Logo } from "../component/Logo";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return user ? (
    <>
      <Setting />
    </>
  ) : (
    <>
      <Logo />
      <div className="login">
        <div className="font-title">Lorem ipsum dolor</div>
        <div className="font-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </div>
        <div className="flex-row-center">
          <button className="font-button-google" onClick={loginGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
