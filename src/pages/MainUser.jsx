import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import Tweet from "../component/Tweet";
import { UserContext } from "../context/UserContext";
import { firestore, logoutGoogle } from "../firebase";
import Favorites from "./Favorites";

const MainUser = () => {
  const { username } = useContext(UserContext);

  const [tweets, setTweets] = useState([]);
  const [isFavorite, setFavorite] = useState(false);

  const getUserTweets = () => {
    console.log(username);
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
          <AiOutlineDoubleLeft className="text-msg pointer" />
        </Link>

        <div className="div-logout">
          <Link className="link-logout pointer" onClick={logoutGoogle} to={`/`}>
            LOGOUT
            <BiLogOut></BiLogOut>
          </Link>
        </div>
      </header>
      <nav className="amarillo">
        <ul className="nav-bar">
          <li onClick={() => setFavorite(false)}>POST</li>
          <li onClick={() => setFavorite(true)}>FAVORITES</li>
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
