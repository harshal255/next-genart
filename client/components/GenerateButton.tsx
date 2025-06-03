/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext } from "react";
import { assets } from "@/app/assets";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";


const GenerateButton = () => {
  const { user, setShowLogin } = useContext(AppContext)!;
  const router = useRouter();

  const onClickHandler = () => {
    if (user) {
      router.push("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center ">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800  py-6 md:py-16">
        See the magic. Try now
      </h1>
      <button
        className="m-auto hover:scale-105 transition-all duration-500 w-auto mt-8 px-12 py-2.5 inline-flex items-center gap-2  rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={onClickHandler}
      >
        Generate Images
        <Image
          width={25}
          height={6}
          loading="lazy"
          quality={10}
          src={assets.star_group} alt="" className="h-6" />
      </button>
    </motion.div>
  );
};

export default GenerateButton;