"use client";

import React, { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";
import { BlogBackground } from "./components/BlogBackground";
import { BlogHeader } from "./components/BlogHeader";
import { BlogSearch } from "./components/BlogSearch";
import { BlogGrid } from "./components/BlogGrid";
import { BlogEmptyState } from "./components/BlogEmptyState";
import { BlogPagination } from "./components/BlogPagination";

/**
 * BlogSection Component (Client Component)
 *
 * Main blog listing page
 * Client component for data fetching and state management
 */
const BlogSection = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: BlogsResponse,
    isLoading,
    isFetching,
  } = BlogHooks.useGetBlogs({
    queryKey: ["blogs", page, itemsPerPage, searchTerm],
    params: {
      sort: "-createdAt",
      page,
      limit: itemsPerPage,
      ...(searchTerm && { searchTerm }),
    },
    options: {
      refetchOnMount: true,
    },
  });

  const metaData = BlogsResponse?.data.meta;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const blogs = BlogsResponse?.data?.result ?? [];

  // Filter blogs client-side if searchTerm exists (for better UX)
  const filteredBlogs = useMemo(() => {
    if (!searchTerm) return blogs;
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      (blog: IBlog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.description.toLowerCase().includes(term),
    );
  }, [blogs, searchTerm]);

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
      <BlogBackground />

      <Container>
        <div className="relative z-10">
          {/* Header Section */}
          <BlogHeader />

          {/* Search Bar */}
          <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {/* Blog Grid */}
          {filteredBlogs.length === 0 && !isLoading ? (
            <BlogEmptyState />
          ) : (
            <BlogGrid
              blogs={filteredBlogs}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          )}

          {/* Pagination */}
          {metaData && !searchTerm && (
            <BlogPagination
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

export default BlogSection;
