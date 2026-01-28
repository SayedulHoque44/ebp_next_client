import React from "react";
import Image from "next/image";
import { Heading3, Caption } from "@/components/ui/Typography";

interface CourseFeatureCardProps {
  icon: string;
  title: string;
  duration: string;
  variant: "primary" | "accent";
  alt: string;
}

/**
 * CourseFeatureCard Component (Server Component)
 * 
 * Individual course feature card.
 * Server-rendered for SEO and performance.
 */
const CourseFeatureCard: React.FC<CourseFeatureCardProps> = ({
  icon,
  title,
  duration,
  variant,
  alt,
}) => {
  const bgGradient =
    variant === "primary"
      ? "bg-gradient-to-br from-primary-50 to-primary-100"
      : "bg-gradient-to-br from-accent-50 to-accent-100";

  const iconBg = variant === "primary" ? "bg-primary-500" : "bg-accent-500";
  const textColor =
    variant === "primary" ? "text-primary-600" : "text-accent-600";

  return (
    <div className={`flex items-start gap-4 p-4 ${bgGradient} rounded-xl`}>
      <div
        className={`shrink-0 w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}
      >
        <Image
          src={icon}
          width={100}
          height={100}
          alt={alt}
          className="w-6 h-6"
        />
      </div>
      <div>
        <Heading3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
          {title}
        </Heading3>
        <Caption className={`${textColor} font-medium`}>{duration}</Caption>
      </div>
    </div>
  );
};

export default CourseFeatureCard;
