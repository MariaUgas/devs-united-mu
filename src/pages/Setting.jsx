import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ColorPicker from "../component/ColorPicker";
import { Logo } from "../component/Logo";
import { UserContext } from "../context/UserContext";

const Setting = () => {
  const alias = useRef();
  //TODO validar alias de usuario
  const { user, setUsername } = useContext(UserContext);

  return (
    <>
      <Logo />
      <div className="login">
        <form>
          <div className="font-title">
            WELCOME <span className="text-red">{user.displayName}!</span>
          </div>
          <input
            className="font-input"
            type="text"
            ref={alias}
            placeholder="Type your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <ColorPicker />
          <div className="font-button-config">
            <Link className="nav-item a-config" to={`/home`}>
              CONTINUE
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
