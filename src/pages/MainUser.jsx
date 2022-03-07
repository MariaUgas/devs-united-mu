import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import Tweet from "../component/Tweet";
import { PainterContext } from "../context/PainterContext";
import { UserContext } from "../context/UserContext";
import { firestore, logoutGoogle } from "../firebase";
import Favorites from "./Favorites";

const MainUser = () => {
  const { username, user } = useContext(UserContext);
  const { color } = useContext(PainterContext);

  const [tweets, setTweets] = useState([]);
  const [isFavorite, setFavorite] = useState(false);

  const getUserTweets = () => {
    firestore
      .collection("tweets")
      .where("username", "==", username)
      .orderBy("date", "desc")
      .limit(30)
      .get()
      .then((snapshot) => {
        const tweetsArray = snapshot.docs.map((doc) => {
          return {
            message: doc.data().message,
            username: doc.data().username,
            likes: doc.data().likes || 0,
            image: doc.data().image || false,
            id: doc.id,
            date: doc.data().date,
            color: doc.data().colorTheme,
          };
        });
        setTweets(tweetsArray);
      });
  };

  useEffect(() => {
    getUserTweets();
  }, []);

  return (
    <div>
      <header className="hearder-display">
        <Link to="/home" className="sin-subrayado">
          <AiOutlineDoubleLeft size={24} className="text-msg pointer" />
        </Link>

        <div className="div-logout">
          <Link className="link-logout pointer" onClick={logoutGoogle} to={`/`}>
            LOGOUT
            <BiLogOut></BiLogOut>
          </Link>
        </div>
      </header>
      <nav className="bg-editor">
        <div className="nav-div">
          <img src={user.photoURL} alt="avatar-96" className="avatar-96" />
          <span className={`${color}  font-text m-botton`}>{username}</span>
        </div>
        <ul className="nav-bar">
          <li
            className={isFavorite ? "nav-li pointer" : "nav-li-active pointer"}
            onClick={() => setFavorite(false)}
          >
            POST
          </li>
          <li
            className={isFavorite ? "nav-li-active pointer" : "nav-li  pointer"}
            onClick={() => setFavorite(true)}
          >
            FAVORITES
          </li>
        </ul>
      </nav>
      <hr />
      {isFavorite ? (
        <Favorites />
      ) : (
        <div className="App">
          {tweets.map((tweet) => {
            const own = tweet.username === username;
            return (
              <Tweet
                key={tweet.id}
                tweet={tweet}
                isOwn={own}
                get={getUserTweets}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainUser;
