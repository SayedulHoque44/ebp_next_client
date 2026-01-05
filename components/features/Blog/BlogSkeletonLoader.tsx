import React from "react";

const BlogSkeletonLoader = () => {
  return (
    <>
      {[1, 2, 3, 4].map((id) => (
        <div key={id} className="flex flex-col gap-4 w-[576px]">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </>
  );
};

export default BlogSkeletonLoader;
