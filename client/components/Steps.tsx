/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { stepsData } from "@/app/assets";
import { motion } from "framer-motion"


const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32">
      <h1 className="tet-3xl sm:text-4xl font-semibold mb-2">How it works</h1>
      <p className="text-lg text-gray-600 mb-8">
        Transform Words Into Stunning Images
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item: any, index: any) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 px-8 bg-white rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300"
          >
            <img src={item.icon} alt="" width={40} height={40} />
            <div>
              <h2
                className="text-cl font-med
              "
              >
                {item.title}
              </h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;