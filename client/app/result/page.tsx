/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { FormEvent, useContext, useState } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import sampleImg from "@/public/assets/sample_img_6.png";

const Result = () => {
  const [image, setImage] = useState<any>(sampleImg);
  const [isImageLoaded, setisImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext)!;
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        console.log("image created successfully");
        setisImageLoaded(true);
        setLoading(true);
        setImage(image);
      }
    }
    setLoading(false);
    setInput("");
  };
  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      action=""
      className="flex flex-col min-h-[90vh] justify-center items-center"
      onSubmit={onSubmitHandler}
    >
      <div>
        <div className="relative">
          <div className="relative w-64 h-64 sm:w-[400px] sm:h-[400px]">
            <Image
              src={image}
              alt="Responsive image"
              priority
              fill
              placeholder="blur"
              className="object-cover rounded-lg"
            />
          </div>
          <span
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500
              transition-all  ${loading ? "w-full duration-[10s]" : "w-0 duration-[0s]"
              } `}
          />
        </div>
        {loading && (
          <Loader />
        )}

      </div>
      {!isImageLoaded && (
        <div className="flex flex-col w-full max-w-xl bg-neutral-50 text-gray-800 rounded-xl text-sm mt-10 border p-3">
          <textarea
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto"; // Reset height to recalculate
              e.target.style.height = `${e.target.scrollHeight}px`; // Auto-adjust height
            }}
            value={input}
            placeholder="A surreal, futuristic portrait of a serene human figure with closed eyes..."
            className="bg-transparent outline-none resize-none placeholder-text text-md px-4 py-2 rounded-md overflow-hidden min-h-[50px] text-justify"
            rows={1} // Start small, grow as needed
          />

          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 duration-300 rounded-full text-white hover:text-white hover:font-semibold mt-4 self-center"
          >
            Generate
          </button>
        </div>
      )}


      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
            onClick={() => {
              setisImageLoaded(false);
            }}
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;