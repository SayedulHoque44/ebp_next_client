"use client";

import React from "react";
import useAuth from "@/features/Auth/hooks/useAuth";
import AntMobileNav from "../MotionNavbar/AntMobileNav";
import { useNavigationConfig } from "../Navigation";
import { NAVBAR_STYLES } from "../config/navbar.config";

interface NavbarMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NavbarMobileNav Component (Client Component)
 * 
 * Mobile navigation drawer
 * Client component for mobile menu interactions
 */
export const NavbarMobileNav: React.FC<NavbarMobileNavProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { mobileItems } = useNavigationConfig(!!user);

  return (
    <div className={NAVBAR_STYLES.mobileNav}>
      <AntMobileNav
        navItems={mobileItems}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};
