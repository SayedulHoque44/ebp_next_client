import React from "react";
import { PAPSection } from "./PAPSection";
import { PAPSectionHeader } from "./PAPSectionHeader";

/**
 * PAPDisclosure Component (Server Component)
 * 
 * Disclosure sections
 * Server-rendered for SEO
 */
export const PAPDisclosure: React.FC = () => {
  return (
    <>
      <PAPSection>
        <PAPSectionHeader title="Disclosure of Your Personal Data Business Transactions" />
        <p className="text-lg">
          If the Company is involved in a merger, acquisition or asset sale, Your
          Personal Data may be transferred. We will provide notice before Your
          Personal Data is transferred and becomes subject to a different Privacy
          Policy.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Law enforcement" />
        <p className="text-lg">
          Under certain circumstances, the Company may be required to disclose Your
          Personal Data if required to do so by law or in response to valid
          requests by public authorities (e.g. a court or a government agency).
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Other legal requirements" icon="check" />
        <p className="text-lg">
          The Company may disclose Your Personal Data in the good faith belief that
          such action is necessary to:
        </p>

        <ul className="text-lg list-disc ml-10 space-y-3">
          <li>Comply with a legal obligation</li>
          <li>Protect and defend the rights or property of the Company</li>
          <li>
            Prevent or investigate possible wrongdoing in connection with the
            Service
          </li>
          <li>
            Protect the personal safety of Users of the Service or the public
          </li>
          <li>Protect against legal liability</li>
        </ul>
      </PAPSection>
    </>
  );
};
