import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
      <AntdRegistry>
        <Providers>{children}</Providers>
      </AntdRegistry>
      {/* GoogleAnalytics */}
      {/* Ads .. Etc here.. */}
    </body>
  );
};

export default MainBody;
