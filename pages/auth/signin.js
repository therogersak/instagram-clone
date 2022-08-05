import { getProviders, signIn } from "next-auth/react";
import Header from "../../Components/Header";

function signin({ providers }) {
  return (
    <>
      <Header />
      <div className="min-h-screen mx-auto flex items-center flex-col justify-center mt-[-3rem] gap-5">
        <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fwww.clipartmax.com%2Fpng%2Ffull%2F174-1749053_instagram-logo-png.png&w=1920&q=75" className="w-[150px]" />
        <p>This Is Instagram Clone App</p>
        <div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-blue-500 text-white p-3 px-6 rounded-sm  shadow-xl font-bold"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
