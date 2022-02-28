import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ColorPicker from "../component/ColorPicker";
import { Logo } from "../component/Logo";
import { UserContext } from "../context/UserContext";

const Setting = () => {
  const { user, username, setUsername } = useContext(UserContext);

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
            value={username}
            name="username"
            id="username"
            placeholder="Type your username"
            onChange={(e) => setUsername(e.target.value)}
            o
          />
          <ColorPicker />
          <div className="font-button-config">
            <Link className="nav-item" to={`/home`}>
              CONTINUE
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
