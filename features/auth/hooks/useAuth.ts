"use client";
import { AuthContext, IAuthContext } from "@/providers/Auth/AuthProvider";
import { useContext } from "react";

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
