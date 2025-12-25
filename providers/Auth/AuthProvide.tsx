"use client";
import useAuthDataDefine from "@/features/auth/hooks/auth.hooks";
import React from "react";
import { AuthContext } from "./AuthProvider";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const allContext = useAuthDataDefine();
  return (
    <AuthContext.Provider value={allContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
