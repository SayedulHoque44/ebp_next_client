"use client";

import React from "react";
import { LoginBackground } from "./components/LoginBackground";
import { LoginBranding } from "./components/LoginBranding";
import { LoginForm } from "./components/LoginForm";

/**
 * LoginPage Component (Client Component)
 * 
 * Main login page layout
 * Client component for full page interactivity
 * Note: Login pages typically need to be client components due to form handling
 */
const LoginPage = () => {
  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Panel - Branding/Marketing */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <LoginBackground />
        <LoginBranding />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-50 lg:rounded-tl-4xl lg:rounded-bl-4xl md:rounded-tl-none md:rounded-bl-none">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
