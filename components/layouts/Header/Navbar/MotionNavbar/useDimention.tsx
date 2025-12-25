"use client";
import { useEffect, useState, useCallback, RefObject } from "react";

export const useDimensions = (ref: RefObject<HTMLElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref]);

  useEffect(() => {
    // Set initial dimensions
    updateDimensions();

    // Use ResizeObserver for better performance and accuracy
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Fallback: Also listen to window resize for edge cases
    window.addEventListener("resize", updateDimensions);

    // Clean up
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [ref, updateDimensions]);

  return dimensions;
};
