import { useState, useEffect, useCallback } from "react";
import { BREAKPOINTS } from "./NavigationConfig";

export const useResponsiveNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < BREAKPOINTS.tablet) {
        setScreenSize("mobile");
      } else if (width < BREAKPOINTS.laptop) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }

      // Close mobile menu when screen becomes large
      if (width >= BREAKPOINTS.laptop) {
        setIsMobileMenuOpen(false);
      }
    };

    // Set initial screen size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Handle navigation item click
  const handleItemClick = useCallback(
    (item: any, onItemClick: any) => {
      if (onItemClick) {
        onItemClick(item);
      }

      // Close mobile menu after click
      if (screenSize === "mobile" || screenSize === "tablet") {
        closeMobileMenu();
      }
    },
    [screenSize, closeMobileMenu]
  );

  return {
    isMobileMenuOpen,
    screenSize,
    toggleMobileMenu,
    closeMobileMenu,
    handleItemClick,
    isMobile: screenSize === "mobile",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
  };
};
