import AppPage from "@/components/features/AppPage";
import React from "react";
import { Metadata } from "next";
import { getAppById } from "@/components/features/AppPage/data/apps.data";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const appId = parseInt(id, 10);
  const app = getAppById(appId);

  if (!app) {
    return {
      title: "App Not Found | Easy Bangla Patente",
      description: "The requested app could not be found.",
    };
  }

  return {
    title: `${app.name} - ${app.title} | Easy Bangla Patente`,
    description: app.description || app.info,
    openGraph: {
      title: `${app.name} - ${app.title}`,
      description: app.description || app.info,
      images: [
        {
          url: app.logoLink,
          width: 512,
          height: 512,
          alt: `${app.name} logo`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${app.name} - ${app.title}`,
      description: app.description || app.info,
      images: [app.logoLink],
    },
    alternates: {
      canonical: `/App/${appId}`,
    },
  };
}

/**
 * Generate static params for static generation (optional - for better performance)
 */
export async function generateStaticParams() {
  // This enables static generation for known app IDs
  return [
    { id: "1" },
    { id: "2" },
  ];
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const appId = parseInt(id, 10);

  return <AppPage appId={appId} />;
};

export default page;
