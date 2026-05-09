import React from "react";
import { PAPSection } from "./PAPSection";
import { PAPSectionHeader } from "./PAPSectionHeader";

/**
 * PAPIntroduction Component (Server Component)
 * 
 * Introduction section
 * Server-rendered for SEO
 */
export const PAPIntroduction: React.FC = () => {
  return (
    <PAPSection>
      <PAPSectionHeader title="Privacy Policy" icon="privacy" />
      <h2 className="text-P-primary">Last updated: September 01, 2024</h2>
      <p className="text-lg">
        This Privacy Policy describes Our policies and procedures on the
        collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You.
        <br />
        <br />
        We use Your Personal data to provide and improve the Service. By using
        the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy.
      </p>
    </PAPSection>
  );
};
