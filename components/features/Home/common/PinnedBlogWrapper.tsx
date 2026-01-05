"use client";
import { useUserUXSetting } from "@/features/User/store/user.store";
import React, { useEffect, useMemo, useState } from "react";
import PinnedBlog from "./PinnedBlog";
import BlogHooks from "@/features/Blog/hooks/blog.hooks";
import { IBlog } from "@/features/Blog/interface/blog.interface";

const PinnedBlogWrapper = () => {
  const { updateUserSetting, userSetting } = useUserUXSetting();
  const [showPinnedPopup, setShowPinnedPopup] = useState(false);
  const { data: BlogResponse } = BlogHooks.useGetBlogs({
    queryKey: ["blogs"],
    params: {
      pin: true,
      type: "Congratulate",
      limit: 1,
    },
  });
  const Blog = BlogResponse?.data?.result?.[0] as IBlog;

  // Derive pinnedBlog from Blog instead of storing in state
  const pinnedBlog = useMemo(() => {
    if (Blog && !userSetting.pinnedBlogShown) {
      return Blog;
    }
    return null;
  }, [Blog, userSetting.pinnedBlogShown]);

  useEffect(() => {
    if (pinnedBlog && !showPinnedPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPinnedPopup(true);
        updateUserSetting("pinnedBlogShown", true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pinnedBlog, showPinnedPopup, updateUserSetting]);
  const handleClosePinnedPopup = () => {
    setShowPinnedPopup(false);
  };
  return (
    <div>
      {pinnedBlog && (
        <PinnedBlog
          blog={pinnedBlog}
          isOpen={showPinnedPopup}
          onClose={handleClosePinnedPopup}
        />
      )}
    </div>
  );
};

export default PinnedBlogWrapper;
