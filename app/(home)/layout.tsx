import MainLayouts from "@/components/layouts/MainLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayouts>{children}</MainLayouts>;
};

export default layout;
