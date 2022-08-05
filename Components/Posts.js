import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebaseConfig/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const DUMMY_DATA = [
  {
    id: 1,
    avatar:
      "https://yt3.ggpht.com/ytc/AMLnZu_JVX-R2M3l06eKU5Wv4pAaymFifEUb5mO1Ms7g4A=s900-c-k-c0x00ffffff-no-rj",
    caption: "Hey I am Captain America Of MCU",
    username: "chrisevans",
    img: "https://images.indianexpress.com/2022/05/chris-evans-gray-man-captain-america-1200.jpg",
  },
  {
    id: 1,
    avatar:
      "https://yt3.ggpht.com/ytc/AMLnZu_JVX-R2M3l06eKU5Wv4pAaymFifEUb5mO1Ms7g4A=s900-c-k-c0x00ffffff-no-rj",
    caption: "Hey I am Captain America Of MCU",
    username: "chrisevans",
    img: "https://images.indianexpress.com/2022/05/chris-evans-gray-man-captain-america-1200.jpg",
  },
];

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
