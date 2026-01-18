"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import Pagination from "@/components/shared/Pagination";
import BlogContainer from "./BlogContainer";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";

const BlogSection = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  // const {
  //   data: Blogs,
  //   isLoading,
  //   isFetching,
  // } = useGetBlogsQuery([
  //   { name: "sort", value: "-createdAt" },
  //   { name: "page", value: page },
  //   { name: "limit", value: itemsPerPage },
  // ]);
  const {
    data: BlogsResponse,
    isLoading,
    isFetching,
  } = BlogHooks.useGetBlogs({
    queryKey: ["blogs"],
    params: {
      sort: "-createdAt",
      page,
      limit: itemsPerPage,
    },
    options: {
      refetchOnMount: true,
    },
  });
  const metaData = BlogsResponse?.data.meta;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="py-20 bg-linear-to-br from-primary-50 via-white to-accent-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full"></div>
      </div>

      <Container>
        <div className="relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionHeader
              badge={{
                icon: <FaSortAmountDown className="mr-2" />,
                text: "Latest Articles",
                className: "bg-primary-100 text-primary-700",
              }}
              title="Our Latest"
              subtitle="Blog Posts"
              description="Stay updated with our latest insights, tips, and success stories from our driving school community. Discover valuable information to help you on your journey to getting your Italian driving license."
              className="mb-12"
            />

            {/* Search and Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoaderCircleWithBar />
              </div>
            ) : (
              (() => {
                // Type guard: ensure BlogsResponse and result exist
                const blogs = BlogsResponse?.data?.result ?? [];
                return blogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {blogs.map((blog: IBlog, index: number) => (
                      <motion.div
                        key={blog._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <BlogContainer blog={blog} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No Blog Posts Found
                    </h3>
                    <p className="text-gray-600">
                      We&apos;re working on creating amazing content for you.
                      Check back soon!
                    </p>
                  </motion.div>
                );
              })()
            )}

            {/* Loading Overlay */}
            {isFetching && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <LoaderCircleWithBar />
              </div>
            )}
          </motion.div>

          {/* Pagination */}
          {metaData && (
            <Pagination
              currentPage={page}
              totalItems={metaData.total}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              maxVisiblePages={5}
              showInfo={true}
              showArrows={true}
              showPerPageSelector={true}
              perPageOptions={[6, 12, 24, 48]}
              scrollToTop={true}
              className="mt-8"
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogSection;
