import React, { memo } from "react";
import NavigationItem from "./NavigationItem";

const ResponsiveNavigation = memo(
  ({
    items,
    onItemClick,
    className = "",
    variant = "desktop",
  }: {
    items: any[];
    onItemClick: any;
    className?: string;
    variant?: "desktop" | "mobile";
  }) => {
    if (variant === "desktop") {
      return (
        <nav className={`hidden xl:flex gap-2 items-center ${className}`}>
          {items.map((item, index) => (
            <NavigationItem
              key={`${item.title}-${index}`}
              item={item}
              variant="desktop"
              onClick={onItemClick}
            />
          ))}
        </nav>
      );
    }

    if (variant === "mobile") {
      return (
        <div className={`space-y-2 ${className}`}>
          {items.map((item, index) => (
            <NavigationItem
              key={`${item.title}-${index}`}
              item={item}
              variant="mobile"
              onClick={onItemClick}
              showDescription={true}
            />
          ))}
        </div>
      );
    }

    return null;
  }
);

ResponsiveNavigation.displayName = "ResponsiveNavigation";

export default ResponsiveNavigation;
