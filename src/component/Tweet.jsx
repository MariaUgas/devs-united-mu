import React, { useContext } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import { UserContext } from "../context/UserContext";
const Tweet = ({ tweet, isOwn, get }) => {
  const { username } = useContext(UserContext);
  const deleteTweet = (idDocTweet) => {
    firestore
      .collection("tweets")
      .doc(idDocTweet)
      .delete()
      .then(() => {
        get();
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
        get();
      })
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <div className="div-tweet" id={tweet.id}>
        <div className="div-avatar">
          <img src={tweet.image} alt="avatar-48" className="avatar-48" />
        </div>
        <div className="flex-col div-editor">
          <div className="flex-row-around">
            <div className="text-msg">
              {" "}
              {isOwn ? (
                <span className={`${tweet.color} `}>{tweet.username}</span>
              ) : (
                <span className={`${tweet.color} `}>{tweet.username}</span>
              )}
              {tweet.date}
            </div>
            {isOwn ? (
              <BiTrash
                className="text-msg pointer"
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
              className="pointer"
              onClick={() => updateLikesTweet(tweet)}
            ></HiOutlineHeart>
            <div className="conter-like">{tweet.likes.length}</div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Tweet;
