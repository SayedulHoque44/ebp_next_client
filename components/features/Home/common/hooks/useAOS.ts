import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

/**
 * useAOS Hook
 * 
 * Custom hook to initialize AOS (Animate On Scroll) library.
 * Should be used once at the page level, not per section.
 * 
 * Usage:
 * - Call this hook in a provider component that wraps the entire page
 * - AOS.init() should only be called once per page load
 */
export const useAOS = () => {
  useEffect(() => {
    // Initialize AOS with default settings
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true, // Animation only happens once
      mirror: false, // Don't animate on scroll up
    });

    // Refresh AOS when needed (e.g., after dynamic content loads)
    Aos.refresh();

    return () => {
      // Cleanup: refresh AOS on unmount
      Aos.refresh();
    };
  }, []);
};
