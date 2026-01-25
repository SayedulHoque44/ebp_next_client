import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FormSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <Skeleton width={100} height={20} />
            <Skeleton height={40} className="rounded-md" />
          </div>
        ))}
      <div className="pt-4">
        <Skeleton width={120} height={40} className="rounded-md" />
      </div>
    </div>
  );
};

export default FormSkeleton;
