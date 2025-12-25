import LoginPage from "@/components/features/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account | Web",
};

const page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default page;
