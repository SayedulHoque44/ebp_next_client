import React from "react";

const TempConditnalBody = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return <body className={`${className} bg-white`}>{children}</body>;
};

export default TempConditnalBody;
