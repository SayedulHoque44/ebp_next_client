import React from "react";

/**
 * LatestBlogBackground Component (Server Component)
 * 
 * Decorative background circles for the LatestBlog section.
 * Server-rendered for better performance.
 */
const LatestBlogBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary-400 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent-400 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-primary-200 rounded-full"></div>
    </div>
  );
};

export default LatestBlogBackground;
