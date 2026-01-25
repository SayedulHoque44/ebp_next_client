import React from 'react';
import TopicSelection from '@/components/features/Dashboard/QuizPerArgument/TopicSelection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Topic Selection",
  description: "Topic Selection | Easy Bangla Patente",
};

const page = () => {
  return (
    <TopicSelection />
  );
};

export default page;
