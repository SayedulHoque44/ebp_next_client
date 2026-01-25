import React from 'react';
import { Metadata } from 'next';
import Arguments from '@/components/features/Dashboard/AdminManagment/QuizManagment/Arguments';
  // addd meta data
  export const metadata: Metadata = {
    title: "Quiz Managment",
    description: "Quiz Managment | Easy Bangla Patente",
  };
const page = () => {
    return (
        <Arguments />
    );
};

export default page;