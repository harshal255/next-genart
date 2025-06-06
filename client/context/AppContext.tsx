/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Login from "@/components/Login";
import config from "@/config";
import { apiClient } from "@/lib/client-api";
import { IUser } from "@/lib/types";
import Modal from "@/portal/modal";
import { useRouter } from "next/navigation";
import React, { createContext, useState, ReactNode, useEffect, useRef, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

// 1. Define the type for your context value
interface AppContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  credit: number;
  setCredit: React.Dispatch<React.SetStateAction<number>>;
  loadCreditsData: () => void;
  logout: () => void;
  generateImage: (prompt: string) => Promise<any>;
  wakeupServer?: boolean;
  setWakeupServer?: React.Dispatch<React.SetStateAction<boolean>>;
}

// 2. Create the context with default value `null`
export const AppContext = createContext<AppContextType | null>(null);

// 3. Define the props for the provider
interface AppContextProviderProps {
  children: ReactNode;
  props: {
    initialToken: string | null;
    initialUser: any | null;
    initialCredit: number
  }
}

// 4. Create the Provider Component
const AppContextProvider: React.FC<AppContextProviderProps> = ({ props: { initialToken, initialUser, initialCredit }, children }) => {
  const [user, setUser] = useState<IUser | null>(initialUser);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(initialToken);
  const [credit, setCredit] = useState(initialCredit);
  const [wakeupServer, setWakeupServer] = useState<boolean>(false);
  const router = useRouter();
  const backendTabRef = useRef<Window | null>(null);

  const loadCreditsData = useCallback(async () => {
    try {
      const res: any = await apiClient.loadCreditData(token!);
      if (res.success) {
        const { data } = res;
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [token]);

  const logout = useCallback(() => {
    Cookies.remove('token');
    setToken('');
    setUser(null);
    router.push("/");
  }, []);

  const generateImage = useCallback(async (prompt: string) => {
    try {
      const res: any = await apiClient.generateImage(prompt, token!);
      const { data } = res;
      if (res.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          router.push("/buy");
          toast.error("No Credit Balance");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [token, loadCreditsData, router]);

  const checkServerWakeUp = async () => {
    const res: any = await fetch(config.server_url);
    if (res.ok) {
      console.log("server already started..")
      sessionStorage.setItem("wakeup-server", "true");
      setWakeupServer(true);
    }
  }

  const value = useMemo(() => ({
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  }), [
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  ]);


  //This line runs immediately when the component initializes — before React has a chance to fully load the browser environment or run effects. At that point, localStorage may still be undefined (especially during hydration).
  //✅ The Right Way: Delay Access with useEffect
  useEffect(() => {
    const alreadyWakeUp = sessionStorage.getItem("wakeup-server");
    let backendTab: Window | null = null;

    if (!alreadyWakeUp) {
      backendTab = window.open(config.server_url, '_blank');
      if (backendTab) {
        backendTabRef.current = backendTab; // Store the reference
        checkServerWakeUp();
      }
    }
    return () => {
      if (backendTab && !backendTab.closed) {
        backendTab.close(); // Close the tab when component unmounts
      }
    };
  }, []);

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  useEffect(() => {
    if (backendTabRef.current && wakeupServer) {
      const timeoutId = setTimeout(() => {
        backendTabRef.current?.close();
        backendTabRef.current = null;
      }, 3000);

      return () => {
        clearTimeout(timeoutId); // Clear timeout if effect re-runs or unmounts
      };
    }
  }, [wakeupServer]);

  console.log({ wakeupServer, tabref: backendTabRef.current });
  return <AppContext.Provider value={value}>
    {showLogin && (
      <Modal>
        <Login />
      </Modal>
    )}
    {children}
  </AppContext.Provider>;
};

export default AppContextProvider;
