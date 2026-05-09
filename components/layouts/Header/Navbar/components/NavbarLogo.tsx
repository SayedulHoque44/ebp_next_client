import React from "react";
import Logo from "@/components/shared/Logo";
import { NAVBAR_STYLES } from "../config/navbar.config";

/**
 * NavbarLogo Component (Server Component)
 * 
 * Logo section in navbar
 * Server-rendered for SEO
 */
export const NavbarLogo: React.FC = () => {
  return (
    <div className={NAVBAR_STYLES.logo}>
      <Logo nameColor="text-P-Black" />
    </div>
  );
};
