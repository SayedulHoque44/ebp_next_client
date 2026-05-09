"use client";

import React from "react";
import {
  ResponsiveNavigation,
  useNavigationConfig,
} from "../Navigation";
import { NAVBAR_STYLES } from "../config/navbar.config";

interface NavbarDesktopNavProps {
  isAuthenticated: boolean;
  onItemClick: (item: any) => void;
}

/**
 * NavbarDesktopNav Component (Client Component)
 * 
 * Desktop navigation menu
 * Client component for navigation interactions
 */
export const NavbarDesktopNav: React.FC<NavbarDesktopNavProps> = ({
  isAuthenticated,
  onItemClick,
}) => {
  const { desktopItems } = useNavigationConfig(isAuthenticated);

  return (
    <ResponsiveNavigation
      items={desktopItems}
      onItemClick={onItemClick}
      variant="desktop"
    />
  );
};
