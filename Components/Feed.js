import Stories from "./Stories";
import Posts from "./Posts";
import User from "./User";
import Suggestion from "./Suggestion";
import { useSession, signOut, signIn } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    <>
      <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
        <section className="col-span-2">
          <Stories />
          <Posts />
        </section>
        {session && (
          <section className="hidden md:col-span-1 lg:inline-grid">
            <div className="fixed top-20 pl-4">
              <User />
              <Suggestion />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Feed;
