"use client";
import useAuthDataDefine from "@/features/auth/hooks/auth.hooks";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect } from "react";
import {
  ILoginRequest,
  ILoginResponse,
} from "@/features/auth/interface/auth.interface";
import { IUser } from "@/features/User/interface/user.interface";

export interface IAuthContext {
  refetchQuery: (callBack: () => any) => void;
  login: (data: ILoginRequest) => Promise<ILoginResponse | any>;
  logout: () => Promise<void>;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  clearAccessToken: () => void;
  setIsLoading: (isLoading: boolean) => void;
  accessToken: string | null;
  isLoading: boolean;
  user: IUser | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const allContext = useAuthDataDefine();
  const pathName = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
  return (
    <AuthContext.Provider value={allContext as IAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
