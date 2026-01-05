import YTFreeVideo from "@/components/features/Home/YTFreeVideo";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YT Free Video | Easy Bangla Patente",
  description: "YT Free Video | Easy Bangla Patente",
};

export default function YTFreeVideoPage() {
  return <YTFreeVideo />;
}
