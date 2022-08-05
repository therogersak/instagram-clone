import React from "react";
import {
  SearchIcon,
  HomeIcon,
  PaperAirplaneIcon,
  MenuIcon,
  HeartIcon,
  UserGroupIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signOut, signIn } from "next-auth/react";
import { modalAtom } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

function Header() {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalAtom);

  return (
    <>
      <div className="shadow-sm border-b z-50 sticky top-0 left-0 bg-white">
        <div className="flex items-center justify-between max-w-6xl mx-2 lg:mx-auto py-3 px-3">
          {/* Header Left */}
          <div className="w-[100px] hidden h-[40px] relative lg:inline-grid">
            <Image
              src="https://www.clipartmax.com/png/full/174-1749053_instagram-logo-png.png"
              layout="fill"
              objectFit="contain"
              onClick={() => router.push("/")}
            />
          </div>

          <div className="w-8 h-8 relative lg:hidden flex-shrink-0 cursor-pointer">
            <Image
              src="https://www.clipartmax.com/png/full/12-121988_white-instagram-logo-png.png"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Header Middle */}
          <div className="flex items-center gap-2 bg-gray-100 h-[40px] pl-4 rounded-md shadow-md">
            <SearchIcon className="w-5 h-5" />
            <input
              type="text"
              placeholder="search"
              className=" w-full h-full bg-transparent border-none outline-none "
            />
          </div>

          {/* Header Right */}
          {session ? (
            <>
              <div className="flex justify-end items-center space-x-4">
                <HomeIcon className="navBtn" onClick={() => router.push("/")} />
                <MenuIcon className="md:hidden h-6 cursor-pointer" />
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <PlusCircleIcon
                  className="navBtn"
                  onClick={() => setOpen(true)}
                />
                <UserGroupIcon className="navBtn" />
                <HeartIcon className="navBtn" />
                <img
                  src={session?.user?.image}
                  onClick={signOut}
                  className="h-10 rounded-full cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={signIn}
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
