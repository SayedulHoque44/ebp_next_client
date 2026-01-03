import React from "react";
import Link from "next/link";
import { mediaProvider } from "@/constants/mediaProvider";
import Image from "next/image";

const Logo = ({
  nameColor = "text-gray-800",
  showText = true,
  className = "",
  size = "default",
}) => {
  const sizeClasses = {
    sm: {
      image: "h-8 sm:h-10 md:h-12",
      text: "text-xs sm:text-sm md:text-base",
      gap: "gap-1 sm:gap-1.5",
    },
    default: {
      image: "h-12 sm:h-16 md:h-18 lg:h-20 xl:h-22",
      text: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
      gap: "gap-1 sm:gap-2",
    },
    lg: {
      image: "h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32",
      text: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
      gap: "gap-2 sm:gap-3",
    },
  };

  const currentSize =
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default;

  return (
    <Link
      href={"/"}
      className={`flex items-center ${currentSize.gap} hover:opacity-90 transition-opacity duration-200 group ${className}`}
    >
      <Image
        className={`${currentSize.image} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
        src={mediaProvider.logo}
        alt="Easy Bangla Patente Logo"
        width={100}
        height={100}
      />
      {showText && (
        <span
          className={`${nameColor} ${currentSize.text} font-semibold leading-tight transition-colors duration-200`}
        >
          Easy Bangla Patente
        </span>
      )}
    </Link>
  );
};

export default Logo;
