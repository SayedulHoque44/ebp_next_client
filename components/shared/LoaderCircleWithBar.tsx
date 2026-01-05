import React from "react";
import { CirclesWithBar } from "react-loader-spinner"; //TODO: Remove this loader

const LoaderCircleWithBar = ({ className }: { className?: string }) => {
  return (
    <div className={`${className ? className : ""} flex justify-center py-10`}>
      <CirclesWithBar
        height="100"
        width="100"
        color="#8319f4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  );
};

export default LoaderCircleWithBar;
