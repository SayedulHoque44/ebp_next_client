"use client";

import React, { memo } from "react";
import useAuth from "@/features/Auth/hooks/useAuth";
import { useResponsiveNavigation } from "./Navigation";
import { NavbarHeader } from "./components/NavbarHeader";
import { NavbarMobileNav } from "./components/NavbarMobileNav";
import { NAVBAR_STYLES } from "./config/navbar.config";

/**
 * Navbar Component (Client Component)
 * 
 * Main navbar component
 * Client component due to authentication and navigation state
 * Composes server components where possible
 */
const Navbar = memo(() => {
  const { user } = useAuth();
  const {
    isMobileMenuOpen,
    closeMobileMenu,
    toggleMobileMenu,
    handleItemClick,
  } = useResponsiveNavigation();

  return (
    <div className={NAVBAR_STYLES.container}>
      {/* Main Header */}
      <NavbarHeader
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        handleItemClick={handleItemClick}
      />

      {/* Mobile Navigation */}
      <NavbarMobileNav
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
