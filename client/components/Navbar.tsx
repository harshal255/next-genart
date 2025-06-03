'use client';
import React, { useContext } from "react";
import { assets } from "@/app/assets";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)!;
  const router = useRouter();

  const NavigateToBuy = () => {
    router.push('/buy');
  }

  return (
    <div className="flex items-center justify-between py-4">
      <Link href={"/"}>
        <div className="w-20 sm:w-20 lg:w-32 logo text-2xl text-nowrap">
          Next <span className="text-purple-700">Gen</span>Art
        </div>
      </Link>

      <div className="min-w-[280px] flex justify-end items-center">
        {/* Authenticated View */}
        <div className={`flex items-center gap-2 sm:gap-3 transition-opacity duration-300 ${user ? 'flex' : 'hidden'}`}>
          <button
            onClick={NavigateToBuy}
            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={assets.credit_star}
              alt="credit"
              width={20}
              height={20}
              className="w-5 h-5"
              priority
              quality={75}
            />
            <p className="text-xs sm:text-sm font-medium text-black">
              Credit left : {credit}
            </p>
          </button>

          <p className="text-gray-600 max-sm:hidden pl-4">
            Hi, {user?.name}
          </p>

          <div className="relative group">
            <Image
              src={assets.profile_icon}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 drop-shadow"
              priority
              quality={75}
            />
            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
              <ul className="list-none m-0 p-2 bg-white rounded-md text-sm drop-shadow-sm hover:bg-zinc-200 hover:text-black">
                <li
                  onClick={logout}
                  className="py-1 px-2 cursor-pointer pr-10"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Guest View */}
        <div className={`gap-2 sm:gap-5 transition-opacity duration-300 ${!user ? 'flex items-center' : 'hidden'}`}>
          <p className="cursor-pointer" onClick={NavigateToBuy}>
            Pricing
          </p>
          <button
            className="bg-zinc-800 text-white px-10 py-2 text-sm rounded-full"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
