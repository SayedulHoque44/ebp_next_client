import LoginPage from "@/components/features/Login";
import { Metadata } from "next";

/**
 * Generate metadata for login page
 */
export const metadata: Metadata = {
  title: "Login | Easy Bangla Patente",
  description:
    "Sign in to your Easy Bangla Patente account to access comprehensive Italian driving license courses, quizzes, and study materials. Continue your journey to master Italian driving theory.",
  robots: {
    index: false, // Login pages typically shouldn't be indexed
    follow: false,
  },
  openGraph: {
    title: "Login | Easy Bangla Patente",
    description:
      "Sign in to your Easy Bangla Patente account to access comprehensive Italian driving license courses and study materials.",
    type: "website",
  },
  alternates: {
    canonical: "/login",
  },
};

const page = () => {
  return <LoginPage />;
};

export default page;

