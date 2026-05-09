import React from "react";
import { PAPSection } from "./PAPSection";
import { PAPSectionHeader } from "./PAPSectionHeader";

/**
 * PAPDataManagement Component (Server Component)
 * 
 * Data management sections (retention, transfer, deletion)
 * Server-rendered for SEO
 */
export const PAPDataManagement: React.FC = () => {
  return (
    <>
      <PAPSection>
        <PAPSectionHeader title="Retention of Your Personal Data" />
        <p className="text-lg">
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will retain
          and use Your Personal Data to the extent necessary to comply with our
          legal obligations (for example, if we are required to retain your data
          to comply with applicable laws), resolve disputes, and enforce our legal
          agreements and policies.
          <br />
          The Company will also retain Usage Data for internal analysis purposes.
          Usage Data is generally retained for a shorter period of time, except
          when this data is used to strengthen the security or to improve the
          functionality of Our Service, or We are legally obligated to retain this
          data for longer time periods.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Transfer of Your Personal Data" />
        <p className="text-lg">
          Your information, including Personal Data, is processed at the
          Company&apos;s operating offices and in any other places where the
          parties involved in the processing are located. It means that this
          information may be transferred to — and maintained on — computers located
          outside of Your state, province, country or other governmental
          jurisdiction where the data protection laws may differ than those from
          Your jurisdiction.
          <br />
          Your consent to this Privacy Policy followed by Your submission of such
          information represents Your agreement to that transfer.
          <br />
          The Company will take all steps reasonably necessary to ensure that Your
          data is treated securely and in accordance with this Privacy Policy and
          no transfer of Your Personal Data will take place to an organization or a
          country unless there are adequate controls in place including the
          security of Your data and other personal information.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Delete Your Personal Data" />
        <p className="text-lg">
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
          <br />
          Our Service may give You the ability to delete certain information about
          You from within the Service.
          <br />
          You may update, amend, or delete Your information at any time by signing
          in to Your Account, if you have one, and visiting the account settings
          section that allows you to manage Your personal information. You may
          also contact Us to request access to, correct, or delete any personal
          information that You have provided to Us.
          <br />
          Please note, however, that We may need to retain certain information when
          we have a legal obligation or lawful basis to do so.
        </p>
      </PAPSection>
    </>
  );
};
