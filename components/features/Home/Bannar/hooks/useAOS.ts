import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

/**
 * useAOS Hook
 * 
 * Custom hook to initialize AOS (Animate On Scroll) library.
 * Extracted to reduce repetition and improve reusability.
 */
export const useAOS = () => {
  useEffect(() => {
    Aos.init();
    Aos.refresh();

    return () => {
      Aos.refresh();
    };
  }, []);
};
