/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { assets } from "@/app/assets";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { AppContext } from "@/context/AppContext";
import { apiClient } from "@/lib/client-api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Image from "next/image";

const Login = () => {
  const [state, setstate] = useState("Login");
  const { setUser, setToken, setShowLogin } = useContext(AppContext)!;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "Login") {
        const res: any = await apiClient.loginUser({ email, password });
        const { data } = res;
        setLoading(false);

        if (res.success) {
          setToken(data.token);
          setUser(data.user);
          // localStorage.setItem("token", data.token);
          Cookies.set("token", data.token, {
            expires: 1,           // 1 day (or however many days you want)
            sameSite: "lax",       // or "strict", depending on your needs
            secure: true,
          });
          setShowLogin(false);
        } else {
          console.log({ res });
          toast.error(res.message || "Login failed");
        }
      } else {
        const res: any = await apiClient.registerUser({ name, email, password });
        const { data } = res;
        setLoading(false);

        if (res.success) {
          setToken(data.token);
          setUser(data.user);
          // localStorage.setItem("token", data.token);
          Cookies.set("token", data.token, {
            expires: 1,           // 1 day (or however many days you want)
            sameSite: "lax",       // or "strict", depending on your needs
            secure: true,
          });
          setShowLogin(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Server error");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div>
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        action=""
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium ">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please {state} to continue</p>
        <div className="flex items-center justify-center flex-col">
          {state !== "Login" && (
            <div className="border px-6  flex items-center gap-2 rounded-full mt-5">

              <Image
                src={assets.profile_icon}
                alt="Profile Icon"
                width={35}
                height={35}
                quality={50}
                loading="lazy"
              />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter full name"
                required
                className="outline-none text-sm"
              />
            </div>
          )}
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <Image
              src={assets.email_icon}
              alt="Email Icon"
              width={19}
              height={19}
              quality={50}
              loading="lazy"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email id"
              required
              className="outline-none text-sm"
            />
          </div>
          <div className="border px-6  flex items-center gap-2 rounded-full py-2 mt-5">
            <Image
              src={assets.lock_icon}
              alt="Lock Icon"
              width={15}
              height={15}
              quality={50}
              loading="lazy"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Password"
              required
              className="outline-none text-sm"
            />
          </div>
          <p
            className="text-sm text-blue-600 my-6 cursor-pointer relative right-16 
										"
          >
            Forgot Password?
          </p>

          <button className="bg-blue-600 w-full text-white py-2 rounded-full ">
            {state === "Login" ? "login" : "create"}
            {loading && (
              <ClipLoader color="#ffff" size={20} className="ml-2 mt-1" />
            )}
            <span></span>
          </button>

          {state !== "Login" ? (
            <div>
              <p className="mt-5 text-center">
                Already have an account?
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setstate("Login")}
                >
                  {" "}
                  Login
                </span>
              </p>
              <Image
                width={24}
                height={24}
                quality={50}
                loading="lazy"
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt=""
                className="absolute top-5 right-5 cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <p className="mt-5 text-center">
                Don&apos;t have an account?
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => setstate("Signup")}
                >
                  {" "}
                  Sign up
                </span>
              </p>
              <Image
                src={assets.cross_icon}
                alt="Close"
                width={24}
                height={24}
                quality={50}
                loading="lazy"
                onClick={() => setShowLogin(false)}
                className="absolute top-5 right-5 cursor-pointer"
              />
            </div>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Login;