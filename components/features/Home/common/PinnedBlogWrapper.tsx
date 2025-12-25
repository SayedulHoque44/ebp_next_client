import { useUserUXSetting } from "@/features/User/store/user.store";
import React, { useEffect, useMemo, useState } from "react";
import PinnedBlog from "./PinnedBlog";

const PinnedBlogWrapper = () => {
  const { updateUserSetting, userSetting } = useUserUXSetting();
  const [showPinnedPopup, setShowPinnedPopup] = useState(false);
  const { data: Blog } = useGetBlogsQuery([
    { name: "pin", value: true },
    { name: "type", value: "Congratulate" },
    { name: "limit", value: 1 },
  ]);

  // Derive pinnedBlog from Blog instead of storing in state
  const pinnedBlog = useMemo(() => {
    if (Blog?.result?.length > 0 && !userSetting.pinnedBlogShown) {
      return Blog.result[0];
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
