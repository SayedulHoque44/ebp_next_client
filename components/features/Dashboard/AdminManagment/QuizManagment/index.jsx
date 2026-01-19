import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const TheoryProvider = createContext("");
const QuizManagment = ({ isTheory, isAdmin }) => {
  return (
    <TheoryProvider.Provider
      value={{ isTheory: isTheory || false, isAdmin: isAdmin || false }}
    >
      <Outlet />
    </TheoryProvider.Provider>
  );
};

export default QuizManagment;
