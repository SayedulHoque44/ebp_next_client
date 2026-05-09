import React, { ReactNode } from "react";

interface PAPSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * PAPSection Component (Server Component)
 * 
 * Reusable section wrapper
 * Server-rendered for SEO
 */
export const PAPSection: React.FC<PAPSectionProps> = ({
  children,
  className = "",
}) => {
  return <div className={className}>{children}</div>;
};
