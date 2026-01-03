"use client";
import React, { memo, useCallback } from "react";
import useAuth from "@/features/Auth/hooks/useAuth";
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
import BlogHooks from "@/features/Blog/hooks/blog.hooks";

const Navbar = memo(() => {
  const { user } = useAuth();
  // const {
  //   data: blogs,
  //   error,
  //   isLoading,
  //   isFetching,
  // } = BlogHooks.useGetBlogs({
  //   queryKey: ["blogs"],
  //   params: {
  //     page: 1,
  //     limit: 1,
  //   },
  //   options: {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //   },
  // });
  // console.log(blogs, isLoading, isFetching, error);
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
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50 shadow-sm dark:shadow-gray-900/20 transition-colors duration-300">
      <div className="flex justify-between items-center py-4 md:py-6 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 transition-colors duration-300">
        {/* Logo */}
        <div className="shrink-0 min-w-0">
          <Logo nameColor="text-P-Black dark:text-white" />
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
            className="shadow-sm hover:shadow-md dark:shadow-gray-800/50 dark:hover:shadow-gray-700/50"
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
