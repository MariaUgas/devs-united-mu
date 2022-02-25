import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Setting from "./Setting";
import { auth, loginGoogle, logoutGoogle } from "./../firebase";
import { UserContext } from "../context/UserContext";
import { PainterProvider } from "../context/PainterContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("Info del Usuario ", user);
      setUser(user);
    });
  });

  return user ? (
    <>
      <PainterProvider>
        <Setting />
      </PainterProvider>
      {/* <div>
        <img className="flex-row-center" src="./../logoDevsUnited.svg"></img>
        <div className="flex-col">
          <img src={user.photoURL} alt="fotoPerfil" />
          <p>!Hola {user.displayName}!</p>

          <Link onClick={logoutGoogle} to={`/setting`}>
            ir a configuracion
          </Link>
        </div>
      </div> */}
    </>
  ) : (
    <>
      <img
        className="logo"
        src="http://127.0.0.1:5500/src/logoDevsUnited.svg"
      ></img>
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
