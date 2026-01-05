"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEye,
  FaComments,
  FaHeart,
  FaShareAlt,
  FaBookmark,
} from "react-icons/fa";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import Container from "@/components/ui/Container";
import SingleBlog from "./SingleBlog";
import { useParams } from "next/navigation";

import { Heading2, Body } from "@/components/ui/Typography";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import Link from "next/link";

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

  // Update page title with blog title
  useEffect(() => {
    if (result?.data?.title) {
      document.title = `${result.data.title} | Easy Bangla Patente`;
    }
    // Cleanup: restore default title when component unmounts
    return () => {
      document.title = "Easy Bangla Patente";
    };
  }, [result?.data?.title]);

  if (isLoading) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <LoaderCircleWithBar />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">😕</div>
            <Heading2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Blog Not Found
            </Heading2>
            <Body className="text-gray-600 mb-6">
              The blog you&lsquo;re looking for doesn&lsquo;t exist or has been
              removed.
            </Body>
            <Link
              href="/blogs"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blogs
            </Link>
          </motion.div>
        </div>
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Blog Content */}
        {result?.data && <SingleBlog blogData={result?.data} />}
      </motion.div>
    </Container>
  );
};

export default SingleBlogContainer;
