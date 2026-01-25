import UniContent from '@/components/features/Dashboard/AdminManagment/UniContent';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Content Management",
    description: "Content Management | Easy Bangla Patente",
};
    
const page = () => {
    return (
        <UniContent />
    );
};

export default page;