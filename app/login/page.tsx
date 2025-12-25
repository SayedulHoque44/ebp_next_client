import { Metadata } from "next";
import LoginPage from "./components/LoginPage";

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
