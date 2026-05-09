import React from "react";
import { TiInfo } from "react-icons/ti";

/**
 * RegisterFormWarning Component (Server Component)
 * 
 * Warning message for form validation
 * Server-rendered for SEO
 */
export const RegisterFormWarning: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <TiInfo className="text-amber-600 text-xl mt-0.5 flex-shrink-0" />
        <p className="text-amber-800 text-sm font-medium leading-relaxed">
          আপনার ইনফরমেশনগুলো ভালোভাবে চেক করে দিবেন, এগুলা খুবই গুরুত্বপূর্ণ,
          সঠিক নাম্বার না দিলে আপনাকে বাতিল করা হবে।
        </p>
      </div>
    </div>
  );
};
