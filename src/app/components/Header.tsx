"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const [menuisOpen, setMenuIsOpen] = useState(false);
  const { status, data } = useSession();
  const handdleLogin = () => signIn();
  const handleLogout = () => {
    setMenuIsOpen(false);
    signOut();
  };
  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center shadow-2xl">
      <div className="relative h-[32px] w-[182px]">
        <Image src="/logo.png" alt="Logo da Full Stack Week" fill />
      </div>
      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handdleLogin}
        >
          Login
        </button>
      )}
      {status === "authenticated" && data.user?.name && data.user?.image && (
        <div className="flex items-center gap-3 border-grayLighter border border-solid rounded-full p-2 px-3 relative">
          <AiOutlineMenu
            size={16}
            onClick={() => setMenuIsOpen(!menuisOpen)}
            className="cursor-pointer"
          />
          <Image
            width={35}
            height={35}
            src={data.user.image}
            alt={data.user.name}
            className="rounded-full shadow-md" 
          />
          {menuisOpen && (
            <div className="z-50 absolute top-14 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <button
                className="text-primary text-sm font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
