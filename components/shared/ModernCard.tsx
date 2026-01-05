import React from "react";

const ModernCard = ({
  children,
  className = "",
  variant = "default",
  hover = true,
  padding = "md",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "flat" | "glass" | "gradient";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  const baseClasses = "transition-all duration-300";

  const variants = {
    default: "modern-card",
    elevated: "card-elevated",
    flat: "card-flat",
    glass: "glass-effect",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200",
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const hoverClasses = hover ? "hover:shadow-medium hover:-translate-y-1" : "";

  const cardClasses = `${baseClasses} ${variants[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default ModernCard;
