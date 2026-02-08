"use client";
import React, { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";

type AppContextValue = {
  user: ReturnType<typeof useUser>["user"];
};

const AppContext = createContext<AppContextValue | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return ctx;
};

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

export default AppContext;
