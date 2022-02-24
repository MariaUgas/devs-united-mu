import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    firestore
      .collection(`prueba`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const tweets = snapshot.docs.map((doc) => {
            return {
              msg: doc.data().msg,
              user: doc.data().user,
              id: doc.id,
            };
          });
          setTweets(tweets);
        });
      });
  }, []);

  return (
    <div className="App">
      <h1>Tweets:</h1>
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <h1>{tweet.msg}</h1>
            <h4>por: {tweet.user}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
