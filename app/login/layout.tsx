import MainLayouts from "@/components/layouts/MainLayout";
import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayouts>{children}</MainLayouts>;
};

export default LoginLayout;

