"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { useParams } from "next/navigation";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import SingleBlog from "./SingleBlog";
import { BlogBackButton } from "../components/BlogBackButton";
import { BlogNotFound } from "../components/BlogNotFound";
import { BlogLoading } from "../components/BlogLoading";

/**
 * SingleBlogContainer Component (Client Component)
 * 
 * Single blog page container
 * Client component for data fetching and routing
 */
const SingleBlogContainer = () => {
  const params = useParams();
  const blogId = params?.id as string;
  const {
    data: result,
    isLoading,
    error,
  } = BlogHooks.useGetSingleBlog({
    queryKey: ["blog", blogId as string],
    params: { blogId: blogId as string },
    options: {
      enabled: !!blogId,
    },
  });

  // Scroll to top when component mounts or blogId changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [blogId]);

  if (isLoading) {
    return (
      <Container>
        <BlogLoading />
      </Container>
    );
  }

  if (error || !result?.data) {
    return (
      <Container>
        <BlogNotFound />
      </Container>
    );
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen py-8"
      >
        {/* Back Button */}
        <BlogBackButton />

        {/* Blog Content */}
        <SingleBlog blogData={result.data} />
      </motion.div>
    </Container>
  );
};

export default SingleBlogContainer;
