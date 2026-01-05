import React from "react";
import BlogSection from "@/components/features/Blog/BlogSection";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs | Easy Bangla Patente",
};
const page = () => {
  return (
    <div>
      <BlogSection />
    </div>
  );
};

export default page;
