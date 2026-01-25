import React from 'react';
import PatenteBooks from '@/components/features/Dashboard/PatenteBooks/PatenteBooks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Patente Books",
  description: "Patente Books | Easy Bangla Patente",
};

const page = () => {
  return (
    <PatenteBooks />
  );
};

export default page;
