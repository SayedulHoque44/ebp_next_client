"use client";
import React, { createContext, useMemo, memo } from "react";

interface TheoryContextValue {
  isTheory: boolean;
  isAdmin: boolean;
}

export const TheoryProvider = createContext<TheoryContextValue>({
  isTheory: false,
  isAdmin: false,
});

interface QuizManagmentProps {
  isTheory?: boolean;
  isAdmin?: boolean;
  children: React.ReactNode;
}

const QuizManagment = memo(({ isTheory = false, isAdmin = false, children }: QuizManagmentProps) => {
  const contextValue = useMemo<TheoryContextValue>(
    () => ({
      isTheory,
      isAdmin,
    }),
    [isTheory, isAdmin]
  );

  return (
    <TheoryProvider.Provider value={contextValue}>
      {children}
    </TheoryProvider.Provider>
  );
});

QuizManagment.displayName = "QuizManagment";

export default QuizManagment;
