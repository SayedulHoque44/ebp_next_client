/**
 * Navbar Configuration
 * 
 * Configuration constants for navbar styling and behavior
 * Server-side configuration for SEO
 */

export const NAVBAR_STYLES = {
  container: "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-colors duration-300",
  header: "flex justify-between items-center py-4 md:py-6 bg-linear-to-r from-white via-gray-50 to-white transition-colors duration-300",
  logo: "shrink-0 min-w-0",
  desktopNav: "hidden xl:flex gap-2 items-center",
  userActions: "hidden xl:inline xl:pr-10",
  mobileToggle: "xl:hidden",
  mobileNav: "xl:hidden",
} as const;

export const NAVBAR_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
} as const;
