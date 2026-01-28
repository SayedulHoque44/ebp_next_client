import React from "react";
import dynamic from "next/dynamic";

// Dynamically import client component to reduce initial bundle size
// This allows the server to render the shell while client code loads
const HomeClient = dynamic(() => import("./HomeClient"), {
  ssr: true, // Still render on server for SEO, but hydrate on client
});

/**
 * Home Component (Server Component)
 * 
 * This is the main entry point for the Home page.
 * It acts as a server component wrapper around HomeClient.
 * 
 * Benefits:
 * - Better SEO (server-rendered HTML)
 * - Faster initial page load
 * - Clear separation between server and client code
 * - Can fetch data here if needed in the future
 * 
 * The actual interactive content is in HomeClient.tsx
 */
const Home = () => {
  return <HomeClient />;
};

export default Home;
