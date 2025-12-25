"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp, FaRocket } from "react-icons/fa";

interface IScrollToTopProps {
  showAfter?: number;
  className?: string;
  icon?: "arrow" | "rocket";
  size?: "small" | "medium" | "large";
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  color?: "primary" | "secondary" | "accent" | "success";
}
const ScrollToTop: React.FC<IScrollToTopProps> = ({
  showAfter = 300,
  className = "",
  icon = "arrow",
  size = "medium",
  position = "bottom-right",
  color = "primary",
  ...props
}: IScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Size configurations
  const sizeConfig = {
    small: {
      button: "w-12 h-12",
      icon: "w-4 h-4",
      text: "text-xs",
    },
    medium: {
      button: "w-14 h-14",
      icon: "w-5 h-5",
      text: "text-sm",
    },
    large: {
      button: "w-16 h-16",
      icon: "w-6 h-6",
      text: "text-base",
    },
  };

  // Color configurations
  const colorConfig = {
    primary: {
      gradient: "from-primary-500 to-primary-600",
      hover: "hover:from-primary-600 hover:to-primary-700",
      shadow: "shadow-primary-500/25",
      text: "text-white",
    },
    secondary: {
      gradient: "from-gray-600 to-gray-700",
      hover: "hover:from-gray-700 hover:to-gray-800",
      shadow: "shadow-gray-500/25",
      text: "text-white",
    },
    accent: {
      gradient: "from-accent-500 to-accent-600",
      hover: "hover:from-accent-600 hover:to-accent-700",
      shadow: "shadow-accent-500/25",
      text: "text-white",
    },
    success: {
      gradient: "from-green-500 to-green-600",
      hover: "hover:from-green-600 hover:to-green-700",
      shadow: "shadow-green-500/25",
      text: "text-white",
    },
  };

  // Position configurations
  const positionConfig = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
    "top-center": "top-6 left-1/2 transform -translate-x-1/2",
  };

  const currentSize = sizeConfig[size as keyof typeof sizeConfig];
  const currentColor = colorConfig[color as keyof typeof colorConfig];
  const currentPosition =
    positionConfig[position as keyof typeof positionConfig];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed ${currentPosition} z-50 ${className}`}
          {...props}
        >
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-2xl"></div>

          {/* Main Button */}
          <motion.button
            onClick={scrollToTop}
            className={`relative ${currentSize.button} bg-gradient-to-r ${currentColor.gradient} ${currentColor.hover} ${currentColor.text} rounded-full shadow-lg ${currentColor.shadow} hover:shadow-xl transition-all duration-300 flex items-center justify-center group overflow-hidden`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            />

            {/* Icon */}
            <div className="relative z-10 flex flex-col items-center">
              {icon === "arrow" ? (
                <FaArrowUp
                  className={`${currentSize.icon} transition-transform duration-300 group-hover:-translate-y-1`}
                />
              ) : (
                <FaRocket
                  className={`${currentSize.icon} transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-12`}
                />
              )}

              {/* Text (only for medium and large sizes) */}
              {(size === "medium" || size === "large") && (
                <span
                  className={`${currentSize.text} font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  Top
                </span>
              )}
            </div>

            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.button>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
