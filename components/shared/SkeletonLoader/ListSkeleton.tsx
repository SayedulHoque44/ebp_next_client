import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListSkeleton = ({ count = 5 }) => {
  return (
    <ul className="space-y-3">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <li key={index} className="flex items-center space-x-3">
            <Skeleton circle width={24} height={24} />
            <div className="flex-1">
              <Skeleton height={20} />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ListSkeleton;
