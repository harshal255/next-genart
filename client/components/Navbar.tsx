/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useState, useEffect } from "react";
import { assets } from "@/app/assets";
import Link from "next/link";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)!;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after initial render
    setIsLoading(false);
  }, []);

  const NavigateToBuy = () => {
    router.push('/buy');
  }

  return (
    <div className="flex items-center justify-between py-4">
      <Link href={"/"}>
        <div className="w-20 sm:w-20 lg:w-32 logo">
          {/* <img  
            src={assets.MyLogo}
            alt="Image failed to load"
            className="w-full h-auto object-contain cursor-pointer"
          /> */}
          Next GenArt
        </div>
      </Link>

      <div>
        {isLoading ? (
          // Show a loading placeholder
          <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-full"></div>
        ) : user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => NavigateToBuy()}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-black ">
                Credit left : {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">
              Hi,
              {" ".concat(user.name!)}
            </p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 drop-shadow"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 ">
                <ul className="list-none m-0 p-2 bg-white rounded-md text-sm drop-shadow-sm hover:bg-zinc-200 hver:text-black">
                  <li
                    onClick={logout}
                    className="py-1 px-2 cursor-pointer pr-10 "
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p className="cursor-pointer"
              onClick={() => NavigateToBuy()}
            >
              Pricing
            </p>
            <button
              className="bg-zinc-800 text-white px-10 py-2 sm:py-2 text-sm rounded-full"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;