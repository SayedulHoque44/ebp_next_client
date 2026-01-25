import React from 'react';
import QuizPerArgument from '@/components/features/Dashboard/QuizPerArgument';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Quiz Per Argument",
  description: "Quiz Per Argument | Easy Bangla Patente",
};

const page = () => {
  return (
    <QuizPerArgument />
  );
};

export default page;
