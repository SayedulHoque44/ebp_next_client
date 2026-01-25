"use client";
import useAuth from '@/features/Auth/hooks/useAuth';
import React from 'react';
import DashboradContent from './DashboradContent';
import { IUser } from '@/features/User/interface/user.interface';

const DashboardContentWrapper = () => {
    const { user } = useAuth();
    return (
        <DashboradContent user={user as IUser} />
    );
};

export default DashboardContentWrapper;