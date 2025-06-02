/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext } from "react";
import { plans } from "@/app/assets";
import { motion } from "framer-motion";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/client-api";
import config from "@/config";

const BuyCredit = () => {
  const { user, loadCreditsData, token, setShowLogin } =
    useContext(AppContext)!;
  const router = useRouter();

  const initPay = async (order: any) => {
    const options = {
      key: config.razorpay_key_id!,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credit Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: any) => {
        try {
          const res: any = await apiClient.verifyRazorpayPayment(response, token!);
          if (res.success) {
            loadCreditsData();
            router.push("/");
            toast.success("Credits Added");
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorPay = async (planId: string) => {
    try {
      if (!user) {
        setShowLogin(true);
      }
      const res: any = await apiClient.createRazorpayOrder(planId, token!);
      const { data } = res;
      if (!res.success) {
        console.log("data success is false");
        return;
      } else {
        initPay(data.order);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h[80vh] text-center pt-14 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plans
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item: any, index: any) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            {/* <img src={assets.logo_icon} alt="" width={40} /> */}
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">₹{item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52"
              onClick={() => paymentRazorPay(item.id)}
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;