import React from "react";
import { cn } from "@/lib/utils";

interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container: React.FC<IContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "max-w-[2530px] xl:px-28 lg:px-16  md:px-8 sm:px-4 px-2 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
