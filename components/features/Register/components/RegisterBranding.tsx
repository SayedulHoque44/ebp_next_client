"use client";

import React from "react";
import { LoginTestimonialCarousel } from "@/components/features/Login/components/LoginTestimonialCarousel";

/**
 * RegisterBranding Component (Client Component)
 * 
 * Branding section with welcome message and testimonials
 * Client component for testimonials carousel
 * Reuses LoginTestimonialCarousel component
 */
export const RegisterBranding: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-12 text-white">
      {/* Main Content */}
      <div className="flex flex-col justify-center max-w-md items-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Master Italian Driving Theory
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Join thousands of students successfully passing their Italian driving
          license exam with our comprehensive study materials and expert guidance.
        </p>

        {/* Testimonial Carousel */}
        <LoginTestimonialCarousel />
      </div>
    </div>
  );
};
