import React from "react";
import type { Metadata } from "next";
import Quizzes from "@/components/features/Dashboard/AdminManagment/QuizManagment/Quizzes";

export const metadata: Metadata = {
  title: "Quizzes Management",
  description: "Quizzes Management | Easy Bangla Patente",
};

interface QuizPageProps {
  params: {
    topicId: string;
  };
}

const QuizPage = ({ params }: QuizPageProps) => {
  return <Quizzes />;
};

export default QuizPage;
