import React from "react";
import Skeleton from "react-loading-skeleton";

const BoxSkeleton = ({ count = 1 }) => {
  const arry = [];

  for (let index = 0; index < count; index++) {
    arry.push(index);
  }

  return (
    <>
      {arry.map((item) => (
        <div key={item}>
          <Skeleton className="h-52" />
          <div className="space-y-3 mt-5">
            <div className="w-[90%]">
              <Skeleton />
            </div>
            <div className="w-[60%]">
              <Skeleton />
            </div>
            <div className="w-[55%]">
              <Skeleton />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BoxSkeleton;
