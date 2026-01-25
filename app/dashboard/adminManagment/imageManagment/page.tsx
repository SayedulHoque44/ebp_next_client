import React from 'react';
import QuizImgManagment from '@/components/features/Dashboard/AdminManagment/QuizImgManagment';
import { Metadata } from 'next';
    // add meta data
    export const metadata: Metadata = {
        title: "Image Managment",
        description: "Image Managment | Easy Bangla Patente",
    };
const page = () => {
    return (
        <QuizImgManagment />
    );
};

export default page;