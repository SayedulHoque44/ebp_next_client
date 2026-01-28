import React from "react";

/**
 * IntroVideoBackground Component (Server Component)
 * 
 * Decorative background circles for the IntroVideo section.
 * Server-rendered for better performance.
 */
const IntroVideoBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary-500 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-500 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary-300 rounded-full"></div>
    </div>
  );
};

export default IntroVideoBackground;
