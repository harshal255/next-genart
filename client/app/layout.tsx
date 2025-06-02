/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import "./globals.css";
import AppContextProvider from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/client-api";
import { outfit } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: "Next GenArt",
  description: "AI Generated Image build in Nextjs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialToken = (await cookies()).get('token')?.value || null;
  let initialUser: any = null;
  let initialCredit: number = 0;

  if (initialToken) {
    // Fetch user data on server if token exists
    try {
      const res: any = await apiClient.loadCreditData(initialToken!);
      if (res.success) {
        const { data } = res;
        initialUser = data.user;
        initialCredit = data.credits || 0;
      }

    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <html lang="en" className={outfit.variable}>
      <body
        className={`antialiased font-sans`}
      >
        <AppContextProvider props={{ initialToken, initialUser, initialCredit }}>
          <div className="relative min-h-screen overflow-x-hidden">
            {/* ——— Gradient + Grid Overlay ——— */}
            <div
              className="absolute inset-0 -z-10 h-full w-full"
              style={{
                background: "linear-gradient(to bottom, #ff9696, #782e2e)",
                backgroundImage: `
            linear-gradient(to right, rgba(128, 128, 128, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.06) 1px, transparent 1px)
          `,
                backgroundSize: "14px 24px",
              }}
            >
              {/* ——— Fuchsia Glow ——— */}
              <div
                className="absolute left-0 right-0 top-0 -z-10 m-auto
                     h-[310px] w-[310px] rounded-full
                     bg-fuchsia-400 opacity-20 blur-[100px]"
              />
            </div>

            {/* ——— Your Home Content ——— */}
            <ToastContainer position="bottom-right" />

            <div className="px-4 sm:px-10 md:px-14 lg:px-28">
              <Navbar />
              {children}

              <div
                className="absolute  left-1/3 bottom-0 -z-10 m-auto
                     h-[310px] w-[310px] rounded-full
                     bg-fuchsia-400 opacity-30 blur-[100px]"
              />
              <Footer />
            </div>
          </div>

        </AppContextProvider>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </html>
  );
}
