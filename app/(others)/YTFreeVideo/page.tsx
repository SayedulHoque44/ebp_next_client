import React from "react";
import { Metadata } from "next";
import YTFreeVideoPage from "@/components/features/YTFreeVideopage";

/**
 * Generate metadata for free YouTube videos page
 */
export const metadata: Metadata = {
  title: "Free YouTube Videos | প্রথম ২ অধ্যায়ের ফ্রি ভিডিও | Easy Bangla Patente",
  description:
    "Watch free YouTube videos for the first 2 chapters of Italian driving theory. Access comprehensive educational videos designed to help you master the Italian driving license exam. Learn at your own pace with our free video content.",
  openGraph: {
    title: "Free YouTube Videos | প্রথম ২ অধ্যায়ের ফ্রি ভিডিও | Easy Bangla Patente",
    description:
      "Watch free YouTube videos for the first 2 chapters of Italian driving theory. Access comprehensive educational videos designed to help you master the Italian driving license exam.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Videos | Easy Bangla Patente",
    description:
      "Watch free YouTube videos for the first 2 chapters of Italian driving theory. Access comprehensive educational videos.",
  },
  alternates: {
    canonical: "/YTFreevideo",
  },
};

export default function YTFreeVideoPageRoute() {
  return <YTFreeVideoPage />;
}

