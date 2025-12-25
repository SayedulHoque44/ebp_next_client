import dynamic from "next/dynamic";
import React from "react";
// const Providers = dynamic(() => import("../Providers"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });
import Providers from "../Providers";

const MainBody = ({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <body className={`${className} `}>
      {/* <Providers>{children}</Providers> */}
      <Providers>{children}</Providers>
      {/* GoogleAnalytics */}
      {/* Ads .. Etc here.. */}
    </body>
  );
};

export default MainBody;
