"use client";
import React, { memo, useCallback } from "react";
import useAuth from "@/features/auth/hooks/useAuth";
import UserPropile from "@/components/shared/UserProfile";
import AntMobileNav from "./MotionNavbar/AntMobileNav";
import {
  ResponsiveNavigation,
  MobileMenuToggle,
  useNavigationConfig,
  useResponsiveNavigation,
} from "./Navigation";
import Logo from "@/components/shared/Logo";
import PLinkBtn from "@/components/shared/PLinkBtn";

const Navbar = memo(() => {
  const { user } = useAuth();

  // Use custom hooks for navigation configuration and responsive behavior
  const { desktopItems, mobileItems } = useNavigationConfig(!!user);
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    handleItemClick,
  } = useResponsiveNavigation();

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
    <div className="bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="flex justify-between items-center py-4 md:py-6 bg-linear-to-r from-white via-gray-50 to-white dark:bg-P-Black">
        {/* Logo */}
        <div className="shrink-0 min-w-0">
          <Logo nameColor="text-P-Black" />
        </div>

        {/* Desktop Navigation */}
        <ResponsiveNavigation
          items={desktopItems}
          onItemClick={onItemClick}
          variant="desktop"
        />

        {/* CTA and User Actions */}
        <div className="hidden xl:inline xl:pr-10">
          <div className="flex items-center gap-4">
            {/* <CTA phone="+39 320 608 8871" /> */}

            {user ? (
              <div className="flex items-center gap-3">
                <UserPropile logout={false} />
              </div>
            ) : (
              <PLinkBtn text="Login" link="/login" />
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden">
          <MobileMenuToggle
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
            size="sm"
            variant="default"
            className="shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="xl:hidden">
        <AntMobileNav
          navItems={mobileItems}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
