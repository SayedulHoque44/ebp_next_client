"use client";

import React from "react";
import { RegisterBackground } from "./components/RegisterBackground";
import { RegisterBranding } from "./components/RegisterBranding";
import { RegisterForm } from "./components/RegisterForm";

/**
 * Register Component (Client Component)
 * 
 * Main registration page layout
 * Client component for full page interactivity
 * Note: Registration pages typically need to be client components due to form handling requirements
 */
const Register = () => {
  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Panel - Branding/Marketing */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <RegisterBackground />
        <RegisterBranding />
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-50 lg:rounded-tl-4xl lg:rounded-bl-4xl md:rounded-tl-none md:rounded-bl-none">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
