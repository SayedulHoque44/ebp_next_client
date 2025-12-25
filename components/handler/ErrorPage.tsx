"use client";
import { ArrowsCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const ErrorPage = ({
  error,
  reset,
  title,
  subtitle,
  hideDashboard = false,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
  title?: string;
  subtitle?: string;
  hideDashboard?: boolean;
}) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-5">
      {/* <Image
        src={process.env.NEXT_PUBLIC_S3_LINK + "1747821262053_error_png.png"}
        height={150}
        width={150}
        alt="error_page"
      /> */}
      <h1 className="text-center text-2xl md:text-4xl text-primary">
        {title ?? "Oops! Something went wrong"}
      </h1>
      <p className="text-center text-muted-foreground text-base md:text-lg">
        {subtitle ?? "Please refresh the page to try again"}
      </p>

      <div className="flex items-center gap-5 pt-2">
        {!hideDashboard && (
          <Link href={"/"}>
            <Button variant={"success"} className="gap-3">
              <p className="h-4 w-4 mb-2">
                {/* <Image
                  src={
                    process.env.NEXT_PUBLIC_S3_LINK +
                    "1747821982867_uneven_tiles.png"
                  }
                  height={50}
                  width={50}
                  alt="error_page"
                /> */}
              </p>
              <span>Go to Dashboard</span>
            </Button>
          </Link>
        )}
        <Button
          variant={"success"}
          className="gap-3"
          onClick={() => reset && reset()}
        >
          <ArrowsCounterClockwiseIcon size={16} />
          <span>Refresh Now</span>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
