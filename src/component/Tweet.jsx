import React, { useContext } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
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
    let arrayLikes = tweet.likes.length === 0 ? [] : tweet.likes;
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
  const fecha = new Date(tweet.date);
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  console.log(` - ${fecha.getDate()} ${months[fecha.getMonth()]}`);
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
              {` - ${fecha.getDate()}  ${months[fecha.getMonth()]}`}
            </div>
            {isOwn ? (
              <>
                <a href="#miModal">
                  <BiTrash className="text-msg pointer" />
                </a>
                <div id="miModal" className="modal">
                  <div className="modal-contenido">
                    <div className="contenido">
                      <h2>¿Quieres eliminar el tweet?</h2>
                      <p>
                        Selecciona la opción de 'Eliminar' si quiere borrar
                        definitivamente el tweet.
                      </p>
                      <div className="modal-div-btn">
                        <button
                          className="modal-button m-btn"
                          onClick={() => deleteTweet(tweet.id)}
                        >
                          Eliminar
                        </button>
                        <button className="modal-button m-btn">
                          <a href="#" className="a-modal">
                            {" "}
                            Cancelar
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
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
