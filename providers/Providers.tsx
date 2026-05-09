"use client";

import React from "react";
import { Toaster } from "sonner";

// Dynamic Import
// const AuthProvider = dynamic(() => import("./Auth/AuthProvide"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
// const TanstackProvider = dynamic(() => import("./TanstackProvider"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
import TanstackProvider from "./TanstackProvider";

import AuthProvider from "./Auth/AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </TanstackProvider>
  );
};

export default Providers;
