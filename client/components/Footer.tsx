/* eslint-disable @next/next/no-img-element */
import React from "react";
import { assets } from "@/app/assets";


const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <div className="logo">
        {/* <img  
            src={assets.MyLogo}
            alt="Image failed to load"
            className="w-full h-auto object-contain cursor-pointer"
          /> */}
        Next GenArt
      </div>
      <p className="flex-1 border-gray-400 text-sm text-gray-500 max-sm:hidden">
        | Copyright @Harshal Kahar | All right reserved
      </p>
      <div className="flex gap-2.5">
        <img src={assets.facebook_icon} alt="" className="cursor-pointer" />
        <img src={assets.twitter_icon} alt="" className="cursor-pointer" />
        <img src={assets.instagram_icon} alt="" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;