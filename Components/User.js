import { useSession, signOut} from "next-auth/react";

function User() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div className="flex items-center justify-between">
        <img
          src={session?.user?.image}
          className="w-14 h-14 rounded-full border p-[2px]"
        />

        <div className="flex-1 mx-4">
          <span className="font-bold">{session?.user?.username}</span>
          <p className="text-sm text-gray-500">Welcome to instagram</p>
        </div>
        <button className="text-blue-500 text-sm" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}

export default User;
