import React from "react";

/**
 * FounderBackground Component
 *
 * Static background decorative elements for the founder section.
 * This is a simple presentational component to keep the main
 * FounderDetails component cleaner and more focused on content.
 */
const FounderBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
    </div>
  );
};

export default FounderBackground;

