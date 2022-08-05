import React, { useState, useEffect } from "react";
import {
  BookmarkIcon,
  ChatIcon,
  PaperAirplaneIcon,
  HeartIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";
import { db } from "../firebaseConfig/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";

function Post({ img, avatar, id, caption, username }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snashot) => setComments(snashot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user.uid) !== -1
      ),
    [likes]
  );

  const likeHandler = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session?.user?.username,
      });
    }
  };

  console.log(comments);

  const commentHandler = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: comment,
      username: session.user.username,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setComment("");
  };
  return (
    <>
      <div className="bg-white mt-7  border border-gray-10 rounded-sm py-3">
        {/* Header */}
        <div className="flex items-center gap-3 py-2 px-4">
          <img
            src={avatar}
            alt={caption}
            className="w-10 h-10 rounded-full object-contain border border-gray-250 cursor-pointer"
          />
          <p className="flex-1 font-bold cursor-pointer">{username}</p>
          <DotsHorizontalIcon className="w-6 cursor-pointer" />
        </div>
        {/* Img */}
        <div className="overflow-hidden">
          <img src={img} alt={caption} className="w-full object-cover h-full" />
        </div>
        {session && (
          <div className="flex justify-between px-4 pt-3">
            <div className="flex space-x-3">
              {hasLiked ? (
                <FavoriteIcon
                  className="navBtn text-red-500"
                  onClick={() => likeHandler()}
                />
              ) : (
                <HeartIcon className="btn" onClick={() => likeHandler()} />
              )}
              <PaperAirplaneIcon className="btn" />
              <ChatIcon className="btn" />
            </div>
            <BookmarkIcon className="btn" />
          </div>
        )}

       
         <div className="p-1 pb-4 px-6">
         {likes.length > 0 && <p className="">{likes.length}</p>}
        <p className="truncate pt-3">
          <span className="font-bold mr-1">{username}</span> {caption}
        </p>
  
         </div>

        {comments.length > 0 && (
          <div className="h-[80px] overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-black bg-gray-200 scrollbar-track-gray-300">
            {comments &&
              comments.map((data) => (
                <div className="flex items-center space-x-3 py-2 px-4">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={data.data().profileImg}
                  />
                  <p className="flex-1 mx-4">
                    <span className="font-bold">{data.data().username} </span>
                    {data.data().comment}
                  </p>
                  <Moment fromNow className="font-thin text-sm">
                    {data.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
          </div>
        )}

        {session && (
          <form className="flex items-center p-4 gap-3">
            <EmojiHappyIcon className="h-6 cursor-pointer" />
            <input
              type="text"
              placeholder="Add a comment"
              className="bg-transparent border-none outline-none w-full h-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={(e) => commentHandler(e)}
              className="text-blue-500"
            >
              Post
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Post;
