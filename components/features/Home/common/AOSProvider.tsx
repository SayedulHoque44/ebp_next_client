"use client";
import React, { ReactNode } from "react";
import { useAOS } from "./hooks/useAOS";

interface AOSProviderProps {
  children: ReactNode;
}

/**
 * AOSProvider Component (Client Component)
 * 
 * Global provider for AOS (Animate On Scroll) library.
 * Should wrap the entire Home page or all sections that need AOS.
 * 
 * Benefits:
 * - Single initialization point (more efficient)
 * - Prevents multiple AOS.init() calls
 * - Reusable across all sections
 * - Better performance
 * 
 * Usage:
 * Wrap your Home page content with this provider:
 * 
 * <AOSProvider>
 *   <Bannar />
 *   <Course />
 *   <OtherSections />
 * </AOSProvider>
 */
const AOSProvider: React.FC<AOSProviderProps> = ({ children }) => {
  useAOS();

  return <>{children}</>;
};

export default AOSProvider;
