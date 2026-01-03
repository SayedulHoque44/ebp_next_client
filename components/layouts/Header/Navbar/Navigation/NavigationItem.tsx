import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaYoutube } from "react-icons/fa";
import { MdAppShortcut, MdDashboard } from "react-icons/md";
import { PiSparkleFill } from "react-icons/pi";
import { BsFilePost } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const NavigationItem = ({
  item,
  variant = "desktop",
  onClick,
  className = "",
  showIcon = true,
  showDescription = false,
}: {
  item: any;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
  className?: string;
  showIcon?: boolean;
  showDescription?: boolean;
}) => {
  // Get current pathname for active state detection
  const pathname = usePathname();
  const isActive =
    pathname === item.link || pathname.startsWith(item.link + "/");

  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconMap = {
      FaHome: <FaHome />,
      FaYoutube: <FaYoutube />,
      BsFilePost: <BsFilePost />,
      PiSparkleFill: <PiSparkleFill />,
      MdAppShortcut: <MdAppShortcut />,
      MdDashboard: <MdDashboard />,
      FiLogOut: <FiLogOut />,
    };
    return iconMap[iconName as keyof typeof iconMap] || <FaHome />;
  };

  // Desktop variant
  if (variant === "desktop") {
    return (
      <Link
        className={`flex gap-2 items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          isActive
            ? "bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-soft dark:shadow-primary-900/20"
            : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
        } ${className}`}
        href={item.link}
        onClick={onClick}
      >
        {showIcon && (
          <span className="text-lg transition-colors duration-300" style={{ color: item.color }}>
            {getIcon(item.icon)}
          </span>
        )}
        <span className="transition-colors duration-300">{item.title}</span>
      </Link>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div
        className={`
          flex items-center space-x-4 p-4 rounded-xl cursor-pointer
          transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-800/50
          bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 
          hover:border-gray-200 dark:hover:border-gray-600/50
          backdrop-blur-sm
          ${className}
        `}
        onClick={onClick}
      >
        {showIcon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg transition-transform duration-300 hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)`,
              boxShadow: `0 4px 12px ${item.color}40`,
            }}
          >
            {getIcon(item.icon)}
          </div>
        )}

        <div className="flex-1">
          <div
            className={`font-semibold text-base transition-colors duration-300 ${
              item.title === "Logout" 
                ? "text-red-500 dark:text-red-400" 
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {item.title}
          </div>
          {showDescription && (
            <div
              className={`text-sm transition-colors duration-300 ${
                item.title === "Logout" 
                  ? "text-red-400 dark:text-red-500" 
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.description}
            </div>
          )}
        </div>

        <div className="text-gray-300 dark:text-gray-500 transition-colors duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    );
  }

  return null;
};

export default NavigationItem;
