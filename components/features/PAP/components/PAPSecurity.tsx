import React from "react";
import { PAPSection } from "./PAPSection";
import { PAPSectionHeader } from "./PAPSectionHeader";

/**
 * PAPSecurity Component (Server Component)
 * 
 * Security and children's privacy sections
 * Server-rendered for SEO
 */
export const PAPSecurity: React.FC = () => {
  return (
    <>
      <PAPSection>
        <PAPSectionHeader title="Security of Your Personal Data" />
        <p className="text-lg">
          The security of Your Personal Data is important to Us, but remember that
          no method of transmission over the Internet, or method of electronic
          storage is 100% secure. While We strive to use commercially acceptable
          means to protect Your Personal Data, We cannot guarantee its absolute
          security.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Children&apos;s Privacy" icon="check" />
        <p className="text-lg">
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone under
          the age of 13. If You are a parent or guardian and You are aware that
          Your child has provided Us with Personal Data, please contact Us. If We
          become aware that We have collected Personal Data from anyone under the
          age of 13 without verification of parental consent, We take steps to
          remove that information from Our servers.
          <br />
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent&apos;s consent before We collect and use that
          information.
        </p>
      </PAPSection>
    </>
  );
};
