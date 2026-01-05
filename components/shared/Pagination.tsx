"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisH,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

interface IPaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showInfo?: boolean;
  showArrows?: boolean;
  showPerPageSelector?: boolean;
  maxVisiblePages?: number;
  perPageOptions?: number[];
  className?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  disabledButtonClassName?: string;
  infoClassName?: string;
  scrollToTop?: boolean;
  dropdownPosition?: "top" | "bottom";
  id?: string;
  "data-testid"?: string;
}

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  showInfo = true,
  showArrows = true,
  showPerPageSelector = true,
  maxVisiblePages = 5,
  perPageOptions = [5, 10, 20, 50, 100],
  className = "",
  buttonClassName = "",
  activeButtonClassName = "",
  disabledButtonClassName = "",
  infoClassName = "",
  scrollToTop = true,
  dropdownPosition = "top",
  id,
  "data-testid": dataTestId,
}: IPaginationProps) => {
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Don't render if there's only one page or no items
  // if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (
      onPageChange &&
      newPage !== currentPage &&
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      onPageChange(newPage);

      // Scroll to top if enabled
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
      setIsPerPageOpen(false);
    }
  };

  // Generate page numbers to display
  const getVisiblePages = (): PageItem[] => {
    const pages: PageItem[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center space-y-4 ${className}`}
      id={id}
      data-testid={dataTestId}
    >
      {/* Main Pagination Container */}
      <div className="relative">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl"></div>

        {/* Content */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6 min-w-[400px]">
          {/* Pagination Controls */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            {showArrows && (
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  currentPage === 1
                    ? `opacity-50 cursor-not-allowed text-gray-400 ${disabledButtonClassName}`
                    : "text-gray-700 hover:bg-white/20 hover:scale-105 active:scale-95"
                } ${buttonClassName}`}
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                aria-label="Go to previous page"
              >
                <FaChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </motion.button>
            )}

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
              {visiblePages.map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-3 py-2 text-gray-400"
                      aria-hidden="true"
                    >
                      <FaEllipsisH className="w-4 h-4" />
                    </span>
                  );
                }

                // Type guard to ensure page is a number
                if (typeof page !== "number") return null;

                return (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                      currentPage === page
                        ? "bg-linear-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25"
                        : "text-gray-700 hover:bg-white/20 hover:scale-105 active:scale-95"
                    } ${buttonClassName} ${
                      currentPage === page ? activeButtonClassName : ""
                    }`}
                    whileHover={{ scale: currentPage === page ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === page ? 1 : 0.95 }}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </motion.button>
                );
              })}
            </div>

            {/* Next Button */}
            {showArrows && (
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  currentPage === totalPages
                    ? `opacity-50 cursor-not-allowed text-gray-400 ${disabledButtonClassName}`
                    : "text-gray-700 hover:bg-white/20 hover:scale-105 active:scale-95"
                } ${buttonClassName}`}
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                aria-label="Go to next page"
              >
                <span className="hidden sm:inline">Next</span>
                <FaChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-4xl">
        {/* Items Per Page Selector */}
        {showPerPageSelector && (
          <div className="relative z-50" ref={dropdownRef}>
            <motion.button
              ref={buttonRef}
              onClick={() => setIsPerPageOpen(!isPerPageOpen)}
              className="flex items-center space-x-2 px-4 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-gray-700 font-semibold text-sm hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCog className="w-4 h-4" />
              <span>Show {itemsPerPage} per page</span>
              <FaChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  isPerPageOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {isPerPageOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: dropdownPosition === "top" ? 10 : -10,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: dropdownPosition === "top" ? 10 : -10,
                    scale: 0.95,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`absolute left-0 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl z-9999 min-w-full ${
                    dropdownPosition === "top"
                      ? "bottom-full mb-2"
                      : "top-full mt-2"
                  }`}
                  style={{
                    zIndex: 9999,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                  role="menu"
                  aria-orientation="vertical"
                >
                  {perPageOptions.map((option: number) => (
                    <motion.button
                      key={option}
                      onClick={() => handleItemsPerPageChange(option)}
                      className={`w-full px-4 py-3 text-left text-sm font-semibold transition-all duration-300 first:rounded-t-2xl last:rounded-b-2xl ${
                        itemsPerPage === option
                          ? "bg-primary-500/20 text-primary-700"
                          : "text-gray-700 hover:bg-white/20"
                      }`}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      role="menuitem"
                      aria-label={`Show ${option} items per page`}
                    >
                      {option} per page
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Info Text */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-center sm:text-right text-sm text-gray-600 font-medium ${infoClassName}`}
          >
            Showing{" "}
            <span className="font-bold text-primary-600">{startItem}</span> to{" "}
            <span className="font-bold text-primary-600">{endItem}</span> of{" "}
            <span className="font-bold text-primary-600">{totalItems}</span>{" "}
            items
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Pagination;
