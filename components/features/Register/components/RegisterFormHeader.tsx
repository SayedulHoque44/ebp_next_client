import React from "react";

/**
 * RegisterFormHeader Component (Server Component)
 * 
 * Form header section
 * Server-rendered for SEO
 */
export const RegisterFormHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Create an account
      </h2>
      <p className="text-gray-600">
        Join our community of successful learners
      </p>
    </div>
  );
};
