"use client";

import React from "react";
import Pagination from "@/components/shared/Pagination";

interface BlogPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

/**
 * BlogPagination Component (Client Component)
 * 
 * Pagination controls
 * Client component for user interactions
 */
export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      maxVisiblePages={5}
      showInfo={true}
      showArrows={true}
      showPerPageSelector={true}
      perPageOptions={[6, 12, 24, 48]}
      scrollToTop={true}
      className="mt-8"
    />
  );
};
