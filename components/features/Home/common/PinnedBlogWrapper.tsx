"use client";
import React, { useEffect, useState } from "react";
import PinnedBlog from "./PinnedBlog";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";

const PINNED_BLOG_STORAGE_KEY = "ebp_pinned_blog_shown_id";

const PinnedBlogWrapper = () => {
  const [showPinnedPopup, setShowPinnedPopup] = useState(false);
  const [blogToShow, setBlogToShow] = useState<IBlog | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    data: BlogResponse,
    isLoading,
    isError,
  } = BlogHooks.useGetBlogs({
    queryKey: ["pinned-blogs"],
    params: {
      pin: true,
      type: "Congratulate",
      limit: 1,
    },
  });
  const Blog = BlogResponse?.data?.result?.[0] as IBlog;
// console.log("Blog", BlogResponse);
  // Handle client-side mounting (Next.js hydration)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Check if blog should be shown when blog data is available
  useEffect(() => {
    // Only run on client side after mount
    if (!isMounted || !Blog || blogToShow) return;

    // Get the last shown blog ID from localStorage
    const lastShownBlogId = typeof window !== "undefined" 
      ? localStorage.getItem(PINNED_BLOG_STORAGE_KEY) 
      : null;

    // Show blog if:
    // 1. No blog has been shown before (no stored ID), OR
    // 2. It's a different blog than what was shown last
    const shouldShow = !lastShownBlogId || lastShownBlogId !== Blog._id;

    if (shouldShow) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBlogToShow(Blog);
    }
  }, [Blog, isMounted, blogToShow]);

  // Show popup when blog is available
  useEffect(() => {
    if (blogToShow && !showPinnedPopup && isMounted) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPinnedPopup(true);
        // Store the blog ID in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(PINNED_BLOG_STORAGE_KEY, blogToShow._id);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [blogToShow, showPinnedPopup, isMounted]);

  const handleClosePinnedPopup = () => {
    setShowPinnedPopup(false);
    // Clear the blog after closing to prevent re-showing
    setTimeout(() => {
      setBlogToShow(null);
    }, 300); // Small delay to allow close animation
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {blogToShow && (
        <PinnedBlog
          blog={blogToShow}
          isOpen={showPinnedPopup}
          onClose={handleClosePinnedPopup}
        />
      )}
    </div>
  );
};

export default PinnedBlogWrapper;
