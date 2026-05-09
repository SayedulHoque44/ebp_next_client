import React from "react";
import { Heading2, Body } from "@/components/ui/Typography";

/**
 * LoginFormHeader Component (Server Component)
 * 
 * Form header section
 * Server-rendered for SEO
 */
export const LoginFormHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <Heading2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        Sign in to your account
      </Heading2>
      <Body className="text-gray-600">
        Welcome back! Please enter your details.
      </Body>
    </div>
  );
};
