import React from "react";
import { HiMenu, HiX } from "react-icons/hi";

const MobileMenuToggle = ({
  isOpen = false,
  onToggle,
  className = "",
  size = "md",
  variant = "default",
}: {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "dark" | "minimal";
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-2.5",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const variants = {
    default:
      "text-gray-700 hover:text-primary-600 hover:bg-primary-50 border border-gray-200 hover:border-primary-300",
    primary:
      "text-primary-600 hover:text-primary-700 hover:bg-primary-50 border border-primary-200 hover:border-primary-400",
    dark: "text-gray-800 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 hover:border-gray-400",
    minimal: "text-gray-600 hover:text-gray-800 hover:bg-gray-50",
  };

  return (
    <button
      onClick={onToggle}
      className={`
        relative rounded-xl transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 
        group hover:scale-105 active:scale-95
        ${sizeClasses[size]} ${variants[variant]} ${className}
      `}
      aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
      aria-expanded={isOpen}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-r from-primary-500 to-primary-600 scale-110"
            : "bg-transparent scale-100"
        }`}
        style={{ opacity: isOpen ? 0.15 : 0 }}
      />

      {/* Hamburger Lines Animation */}
      <div className="relative w-full h-full flex flex-col items-center justify-center space-y-1.5">
        {/* Top Line */}
        <div
          className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full ${
            isOpen ? "rotate-45 translate-y-2" : "rotate-0 translate-y-0"
          }`}
        />

        {/* Middle Line */}
        <div
          className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full ${
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />

        {/* Bottom Line */}
        <div
          className={`w-6 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full ${
            isOpen ? "-rotate-45 -translate-y-2" : "rotate-0 translate-y-0"
          }`}
        />
      </div>

      {/* Ripple Effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          isOpen ? "bg-primary-100 scale-125" : "bg-transparent scale-100"
        }`}
        style={{ opacity: isOpen ? 0.3 : 0 }}
      />
    </button>
  );
};

export default MobileMenuToggle;
