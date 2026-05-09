import React from "react";
import { mediaProvider } from "@/constants/mediaProvider";

/**
 * RegisterBackground Component (Server Component)
 * 
 * Background image section
 * Server-rendered for performance
 * Reuses same background as Login
 */
export const RegisterBackground: React.FC = () => {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      style={{
        backgroundImage: `url(${mediaProvider.bg2.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
    </div>
  );
};
