"use client";
import React from "react";
import { motion } from "framer-motion";
import BlogContainer from "@/components/features/Blog/BlogContainer";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";

/**
 * DrivingLicenceBlogList Component (Client Component)
 * 
 * Blog list with data fetching and animations.
 * Client component for React Query data fetching and framer-motion animations.
 */
const DrivingLicenceBlogList = () => {
  const { data: BlogsResponse } = BlogHooks.useGetBlogs({
    queryKey: ["blogs"],
    params: {
      sort: "-createdAt",
      type: "Congratulate",
      limit: 3,
    },
  });
  const Blogs = BlogsResponse?.data?.result ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Blogs.length > 0 &&
          Blogs.map((blog: IBlog, index: number) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <BlogContainer blog={blog} />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default DrivingLicenceBlogList;
