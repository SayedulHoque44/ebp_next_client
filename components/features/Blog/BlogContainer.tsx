"use client";

import React from "react";
import { motion } from "framer-motion";
import { IBlog } from "@/features/Blog/interface/blog.interface";
import { BlogCardImage } from "./components/BlogCardImage";
import { BlogCardContent } from "./components/BlogCardContent";
import { BlogCardActions } from "./components/BlogCardActions";

/**
 * BlogContainer Component (Client Component)
 * 
 * Blog card container
 * Client component for animations and interactions
 */
const BlogContainer = ({ blog }: { blog: IBlog }) => {
  const {
    _id,
    title,
    description,
    pin,
    createdAt,
    imageUrl,
    likes = 0,
    views = 0,
    comments = 0,
  } = blog as IBlog & { likes: number; views: number; comments: number };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group w-full max-w-sm mx-auto h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between"
    >
      {/* Image Section */}
      <BlogCardImage imageUrl={imageUrl} title={title} pin={pin} />

      {/* Content Section */}
      <BlogCardContent
        title={title}
        description={description}
        createdAt={createdAt}
        views={views}
        comments={comments}
      />

      {/* Action Bar */}
      <BlogCardActions blogId={_id} likes={likes} />
    </motion.div>
  );
};

export default BlogContainer;
