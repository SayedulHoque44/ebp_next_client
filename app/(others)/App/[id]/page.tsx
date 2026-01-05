import AppPage from "@/components/features/AppPage";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "App",
  description: "App | Easy Bangla Patente",
};
const page = () => {
  return <AppPage />;
};

export default page;
