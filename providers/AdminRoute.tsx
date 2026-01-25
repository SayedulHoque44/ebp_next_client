"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/handler/Loading";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import useAuth from "@/features/Auth/hooks/useAuth";
import useAuthStore from "@/features/Auth/store/useAuthStore";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const hasHydrated = useAuthStore(
    (state) => (state as any).hasHydrated ?? false
  );

  // Handle redirects after rehydration
  useEffect(() => {
    if (!hasHydrated) return;

    // If user is not an admin, redirect to login
    if (user && user.role !== "Admin") {
      router.push("/login");
      return;
    }
  }, [hasHydrated, user, router]);

  // Wait for rehydration to complete before making auth decisions
  if (!hasHydrated) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderCircleWithBar />
      </div>
    );
  }

  // Show loading while checking user
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoaderCircleWithBar />
      </div>
    );
  }

  // If user is an admin, show the protected content
  if (user?.role === "Admin") {
    return <>{children}</>;
  }

  // If user is not an admin, show nothing (redirecting)
  return null;
};

export default AdminRoute;
