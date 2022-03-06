import React, { useContext, useEffect } from "react";
import Setting from "./Setting";
import { auth, loginGoogle } from "./../firebase";
import { UserContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";
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
        <p className="font-text p-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
        <div className="flex-center">
          <button className="font-button-google pointer" onClick={loginGoogle}>
            <FcGoogle size={24} className="div-google" />{" "}
            <span className="spam-google">Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
