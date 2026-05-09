import React from "react";
import Container from "@/components/ui/Container";
import { PAPIntroduction } from "./components/PAPIntroduction";
import { PAPDefinitions } from "./components/PAPDefinitions";
import { PAPDataCollection } from "./components/PAPDataCollection";
import { PAPDataUsage } from "./components/PAPDataUsage";
import { PAPDataManagement } from "./components/PAPDataManagement";
import { PAPDisclosure } from "./components/PAPDisclosure";
import { PAPSecurity } from "./components/PAPSecurity";
import { PAPMisc } from "./components/PAPMisc";
import { PAPCTA } from "./components/PAPCTA";

/**
 * PrivacyAndPolicy Component (Server Component)
 * 
 * Main privacy policy page
 * Server-rendered for SEO and performance
 */
const PrivacyAndPolicy = () => {
  return (
    <Container>
      <div className="space-y-10 py-10">
        {/* Introduction */}
        <PAPIntroduction />

        {/* Definitions */}
        <PAPDefinitions />

        {/* Data Collection */}
        <PAPDataCollection />

        {/* Data Usage */}
        <PAPDataUsage />

        {/* Data Management */}
        <PAPDataManagement />

        {/* Disclosure */}
        <PAPDisclosure />

        {/* Security */}
        <PAPSecurity />

        {/* Miscellaneous */}
        <PAPMisc />

        {/* CTA */}
        <PAPCTA />
      </div>
    </Container>
  );
};

export default PrivacyAndPolicy;
