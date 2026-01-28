import React from "react";
import type { Metadata } from "next";
import TopicTheroy from "@/components/features/Dashboard/AdminManagment/QuizManagment/Theroy";

export const metadata: Metadata = {
  title: "Topic Theory",
  description: "Topic Theory | Theory Con Quiz | Easy Bangla Patente",
};

const TheoryTopicsPage = () => {
  return <TopicTheroy />;
};

export default TheoryTopicsPage;
