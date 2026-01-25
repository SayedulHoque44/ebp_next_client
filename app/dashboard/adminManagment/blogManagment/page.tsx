import React from 'react';
import BlogManagment from '@/components/features/Dashboard/AdminManagment/BlogManagment/BlogManagment';
import { Metadata } from 'next';
  // addd meta data
  export const metadata: Metadata = {
    title: "All Blogs",
    description: "All Blogs | Easy Bangla Patente",
  };
const page = () => {
    return (
        <BlogManagment />
    );
};

export default page;