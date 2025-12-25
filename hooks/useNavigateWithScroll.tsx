import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for navigation with automatic scroll to top
 * @param {Object} options - Configuration options
 * @param {boolean} options.scrollToTop - Whether to scroll to top after navigation (default: true)
 * @param {number} options.scrollDelay - Delay before scrolling in milliseconds (default: 100)
 * @param {string} options.scrollBehavior - Scroll behavior ('smooth' or 'auto', default: 'smooth')
 * @returns {Function} Navigation function
 */
const useNavigateWithScroll = (options: {
  scrollToTop?: boolean;
  scrollDelay?: number;
  scrollBehavior?: "smooth" | "auto";
}) => {
  const router = useRouter();
  const {
    scrollToTop = true,
    scrollDelay = 100,
    scrollBehavior = "smooth",
  } = options || {};

  const navigateWithScroll = useCallback(
    (path: string, state: any = null) => {
      // Navigate to the new path
      router.push(path, state);

      // Scroll to top after navigation if enabled
      if (scrollToTop) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: scrollBehavior,
          });
        }, scrollDelay);
      }
    },
    [router, scrollToTop, scrollDelay, scrollBehavior]
  );

  return navigateWithScroll;
};

export default useNavigateWithScroll;
