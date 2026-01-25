import React from 'react';
import SingleUc from '@/components/features/Dashboard/AdminManagment/UniContent/SingleUC';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Content Details",
  description: "Content Details | Easy Bangla Patente",
};

const page = () => {
  return (
    <SingleUc />
  );
};

export default page;
