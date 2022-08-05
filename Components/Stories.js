import React, { useState, useEffect } from "react";
import * as faker from "faker";
import Story from "./Story";
import { useSession, signOut, signIn } from "next-auth/react";

function Stories() {
  const [suggestion, setSuggestion] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    }));

    setSuggestion(suggestion);
  }, []);

  console.log(suggestion);
 

  return (
    <>
      <div className="flex space-x-3 overflow-x-scroll  p-6 mt-2 border-2 border-gray-100 bg-white rounded-sm scrollbar-thin scrollbar-thumb-black">
        {session && (
          <Story img={session?.user?.image} main username={session.user.username} />
        )}
        {suggestion.map((data) => (
          <Story img={data.avatar} username={data.username} key={data?.id} />
        ))}
      </div>
    </>
  );
}

export default Stories;
