import React from "react";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";

/**
 * BlogLoading Component (Server Component)
 * 
 * Loading state
 * Server-rendered for fast initial display
 */
export const BlogLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderCircleWithBar />
    </div>
  );
};
