import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PainterContext } from "../context/PainterContext";
import { UserContext } from "../context/UserContext";
import { firestore } from "../firebase";
import { logoutGoogle } from "./../firebase";
import { BiLogOut } from "react-icons/bi";
import Tweet from "../component/Tweet";
import NotFound from "./NotFound";

const Home = () => {
  const { user, username } = useContext(UserContext);
  const { color } = useContext(PainterContext);

  const [tweets, setTweets] = useState([]);
  const [infoTweet, setInfoTweet] = useState({});

  const getAllTweets = async () => {
    let peticion = await firestore
      .collection("tweets")
      .limit(30)
      .orderBy("date", "desc")
      .get();

    const tweetsArray = peticion.docs.map((doc) => {
      return {
        message: doc.data().message,
        username: doc.data().username,
        likes: doc.data().likes || [],
        image: doc.data().image || false,
        id: doc.id,
        date: doc.data().date,
        color: doc.data().colorTheme,
      };
    });
    setTweets(tweetsArray);
  };

  const createTweet = (e) => {
    e.preventDefault();

    firestore
      .collection("tweets")
      .add({
        ...infoTweet,
        image: user.photoURL,
        email: user.email,
        username: username,
        colorTheme: color,
        date: new Date().valueOf(),
        likes: [],
      })
      .then(() => {
        getAllTweets();
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const handleChange = (e) => {
    let newTweet = {
      ...infoTweet,
      [e.target.name]: e.target.value,
    };
    setInfoTweet(newTweet);
  };

  return Object.keys(user).length === 0 ? (
    <>
      <NotFound />
    </>
  ) : (
    <div>
      <header className="hearder-display">
        <Link to={`/user`}>
          <img src={user.photoURL} alt="avatar-24" className="avatar-24" />
        </Link>

        <div className="div-logout">
          <Link
            className="link-logout pointer  "
            onClick={logoutGoogle}
            to={`/`}
          >
            LOGOUT
          </Link>
          <BiLogOut size={20}></BiLogOut>
        </div>
      </header>
      <hr />
      <form onSubmit={createTweet}>
        <div className="bg-editor div-tweet">
          <div className="div-avatar">
            <img src={user.photoURL} alt="avatar-48" className="avatar-48" />
          </div>
          <div className="flex-col div-editor">
            <textarea
              className="text-form"
              onChange={handleChange}
              placeholder="Ingrese un mensaje"
              name="message"
            ></textarea>
            <input className="btn-submit pointer" type="submit" value="Post" />
          </div>
        </div>
      </form>
      <hr />
      <div className="App">
        {tweets.map((tweet) => {
          const own = tweet.username === username;
          return (
            <Tweet
              key={tweet.id}
              tweet={tweet}
              isOwn={own}
              get={getAllTweets}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
