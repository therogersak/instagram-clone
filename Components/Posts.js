import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebaseConfig/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";


function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  console.log(posts);
  return (
    <>
      {posts.map((data) => (
        <Post
          img={data.data().image}
          avatar={data.data().profileImg}
          id={data.id}
          key={data.id}
          username={data.data().username}
          caption={data.data().caption}
        />
      ))}
    </>
  );
}

export default Posts;
