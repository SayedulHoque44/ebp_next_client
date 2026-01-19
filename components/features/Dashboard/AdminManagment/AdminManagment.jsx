import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaUsers, FaBlog, FaImages } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { BiSolidBookContent } from "react-icons/bi";
import { AiFillSetting } from "react-icons/ai";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const AdminManagment = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const navItems = [
    { to: "userManagment", label: "Users", icon: <FaUsers /> },
    { to: "blogManagment", label: "Blogs", icon: <FaBlog /> },
    { to: "quizManagment", label: "Quiz", icon: <MdQuiz /> },
    { to: "imageManagment", label: "Figure", icon: <FaImages /> },
    { to: "contentManagment", label: "Content", icon: <BiSolidBookContent /> },
    { to: "systemManagment", label: "System", icon: <AiFillSetting /> },
  ];

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (!navRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
    const isScrollable = scrollWidth > clientWidth;
    const isAtStart = scrollLeft <= 5;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 5;

    setShowLeftArrow(isScrollable && !isAtStart);
    setShowRightArrow(isScrollable && !isAtEnd);
  };

  // Scroll to active item on route change
  useEffect(() => {
    if (!navRef.current) return;

    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      const activeLink = navRef.current.querySelector(".nav-link-active");
      if (activeLink) {
        const container = navRef.current;
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft =
          container.scrollLeft +
          linkRect.left -
          containerRect.left -
          containerRect.width / 2 +
          linkRect.width / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        // Check scroll position after scroll completes
        setTimeout(checkScrollPosition, 300);
      } else {
        checkScrollPosition();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Check scroll position on mount and resize
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, []);

  // Handle scroll events with debouncing
  const handleScroll = () => {
    checkScrollPosition();
  };

  // Scroll functions
  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `nav-link flex items-center gap-2.5 px-5 py-3.5 md:px-6 md:py-4 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
      isActive
        ? "nav-link-active bg-gradient-to-r from-P-primary to-purple-600 text-white shadow-lg shadow-purple-200/50 scale-105"
        : "text-gray-600 hover:text-P-primary hover:bg-gray-50 active:scale-95"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Container */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-gradient-to-r from-white via-white to-transparent hover:from-gray-50 transition-all duration-200"
              aria-label="Scroll left"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all">
                <CaretLeft size={18} weight="bold" className="text-gray-700" />
              </div>
            </button>
          )}

          {/* Navigation */}
          <nav
            ref={navRef}
            onScroll={handleScroll}
            className="flex gap-2 px-4 md:px-6 py-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClasses}
                end={false}
              >
                <span className="text-lg md:text-xl flex-shrink-0">
                  {item.icon}
                </span>
                <span className="font-semibold">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-gradient-to-l from-white via-white to-transparent hover:from-gray-50 transition-all duration-200"
              aria-label="Scroll right"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all">
                <CaretRight size={18} weight="bold" className="text-gray-700" />
              </div>
            </button>
          )}

          {/* Gradient Fade Overlays */}
          {showLeftArrow && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          )}
          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full py-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminManagment;
