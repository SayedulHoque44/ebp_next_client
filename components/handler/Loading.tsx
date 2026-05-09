import React from "react";
import { FallingLines } from "react-loader-spinner"; //TODO: Remove this loader

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={`${className ? className : ""} flex justify-center py-10`}>
      <FallingLines
        color="#8319f4"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default Loading;
