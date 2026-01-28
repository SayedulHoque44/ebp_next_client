"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/features/Auth/hooks/useAuth";
import Loading from "@/components/handler/Loading";

const PaidOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return <Loading />;
  }

  // Check if user is authorized (Admin or paid user)
  if (user) {
    // Admin can access everything
    if (user.role === "Admin") {
      return <>{children}</>;
    }

    // Check if user has passed (should not access)
    if (user.status === "Passed") {
      toast.error("You are already passed!");
      router.push("/dashboard");
      return null;
    }

    // User must be active AND paid
    if (user.status === "Active" && user.paymentStatus === "paid") {
      return <>{children}</>;
    } else if (user.status === "Active") {
      toast.error("কিছু সম্যসা হয়েছে !");
      router.push("/dashboard");
      return null;
    } else if (user.paymentStatus === "paid") {
      toast.error(
        "আপনার কোর্স টাইম শেষ হয়ে গিয়েছে, টাইম বাডানোর জন্য যোগাযোগ করুন।"
      );
      router.push("/dashboard");
      return null;
    } else {
      toast.error("আপনাকে কোর্সটা কিনতে হবে।");
      router.push("/dashboard");
      return null;
    }
  }

  // No user, redirect will be handled by PrivateRoute
  return null;
};

export default PaidOnlyRoute;
