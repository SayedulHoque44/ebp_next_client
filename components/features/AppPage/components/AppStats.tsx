import React from "react";
import { FaStar, FaUsers, FaMobile } from "react-icons/fa";
import { Caption } from "@/components/ui/Typography";

interface AppStatsProps {
  rating: number;
  downloads: string;
  size: string;
}

/**
 * AppStats Component (Server Component)
 * 
 * Displays app statistics (rating, downloads, size)
 * Server-rendered for SEO
 */
export const AppStats: React.FC<AppStatsProps> = ({
  rating,
  downloads,
  size,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
      <div className="flex items-center space-x-1.5">
        <FaStar className="text-yellow-500 text-sm sm:text-base" />
        <Caption className="font-semibold text-sm sm:text-base">
          {rating}
        </Caption>
      </div>
      <div className="flex items-center space-x-1.5 text-gray-600">
        <FaUsers className="text-sm sm:text-base" />
        <Caption className="text-sm sm:text-base">{downloads}</Caption>
      </div>
      <div className="flex items-center space-x-1.5 text-gray-600">
        <FaMobile className="text-sm sm:text-base" />
        <Caption className="text-sm sm:text-base">{size}</Caption>
      </div>
    </div>
  );
};
