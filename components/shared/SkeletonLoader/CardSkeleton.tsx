import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4 p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="p-4 rounded-full">
              <Skeleton circle width={48} height={48} />
            </div>
            <Skeleton width={120} height={24} />
          </div>
        ))}
    </>
  );
};

export default CardSkeleton;
