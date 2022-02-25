import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ColorPicker from "../component/ColorPicker";
import { UserContext } from "../context/UserContext";
import { logoutGoogle } from "./../firebase";
const Setting = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <img
        className="logo"
        src="http://127.0.0.1:5500/src/logoDevsUnited.svg"
      ></img>
      <div className="login">
        <div className="font-title">
          WELCOME <span className="text-red">{user.displayName}!</span>
        </div>
        <input
          className="font-input"
          type="text"
          name="username"
          id="username"
          placeholder="Type your username"
        />
        <ColorPicker />
        <div className="font-button-config">
          <Link className="nav-item" onClick={logoutGoogle} to={`/`}>
            CONTINUE
          </Link>
        </div>
      </div>
    </>
    // <div>
    //   <Link className="font-title" to={`/home`}>
    //     ir a HOME
    //   </Link>
    // </div>
  );
};

export default Setting;
