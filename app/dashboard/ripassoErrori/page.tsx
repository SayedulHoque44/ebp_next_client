import React from 'react';
import RipassoErrori from '@/components/features/Dashboard/RipassoErrori';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ripasso Errori",
  description: "Ripasso Errori | Easy Bangla Patente",
};

const page = () => {
  return (
    <RipassoErrori />
  );
};

export default page;
