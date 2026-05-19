"use client";

import React, { useCallback } from "react";
import useAuth from "@/features/Auth/hooks/useAuth";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarDesktopNav } from "./NavbarDesktopNav";
import { NavbarUserActions } from "./NavbarUserActions";
import { NavbarMobileToggle } from "./NavbarMobileToggle";
import { NAVBAR_STYLES } from "../config/navbar.config";

interface NavbarHeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  handleItemClick: (item: any, onItemClick?: (item: any) => void) => void;
}

/**
 * NavbarHeader Component (Client Component)
 * 
 * Main navbar header with logo, navigation, and actions
 * Client component for navigation interactions
 */
export const NavbarHeader: React.FC<NavbarHeaderProps> = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  handleItemClick,
}) => {
  const { user } = useAuth();

  // Handle navigation item click
  const onItemClick = useCallback(
    (item: any) => {
      handleItemClick(item, () => {
        // Additional logic can be added here if needed
        console.log(`Navigating to: ${item.title}`);
      });
    },
    [handleItemClick]
  );

  return (
    <div className={NAVBAR_STYLES.header}>
      {/* Logo */}
      <NavbarLogo />

      {/* Desktop Navigation */}
      <NavbarDesktopNav
        isAuthenticated={!!user}
        onItemClick={onItemClick}
      />

      {/* CTA and User Actions */}
      <NavbarUserActions />

      {/* Mobile Menu Toggle */}
      <NavbarMobileToggle
        isOpen={isMobileMenuOpen}
        onToggle={toggleMobileMenu}
      />
    </div>
  );
};
