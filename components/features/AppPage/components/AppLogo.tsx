import React from "react";
import Image from "next/image";

interface AppLogoProps {
  logoLink: string;
  name: string;
  version: string;
  appId: number;
}

/**
 * AppLogo Component (Server Component)
 * 
 * Displays app logo with version badge
 * Server-rendered for SEO and fast initial load
 */
export const AppLogo: React.FC<AppLogoProps> = ({
  logoLink,
  name,
  version,
  appId,
}) => {
  return (
    <div className="relative shrink-0">
      <Image
        src={logoLink}
        alt={`${name} app logo`}
        width={128}
        height={128}
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl shadow-2xl"
        style={{
          boxShadow: `0px 20px 40px 0px ${
            appId === 2 ? "#003830" : "#c796fa"
          }`,
        }}
        priority
      />
      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
        {version}
      </div>
    </div>
  );
};
