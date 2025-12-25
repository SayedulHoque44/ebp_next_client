import Loading from "@/components/handler/Loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading...",
  description: "Get better insights faster.",
};
const Page = () => {
  return <Loading />;
};

export default Page;
