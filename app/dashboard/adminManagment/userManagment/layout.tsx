import AdminRoute from '@/providers/AdminRoute';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AdminRoute>
            {children}
        </AdminRoute>
    );
};

export default layout;