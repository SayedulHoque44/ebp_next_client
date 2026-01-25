import React from 'react';
import Cerca from '@/components/features/Dashboard/Cerca';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cerca Quiz",
  description: "Cerca Quiz | Easy Bangla Patente",
};

const page = () => {
  return (
    <Cerca />
  );
};

export default page;
