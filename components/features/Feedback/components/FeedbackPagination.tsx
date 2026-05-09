"use client";

import React, { useRef } from "react";
import Pagination from "@/components/shared/Pagination";

interface FeedbackPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

/**
 * FeedbackPagination Component (Client Component)
 * 
 * Pagination controls with scroll to top
 * Client component for user interactions
 */
export const FeedbackPagination: React.FC<FeedbackPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
    // Scroll to top anchor if exists
    if (hiddenLinkRef.current) {
      hiddenLinkRef.current.click();
    }
  };

  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={onItemsPerPageChange}
        maxVisiblePages={5}
        showInfo={true}
        showArrows={true}
        showPerPageSelector={true}
        perPageOptions={[6, 12, 24, 48]}
        scrollToTop={true}
        className="mt-8"
      />
      <a ref={hiddenLinkRef} href="#top" className="hidden">
        Go to top
      </a>
    </>
  );
};
