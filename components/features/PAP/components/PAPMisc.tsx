import React from "react";
import { PAPSection } from "./PAPSection";
import { PAPSectionHeader } from "./PAPSectionHeader";

/**
 * PAPMisc Component (Server Component)
 * 
 * Miscellaneous sections (links, changes, contact)
 * Server-rendered for SEO
 */
export const PAPMisc: React.FC = () => {
  return (
    <>
      <PAPSection>
        <PAPSectionHeader title="Links to Other Websites" />
        <p className="text-lg">
          Our Service may contain links to other websites that are not operated by
          Us. If You click on a third party link, You will be directed to that
          third party&apos;s site. We strongly advise You to review the Privacy
          Policy of every site You visit.
          <br />
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Changes to this Privacy Policy" />
        <p className="text-lg">
          We may update Our Privacy Policy from time to time. We will notify You of
          any changes by posting the new Privacy Policy on this page.
          <br />
          We will let You know via email and/or a prominent notice on Our Service,
          prior to the change becoming effective and update the &quot;Last
          updated&quot; date at the top of this Privacy Policy.
          <br />
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Contact Us" />
        <p className="text-lg">
          If you have any questions about this Privacy Policy, You can contact us:
        </p>
        <ul className="text-lg list-disc ml-10 space-y-3">
          <li>
            <b>By email:</b> easybpatente@gmail.com
          </li>
          <li>
            <b>By Phone Number: </b>+39 320 608 8871
          </li>
        </ul>
      </PAPSection>
    </>
  );
};
