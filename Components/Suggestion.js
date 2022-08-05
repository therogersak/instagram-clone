import React, { useState, useEffect } from "react";
import * as faker from "faker";

function Suggestion() {
  const [suggestion, setSuggestion] = useState([]);
  const [seed, setSeed] = useState("yoo");

  useEffect(() => {
    const data = [...Array(5)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      word: faker.random.words(2),
    }));
    setSuggestion(data);
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center justify-between my-2 mb-3">
          <p className="text-gray-400">Suggestion For You</p>
          <button className="text-sm font-bold">See All</button>
        </div>
        {suggestion.map((data) => (
          <div className="flex items-center mt-2 cursor-pointer justify-between">
            <img
              src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
              className="w-12 h-12 rounded-full border cursor-pointer p-[1px]"
            />
            <div className="flex-1 mx-4">
              <span>{data.username}</span>
              <p className="text-sm text-gray-500">{data.word}</p>
            </div>
            <button className="text-blue-500 cursor-pointer text-sm">
              Follow
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Suggestion;
