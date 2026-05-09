import React from "react";
import { mediaProvider } from "@/constants/mediaProvider";

/**
 * FooterBackground Component (Server Component)
 * 
 * Background image and overlay
 * Server-rendered for performance
 */
export const FooterBackground: React.FC = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${mediaProvider.bg.src})` }}
        className="absolute inset-0 bg-cover bg-center bg-fixed"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
    </>
  );
};
