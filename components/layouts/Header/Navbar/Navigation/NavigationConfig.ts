// Navigation configuration constants
export const NAVIGATION_ITEMS: Record<
  string,
  {
    link: string;
    icon: string;
    title: string;
    color: string;
    description: string;
    requiresAuth?: boolean;
    isAction?: boolean;
  }
> = {
  HOME: {
    link: "/",
    icon: "FaHome",
    title: "Home",
    color: "#1890ff",
    description: "Navigate to home page",
  },
  BLOGS: {
    link: "/blogs",
    icon: "BsFilePost",
    title: "Blogs",
    color: "#52c41a",
    description: "Read our latest blog posts",
  },
  FREE_VIDEO: {
    link: "/YTFreevideo",
    icon: "FaYoutube",
    title: "Free Video",
    color: "#fa541c",
    description: "Watch free educational videos",
  },
  SUCCESS: {
    link: "/feedback",
    icon: "PiSparkleFill",
    title: "Success",
    color: "#faad14",
    description: "View success stories",
  },
  EBP_APP: {
    link: "/App/1",
    icon: "MdAppShortcut",
    title: "EBP App",
    color: "#722ed1",
    description: "Download EBP mobile app",
  },
  LATEST_APP: {
    link: "/App/2",
    icon: "MdAppShortcut",
    title: "Latest App",
    color: "#eb2f96",
    description: "Download latest mobile app",
  },
  DASHBOARD: {
    link: "/dashboard",
    icon: "MdDashboard",
    title: "Dashboard",
    color: "#13c2c2",
    description: "Access your dashboard",
    requiresAuth: true,
  },
  LOGOUT: {
    link: "/",
    icon: "FiLogOut",
    title: "Logout",
    color: "#ff4d4f",
    description: "Sign out of your account",
    requiresAuth: true,
    isAction: true,
  },
};

// Icon mapping for different icon libraries
export const ICON_MAPPING = {
  FaHome: "react-icons/fa",
  FaYoutube: "react-icons/fa",
  BsFilePost: "react-icons/bs",
  PiSparkleFill: "react-icons/pi",
  MdAppShortcut: "react-icons/md",
  MdDashboard: "react-icons/md",
  FiLogOut: "react-icons/fi",
};

// Breakpoints configuration
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
};

// Navigation variants
export const NAVIGATION_VARIANTS = {
  desktop: "desktop",
  mobile: "mobile",
  tablet: "tablet",
};
