import React from "react";
import MainLayouts from "@/components/layouts/MainLayout";

const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayouts>{children}</MainLayouts>;
};

export default BlogsLayout;
