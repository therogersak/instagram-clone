import React, { useEffect, useState } from "react";

function Story({ img, username, main }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);
  return (
    <>
      <div>
        <img
          src={ main ? img : `https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
          className="w-14 h-14 border-2 object-contain border-red-500 rounded-full hover:scale-110 transition transform duration-200 ease-out cursor-pointer"
        />
        <p className="truncate text-center w-14 text-sm">{username}</p>
      </div>
    </>
  );
}

export default Story;
