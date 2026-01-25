import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TimerSkeleton = () => {
  return (
    <div className="text-center mt-4">
      <div className="formatted-time">
        <Skeleton width={280} height={32} className="mx-auto mb-4" />
        <div className="flex gap-1 justify-center items-center mt-2">
          {[1, 2, 3, 4].map((item) => (
            <React.Fragment key={item}>
              {item > 1 && <Skeleton width={24} height={32} className="mx-1" />}
              <div className="flex px-2 py-1 shadow-md flex-col justify-center">
                <Skeleton width={40} height={32} />
                <Skeleton width={60} height={16} className="mt-1" />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerSkeleton;

