import BlogSection from "@/components/features/Blog/BlogSection";
import { Metadata } from "next";
import React from "react";

/**
 * Generate metadata for blogs listing page
 */
export const metadata: Metadata = {
  title: "Blogs | Easy Bangla Patente",
  description:
    "Stay updated with our latest insights, tips, and success stories from our driving school community. Discover valuable information to help you on your journey to getting your Italian driving license.",
  openGraph: {
    title: "Blogs | Easy Bangla Patente",
    description:
      "Stay updated with our latest insights, tips, and success stories from our driving school community.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Easy Bangla Patente",
    description:
      "Stay updated with our latest insights, tips, and success stories from our driving school community.",
  },
  alternates: {
    canonical: "/blogs",
  },
};

const page = () => {
  return <BlogSection />;
};

export default page;
