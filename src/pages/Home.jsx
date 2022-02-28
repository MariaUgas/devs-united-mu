import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";
import { PainterContext } from "../context/PainterContext";
import { UserContext } from "../context/UserContext";
import { firestore } from "../firebase";
import { logoutGoogle } from "./../firebase";
import { BiLogOut, BiTrash } from "react-icons/bi";

const Home = () => {
  const { user, username } = useContext(UserContext);
  const { color } = useContext(PainterContext);

  const [tweets, setTweets] = useState([]);
  const [infoTweet, setInfoTweet] = useState({});

  const getAllTweets = () => {
    firestore
      .collection("tweets")
      .limit(30)
      .orderBy("date", "desc")
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
        likes: new Array(),
      })
      .then(() => {
        getAllTweets();
      })
      .catch((err) => console.error(err.message));
  };
  const deleteTweet = (idDocTweet) => {
    firestore
      .collection("tweets")
      .doc(idDocTweet)
      .delete()
      .then(() => {
        getAllTweets();
      })
      .catch((err) => console.error(err.message));
  };

  const updateLikesTweet = (tweet) => {
    console.log("ingresa a actualizar");
    let arrayLikes = tweet.likes.length === 0 ? new Array() : tweet.likes;
    if (arrayLikes.length === 0) {
      arrayLikes.push(username);
    } else {
      let existe = "";
      existe = arrayLikes.find((userId) => {
        return username === userId;
      });
      if (existe === username) {
        return;
      }
      arrayLikes.push(username);
    }
    firestore
      .doc(`tweets/${tweet.id}`)
      .update({ likes: arrayLikes })
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

  return (
    <div>
      <header className="hearder-display">
        <img src={user.photoURL} alt="avatar-24" className="avatar-24" />

        <div className="div-logout">
          <Link className="link-logout" onClick={logoutGoogle} to={`/`}>
            LOGOUT
            <BiLogOut></BiLogOut>
          </Link>
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
            <input className="btn-submit" type="submit" value="Post" />
          </div>
        </div>
      </form>
      <hr />
      <div className="App">
        {tweets.map((tweet) => {
          const own = tweet.username === username;
          return (
            <>
              <div className="div-tweet" id={tweet.id}>
                <div className="div-avatar">
                  <img
                    src={tweet.image}
                    alt="avatar-48"
                    className="avatar-48"
                  />
                </div>
                <div className="flex-col div-editor">
                  <div className="flex-row-around">
                    <div className="text-msg">
                      {" "}
                      <span className={tweet.color}>{tweet.username}</span>{" "}
                      {tweet.date}
                    </div>
                    {own ? (
                      <BiTrash
                        className="text-msg"
                        onClick={() => deleteTweet(tweet.id)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="text-msg" name="message">
                    {tweet.message}
                  </p>
                  <div className="div-like">
                    <HiOutlineHeart
                      onClick={() => updateLikesTweet(tweet)}
                    ></HiOutlineHeart>
                    <div className="conter-like">{tweet.likes.length}</div>
                  </div>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
