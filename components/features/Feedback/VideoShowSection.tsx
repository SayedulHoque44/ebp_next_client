"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import UniContentHooks from "@/features/UniContent/hooks/uniContent.hooks";
import { ISubContent } from "@/features/UniContent/interface/uniContent.interface";
import { FeedbackBackground } from "./components/FeedbackBackground";
import { FeedbackHeader } from "./components/FeedbackHeader";
import { FeedbackSearchAndFilter } from "./components/FeedbackSearchAndFilter";
import { FeedbackVideoGrid } from "./components/FeedbackVideoGrid";
import { FeedbackEmptyState } from "./components/FeedbackEmptyState";
import { FeedbackPagination } from "./components/FeedbackPagination";

interface VideoShowSectionProps {
  id: string;
  title: string[];
  sorting: string;
}

/**
 * VideoShowSection Component (Client Component)
 * 
 * Main video listing section
 * Client component for data fetching and state management
 */
const VideoShowSection: React.FC<VideoShowSectionProps> = ({
  id,
  title,
  sorting,
}) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(sorting || "createdAt");

  const {
    data: subContentsResponse,
    isLoading,
    isFetching,
  } = UniContentHooks.useGetSubContents({
    queryKey: ["subcontents", id, page, itemsPerPage, sortBy],
    params: {
      sort: sortBy,
      page: page,
      limit: itemsPerPage,
      RefId: id,
    },
  });

  const metaData = subContentsResponse?.data?.meta;
  const allVideos = subContentsResponse?.data?.result || [];

  // Filter videos based on search term (client-side filtering for better UX)
  const filteredVideos = useMemo(() => {
    if (!searchTerm) return allVideos;
    const term = searchTerm.toLowerCase();
    return allVideos.filter(
      (video: ISubContent) =>
        video.title?.toLowerCase().includes(term) ||
        video.description?.toLowerCase().includes(term)
    );
  }, [allVideos, searchTerm]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="py-20 bg-linear-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Elements - Server Rendered */}
      <FeedbackBackground />

      <Container>
        <div className="relative z-10">
          <span id="top"></span>

          {/* Header Section */}
          <FeedbackHeader title={title} />

          {/* Search and Filter Section */}
          <FeedbackSearchAndFilter
            searchTerm={searchTerm}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onSortChange={setSortBy}
          />

          {/* Video Grid */}
          {filteredVideos.length === 0 && !isLoading ? (
            <FeedbackEmptyState
              searchTerm={searchTerm}
              onClearSearch={() => setSearchTerm("")}
            />
          ) : (
            <FeedbackVideoGrid
              videos={filteredVideos}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          )}

          {/* Pagination */}
          {metaData && filteredVideos.length > 0 && !searchTerm && (
            <FeedbackPagination
              currentPage={page}
              totalItems={metaData.total}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default VideoShowSection;
