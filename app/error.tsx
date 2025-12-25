"use client"; // Error components must be Client Components

import ErrorPage from "@/components/handler/ErrorPage";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error, "from error page");
  }, [error]);

  return <ErrorPage error={error} reset={reset} />;
}
