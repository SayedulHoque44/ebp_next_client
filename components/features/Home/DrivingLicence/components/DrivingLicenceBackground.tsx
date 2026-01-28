import React from "react";

/**
 * DrivingLicenceBackground Component (Server Component)
 * 
 * Static background decorative elements.
 * Server-rendered for better performance and SEO.
 */
const DrivingLicenceBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full"></div>
    </div>
  );
};

export default DrivingLicenceBackground;
