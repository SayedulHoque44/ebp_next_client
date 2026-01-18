
import React from "react";
import { Metadata } from "next";
import YTFreeVideoPage from "@/components/features/YTFreeVideopage";

export const metadata: Metadata = {
  title: "YT Free Video | Easy Bangla Patente",
  description: "YT Free Video | Easy Bangla Patente",
};

export default function index() {
  return <YTFreeVideoPage />;
}
