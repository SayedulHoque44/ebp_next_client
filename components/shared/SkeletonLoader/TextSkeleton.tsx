import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TextSkeleton = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {Array(lines)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} width={index === lines - 1 ? "60%" : "100%"} />
        ))}
    </div>
  );
};

export default TextSkeleton;
