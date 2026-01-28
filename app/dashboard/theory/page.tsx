import React from "react";
import type { Metadata } from "next";
import Arguments from "@/components/features/Dashboard/AdminManagment/QuizManagment/Arguments";

export const metadata: Metadata = {
  title: "Theory Con Quiz",
  description: "Theory Con Quiz | Easy Bangla Patente",
};

const TheoryPage = () => {
  return <Arguments />;
};

export default TheoryPage;
