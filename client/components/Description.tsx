'use client';
import React from "react";
import { assets } from "@/app/assets";
import { motion } from "framer-motion"
import Image from "next/image";


const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <Image
          src={assets.sample_img_3}
          alt=""
          width={400}
          height={400}
          quality={85}
          loading="lazy"
          className="w-80 xl:w-96 rounded-lg"
          sizes="(max-width: 640px) 320px, (max-width: 1280px) 400px, 480px"
        />

        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-2">
            A futuristic workspace where a person types on a glowing keyboard and vibrant digital art images float in holograms around them. The environment is sleek, creative, and high-tech, representing AI and creativity merging. The color palette includes soft blues, purples, and neon pin
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;