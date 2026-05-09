"use client";

import React, { useEffect, useState } from "react";
import { Body, Caption } from "@/components/ui/Typography";
import { LoginTestimonials } from "@/constants/constendData";

/**
 * LoginTestimonialCarousel Component (Client Component)
 * 
 * Testimonials carousel with auto-rotation
 * Client component for state management and animations
 */
export const LoginTestimonialCarousel: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % LoginTestimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Testimonial Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full">
        <div className="transition-all duration-500 ease-in-out">
          <Body className="text-gray-200 text-base sm:text-lg leading-relaxed mb-4">
            &quot;{LoginTestimonials[currentTestimonial].feedback}&quot;
          </Body>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <Caption className="text-white font-bold text-sm">
                {LoginTestimonials[currentTestimonial].initials}
              </Caption>
            </div>
            <div>
              <Body className="font-semibold text-white">
                {LoginTestimonials[currentTestimonial].name}
              </Body>
              <Caption className="text-gray-400 text-sm">
                {LoginTestimonials[currentTestimonial].location}
              </Caption>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 justify-center">
        {LoginTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentTestimonial
                ? "bg-white w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};
