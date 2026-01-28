import React from "react";
import type { Metadata } from "next";
import Topics from "@/components/features/Dashboard/AdminManagment/QuizManagment/Topics";

export const metadata: Metadata = {
  title: "Topics | Theory",
  description: "Topics | Theory Con Quiz | Easy Bangla Patente",
};

const TheoryArgumentPage = () => {
  return <Topics />;
};

export default TheoryArgumentPage;
