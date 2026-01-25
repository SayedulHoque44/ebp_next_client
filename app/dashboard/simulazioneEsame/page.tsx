import React from 'react';
import SimulazioneEsame from '@/components/features/Dashboard/SimulazioneEsame';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Simulazione Esame",
  description: "Simulazione Esame | Easy Bangla Patente",
};

const page = () => {
  return (
    <SimulazioneEsame />
  );
};

export default page;
