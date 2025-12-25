import { useMemo } from "react";
import { NAVIGATION_ITEMS } from "./NavigationConfig";

export const useNavigationConfig = (isAuthenticated: boolean = false) => {
  const navigationItems = useMemo(() => {
    const allItems = Object.values(NAVIGATION_ITEMS);

    if (isAuthenticated) {
      return allItems;
    }

    // Filter out auth-required items for non-authenticated users
    return allItems.filter((item) => !item.requiresAuth);
  }, [isAuthenticated]);

  const desktopItems = useMemo(() => {
    return navigationItems.filter((item) => !item.isAction);
  }, [navigationItems]);

  const mobileItems = useMemo(() => {
    return navigationItems;
  }, [navigationItems]);

  const getItemByTitle = (title: string) => {
    return Object.values(NAVIGATION_ITEMS).find((item) => item.title === title);
  };

  const getItemByLink = (link: string) => {
    return Object.values(NAVIGATION_ITEMS).find((item) => item.link === link);
  };

  return {
    navigationItems,
    desktopItems,
    mobileItems,
    getItemByTitle,
    getItemByLink,
  };
};
