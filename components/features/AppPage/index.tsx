import React from "react";
import Container from "@/components/ui/Container";
import { getAppById } from "./data/apps.data";
import { AppHero } from "./components/AppHero";
import { AppFeatures } from "./components/AppFeatures";
import { AppScreenshots } from "./components/AppScreenshots";
import { AppDescription } from "./components/AppDescription";
import { AppNotFound } from "./components/AppNotFound";

interface AppPageProps {
  appId: number;
}

/**
 * AppPage Component (Server Component)
 * 
 * Main app page component - server-rendered for SEO
 * Fetches app data server-side and composes client components
 */
const AppPage: React.FC<AppPageProps> = ({ appId }) => {
  const app = getAppById(appId);

  if (!app) {
    return <AppNotFound />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-primary-50">
      <Container className="py-8 sm:py-12 md:py-20">
        {/* Hero Section */}
        <AppHero app={app} />

        {/* Features Section */}
        <AppFeatures features={app.features} />

        {/* Screenshots Section */}
        <AppScreenshots screenShots={app.screenShots} />

        {/* Description Section */}
        <AppDescription name={app.name} info={app.info} />
      </Container>
    </div>
  );
};

export default AppPage;

// Re-export components for backward compatibility
export { AppShowCase } from "./components/AppShowCase";
export { AppDownloadBtn } from "./components/AppDownloadBtn";
export { AppsInfo, getAppById, getAllApps } from "./data/apps.data";
export type { AppInfo } from "./data/apps.data";
