import React, { useContext, useEffect, useState } from "react";
import Tweet from "../component/Tweet";
import { firestore, logoutGoogle } from "../firebase";
import { UserContext } from "../context/UserContext";

const Favorites = (deleteTweet, updateLikesTweet, own) => {
  const { username } = useContext(UserContext);

  const [tweets, setTweets] = useState([]);

  const getUserTweets = () => {
    console.log(username);
    firestore
      .collection("tweets")
      .where("likes", "array-contains", username)
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
      {tweets.map((tweet) => {
        const own = tweet.username === username;
        return (
          <Tweet key={tweet.id} tweet={tweet} isOwn={own} get={getUserTweets} />
        );
      })}
    </div>
  );
};

export default Favorites;
