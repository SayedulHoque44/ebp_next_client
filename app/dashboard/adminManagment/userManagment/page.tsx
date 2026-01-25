import React from 'react';
import UserManagment from '@/components/features/Dashboard/AdminManagment/UserManagment/UserManagment';
import { Metadata } from 'next';
  // addd meta data
  export const metadata: Metadata = {
    title: "All Users",
    description: "All Users | Easy Bangla Patente",
  };
const page = () => {
    return (
        <UserManagment />
    );
};

export default page;