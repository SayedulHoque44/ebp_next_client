"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TempConditnalBody from "./TempConditnalBody";
import MainBody from "./MainBody";

const ConditionalProviders = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const pathname = usePathname();
  const isSpecificPathRender = pathname.includes("/specific-path");

  if (isSpecificPathRender) {
    // Sometimes we have to render somthing that dont need our providers or any other context just keep it simple and fast
    return (
      <TempConditnalBody className={className}>{children}</TempConditnalBody>
    );
  }

  return <MainBody className={className}>{children}</MainBody>;
};

export default ConditionalProviders;
