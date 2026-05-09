"use client";

import React from "react";
import { MobileMenuToggle } from "../Navigation";
import { NAVBAR_STYLES } from "../config/navbar.config";

interface NavbarMobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * NavbarMobileToggle Component (Client Component)
 * 
 * Mobile menu toggle button
 * Client component for menu interactions
 */
export const NavbarMobileToggle: React.FC<NavbarMobileToggleProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div className={NAVBAR_STYLES.mobileToggle}>
      <MobileMenuToggle
        isOpen={isOpen}
        onToggle={onToggle}
        size="sm"
        variant="default"
        className="shadow-sm hover:shadow-md"
      />
    </div>
  );
};
