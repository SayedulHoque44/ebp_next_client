"use client";

import React from "react";
import { motion } from "framer-motion";
import { IBlog } from "@/features/Blog/interface/blog.interface";
import BlogContainer from "../BlogContainer";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";

interface BlogGridProps {
  blogs: IBlog[];
  isLoading: boolean;
  isFetching: boolean;
}

/**
 * BlogGrid Component (Client Component)
 * 
 * Blog grid with loading states
 * Client component for data fetching and animations
 */
export const BlogGrid: React.FC<BlogGridProps> = ({
  blogs,
  isLoading,
  isFetching,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoaderCircleWithBar />
      </div>
    );
  }

  if (blogs.length === 0) {
    return null; // Empty state handled by parent
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-16 relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs.map((blog: IBlog, index: number) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogContainer blog={blog} />
          </motion.div>
        ))}
      </div>

      {/* Loading Overlay */}
      {isFetching && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <LoaderCircleWithBar />
        </div>
      )}
    </motion.div>
  );
};
