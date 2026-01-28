import QuizManagment from "@/components/features/Dashboard/AdminManagment/QuizManagment";
import React from "react";

const TheoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QuizManagment isTheory isAdmin={false}>
      {children}
    </QuizManagment>
  );
};

export default TheoryLayout;
