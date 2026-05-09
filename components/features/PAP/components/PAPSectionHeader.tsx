import React from "react";
import Image from "next/image";
import { mediaProvider } from "@/constants/mediaProvider";

interface PAPSectionHeaderProps {
  title: string;
  icon?: "privacy" | "check";
  className?: string;
}

/**
 * PAPSectionHeader Component (Server Component)
 * 
 * Reusable section header with optional icon
 * Server-rendered for SEO
 */
export const PAPSectionHeader: React.FC<PAPSectionHeaderProps> = ({
  title,
  icon,
  className = "",
}) => {
  const iconSrc = icon === "privacy" ? mediaProvider.privacyPolicy : icon === "check" ? mediaProvider.check : null;
  const iconAlt = icon === "privacy" ? "privacy policy" : icon === "check" ? "check" : "";
  const iconHeight = icon === "privacy" ? "h-14" : "h-10";

  return (
    <h1 className={`text-4xl mb-2 flex gap-2 items-center ${className}`}>
      <span>{title}</span>
      {iconSrc && (
        <Image
          src={iconSrc}
          className={iconHeight}
          alt={iconAlt}
          width={100}
          height={100}
        />
      )}
    </h1>
  );
};
