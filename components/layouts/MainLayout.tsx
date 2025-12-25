"use client";
import React, { useEffect } from "react";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import ScrollToTop from "@/components/shared/ScrollToTop";

const MainLayouts = ({ children }: { children: React.ReactNode }) => {
  // Secure content
  useEffect(() => {
    // Add the event listener to disable right-click
    // eslint-disable-next-line react-hooks/immutability
    window.addEventListener("contextmenu", handleContextMenu as any);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  // Function to prevent the context menu
  const handleContextMenu = (e: PointerEvent): any => {
    e.preventDefault();
  };
  return (
    <div>
      <Header />
      {children}
      <Footer />

      {/* Global Scroll to Top Button */}
      <ScrollToTop
        showAfter={300}
        icon="arrow"
        size="medium"
        position="bottom-right"
        color="primary"
      />
    </div>
  );
};

export default MainLayouts;
