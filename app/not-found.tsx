import NotFoundPage from "@/components/handler/NotFoundPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found!",
  description: "Sorry, page not found!",
};

const NotFound404 = () => {
  return (
    <div className="px-[25px] pt-[70px] h-screen bg-base-100">
      <NotFoundPage />
    </div>
  );
};

export default NotFound404;
