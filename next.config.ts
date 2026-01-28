import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Ensure require-in-the-middle is bundled and not externalized
  // This package is needed by Sentry/OpenTelemetry instrumentation
  // By not including it in serverExternalPackages, it will be bundled properly
  // Fixed: Moved from experimental.serverComponentsExternalPackages to top-level serverExternalPackages (Next.js 16 requirement)
  // serverExternalPackages: ["@vidstack/react", "media-icons"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1vstek0gf8y4r.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "fastwpdemo.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

// Check if Sentry is enabled (has DSN) to avoid unnecessary source map uploads
// Since Sentry is currently disabled (dsn: undefined), skip the wrapper to save build time
// This prevents the ~4 minute delay in runAfterProductionCompile from source map uploads
const isSentryEnabled = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

// If Sentry is disabled, export config directly without wrapper to skip source map uploads
// Only apply Sentry config when actually enabled
const config = isSentryEnabled
  ? withSentryConfig(nextConfig, {
      // For all available options, see:
      // https://www.npmjs.com/package/@sentry/webpack-plugin#options

      org: "sh-org-cx",

      project: "javascript-nextjs",

      // Only print logs for uploading source maps in CI
      silent: !process.env.CI,

      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
      // This can increase your server load as well as your hosting bill.
      // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
      // side errors will fail.
      tunnelRoute: "/monitoring",

      webpack: {
        // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
        // See the following for more information:
        // https://docs.sentry.io/product/crons/
        // https://vercel.com/docs/cron-jobs
        automaticVercelMonitors: true,

        // Tree-shaking options for reducing bundle size
        treeshake: {
          // Automatically tree-shake Sentry logger statements to reduce bundle size
          removeDebugLogging: true,
        },
      },
    })
  : nextConfig;

export default config;
