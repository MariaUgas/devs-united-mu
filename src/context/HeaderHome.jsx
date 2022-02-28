import React from "react";
import { logoutGoogle } from "./../firebase";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
const HeaderHome = ({ user }) => {
  <header className="hearder-display">
    <img src={user.photoURL} alt="avatar-24" className="avatar-24" />

    <div className="div-logout">
      <Link className="link-logout" onClick={logoutGoogle} to={`/`}>
        LOGOUT
        <BiLogOut></BiLogOut>
      </Link>
    </div>
  </header>;
};

export default HeaderHome;
