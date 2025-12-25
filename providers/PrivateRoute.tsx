"use client";
import Loading from "@/components/handler/Loading";
import useAuth from "@/features/auth/hooks/useAuth";
import useAuthStore from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading, accessToken } = useAuth();
  const hasHydrated = useAuthStore(
    (state) => (state as any).hasHydrated ?? false
  );

  //   console.log("private ------- route", {
  //     user,
  //     isLoading,
  //     accessToken,
  //     hasHydrated,
  //   });

  // Handle redirects after rehydration
  useEffect(() => {
    if (!hasHydrated) return;

    // After rehydration: if no accessToken, redirect to login
    if (!accessToken) {
      router.push("/login");
      return;
    }

    // If we have accessToken but no user and not loading, redirect to login
    // This means the user fetch failed or user doesn't exist
    if (accessToken && !user && !isLoading) {
      router.push("/login");
      return;
    }
  }, [hasHydrated, accessToken, user, isLoading, router]);

  // Wait for rehydration to complete before making auth decisions
  if (!hasHydrated) {
    return <Loading />;
  }

  // After rehydration: if no accessToken, show nothing (redirecting)
  if (!accessToken) {
    return null;
  }

  // If we have accessToken but still loading (fetching user), show loading
  if (accessToken && isLoading) {
    return <Loading />;
  }

  // If we have accessToken but no user and not loading, show nothing (redirecting)
  if (accessToken && !user && !isLoading) {
    return null;
  }

  // If we have both accessToken and user, show the protected content
  if (accessToken && user) {
    return <div>{children}</div>;
  }

  // Fallback: show loading
  return <Loading />;
};

export default PrivateRoute;
