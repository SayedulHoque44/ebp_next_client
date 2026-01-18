import BlogSection from "@/components/features/Blog/BlogSection";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs | Web",
};
const page = () => {
  return (
    <>
      <BlogSection />
    </>
  );
};

export default page;
