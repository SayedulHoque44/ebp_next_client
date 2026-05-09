"use client";

import React from "react";
import { motion } from "framer-motion";
import { IBlog } from "@/features/Blog/interface/blog.interface";
import { BlogHero } from "../components/BlogHero";
import { BlogArticleContent } from "../components/BlogArticleContent";
import { BlogArticleActions } from "../components/BlogArticleActions";

/**
 * SingleBlog Component (Client Component)
 * 
 * Single blog display component
 * Client component for animations and interactions
 */
const SingleBlog = ({ blogData }: { blogData: IBlog }) => {
  const {
    title,
    description,
    pin,
    createdAt,
    imageUrl,
    author,
    category,
    likes = 0,
    views = 0,
    comments = 0,
  } = blogData as IBlog & {
    likes: number;
    views: number;
    comments: number;
    author: string;
    category: string;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl mx-auto"
    >
      {/* Hero Section */}
      <BlogHero
        title={title}
        category={category}
        createdAt={createdAt}
        views={views}
        comments={comments}
        author={author}
        pin={pin}
        imageUrl={imageUrl}
      />

      {/* Article Content */}
      <BlogArticleContent description={description} />

      {/* Action Bar */}
      <BlogArticleActions likes={likes} />
    </motion.div>
  );
};

export default SingleBlog;
