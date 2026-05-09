"use client";

import React from "react";
import { Heading1, Body } from "@/components/ui/Typography";
import { LoginTestimonialCarousel } from "./LoginTestimonialCarousel";

/**
 * LoginBranding Component (Client Component)
 * 
 * Branding section with welcome message and testimonials
 * Client component for testimonials carousel
 */
export const LoginBranding: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-12 text-white">
      {/* Main Content */}
      <div className="flex flex-col justify-center max-w-md items-center">
        <Heading1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-center text-white">
          Welcome Back!
        </Heading1>
        <Body className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed text-center font-sans">
          Continue your journey to master Italian driving theory with our
          comprehensive study materials and expert guidance.
        </Body>

        {/* Testimonial Carousel */}
        <LoginTestimonialCarousel />
      </div>
    </div>
  );
};
