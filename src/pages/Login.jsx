import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Setting from "./Setting";
import { auth, loginGoogle, logoutGoogle } from "./../firebase";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("Info del Usuario ", user);
      setUser(user);
    });
  });

  return user ? (
    <>
      <div className="flex-col-center">
        <img src={user.photoURL} alt="fotoPerfil" />
        <p>!Hola {user.displayName}!</p>
        <button onClick={logoutGoogle}></button>
      </div>

      <p>
        <Link to={`/setting`}>ir a configuracion</Link>
      </p>
    </>
  ) : (
    <button onClick={loginGoogle}>Login con Google</button>
  );
};

export default Login;
