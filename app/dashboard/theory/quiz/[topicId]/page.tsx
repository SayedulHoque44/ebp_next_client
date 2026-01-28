import React from "react";
import type { Metadata } from "next";
import Quizzes from "@/components/features/Dashboard/AdminManagment/QuizManagment/Quizzes";

export const metadata: Metadata = {
  title: "Quizzes | Theory",
  description: "Quizzes | Theory Con Quiz | Easy Bangla Patente",
};

const TheoryQuizPage = () => {
  return <Quizzes />;
};

export default TheoryQuizPage;
