import React from "react";
import Feedback from "@/components/features/Feedback";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Feedback",
  description: "Feedback | Easy Bangla Patente",
};
const page = () => {
  return <Feedback />;
};

export default page;
