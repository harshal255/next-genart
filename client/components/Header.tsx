/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { assets } from "@/app/assets";
import { AppContext } from "@/context/AppContext";
import { useRouter } from 'next/navigation'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)!;
  const router = useRouter()
  const onClickHandler = () => {
    if (user) {
      router.push('/result')
    } else {
      setShowLogin(true);
    }
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 0.8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center items-center text-center my-20"
      >
        <motion.div
          initial={{ opacity: 0.2, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        >
          <p>Best prompt to image generator</p>
          <img src={assets.star_icon} alt="" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-4xl max-w-[1000px] sm:text-7xl sm:test-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
        >
          Turn Prompt to <span className="text-[#b235ff]">Image</span>, in seconds.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-5 text-center max-w-xl mx-auto"
        >
          Unleash your creativity with AI. Turn your imagination into visual art
          in seconds - just type, and watch the magic
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 0.8 },
          }}
          className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
          onClick={onClickHandler}
        >
          Generate images
          <img src={assets.star_group} alt="" className="h-6" />
        </motion.button>

        <div>
          <div className="flex flex-wrap mt-16 gap-3">
            {Array(6)
              .fill(" ")
              .map((items, index) => (
                <img
                  src={
                    index % 3 === 0 ? assets.sample_img_4 : index % 3 === 2 ? assets.sample_img_5 : assets.sample_img_3
                  }
                  alt=""
                  key={index}
                  width={70}
                  height={70}
                  className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                />
              ))}
          </div>
          <p className="mt-2 text-neutral-600">Generated images from Next GenArt</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;