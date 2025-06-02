/* eslint-disable @next/next/no-img-element */
'use client';
import React from "react";
import { assets, testimonialsData } from "@/app/assets";
import { motion } from 'framer-motion'
import Image from "next/image";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12" >
      <h1 className="text-3xl sm:text-4xl font font-semibold">
        Customer testimonials
      </h1>
      <p className="text-gray-500 mb-12">What our customers are saying</p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/20 p-12 rounded-lg shadow-md w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex flex-col items-center ">
              <Image
                src={testimonial.image}
                alt="User"
                width={56}
                height={56}
                quality={50}
                loading="lazy"
                className="rounded-full w-14"
              />
              <h2>{testimonial.name}</h2>
              <p className="font-light text-zinc-700">{testimonial.role}</p>
              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill(" ")
                  .map((_, starIndex) => (
                    <Image
                      src={assets.rating_star}
                      alt="Rating Star"
                      width={16} 
                      height={16}
                      quality={50}
                      loading="lazy"
                      key={`star-${index}-${starIndex}`}
                    />
                  ))}
              </div>
              <p>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;