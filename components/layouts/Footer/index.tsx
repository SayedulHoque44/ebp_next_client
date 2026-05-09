import React from "react";
import Container from "@/components/ui/Container";
import { FooterBackground } from "./components/FooterBackground";
import { FooterHero } from "./components/FooterHero";
import { FooterStats } from "./components/FooterStats";
import { FooterCompanySection } from "./components/FooterCompanySection";
import { FooterLinks } from "./components/FooterLinks";
import { FooterNewsletter } from "./components/FooterNewsletter";
import { FooterCopyright } from "./components/FooterCopyright";

/**
 * Footer Component (Server Component)
 * 
 * Main footer layout
 * Server-rendered for SEO and performance
 * Composes client components for interactivity
 */
const Footer = () => {
  return (
    <div className="relative py-20 bg-cover bg-center bg-fixed">
      <FooterBackground />

      <Container>
        <div className="relative z-10">
          {/* Hero Section */}
          <FooterHero />

          {/* Stats Section */}
          <FooterStats />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <FooterCompanySection />

            {/* Quick Links */}
            <FooterLinks />
          </div>

          {/* Newsletter Signup */}
          <FooterNewsletter />

          {/* Copyright */}
          <FooterCopyright />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
