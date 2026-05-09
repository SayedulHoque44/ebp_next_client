import React from "react";
import QuizBook from "@/components/features/Dashboard/QuizBook/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Book",
  description: "Quiz Book | Easy Bangla Patente",
};
const page = () => {
  return <QuizBook />;
};

export default page;
