import QuizManagment from '@/components/features/Dashboard/AdminManagment/QuizManagment';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <QuizManagment isAdmin={true}>
            {children}
        </QuizManagment>
    );
};

export default layout;