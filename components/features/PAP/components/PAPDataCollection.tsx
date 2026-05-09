import React from "react";
import { PAPSection } from "./PAPSection";
import { PAPSectionHeader } from "./PAPSectionHeader";

/**
 * PAPDataCollection Component (Server Component)
 * 
 * Data collection sections
 * Server-rendered for SEO
 */
export const PAPDataCollection: React.FC = () => {
  return (
    <>
      <PAPSection>
        <PAPSectionHeader title="Collecting and Using Your Personal Data Types of Data Collected Personal Data" />
        <p className="text-lg">
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is not
          limited to:
        </p>
        <ul className="text-lg list-disc ml-10 space-y-3">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Usage Data</li>
        </ul>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader title="Usage Data" />
        <p className="text-lg">
          Usage Data is collected automatically when using the Service. Usage Data
          may include information such as Your Device&apos;s Internet Protocol
          address (e.g. IP address), browser type, browser version, the pages of our
          Service that You visit, the time and date of Your visit, the time spent
          on those pages, unique device identifiers and other diagnostic data.
          <br />
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID, the
          IP address of Your mobile device, Your mobile operating system, the type
          of mobile Internet browser You use, unique device identifiers and other
          diagnostic data.
          <br />
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a mobile
          device.
        </p>
      </PAPSection>

      <PAPSection>
        <PAPSectionHeader
          title="Information Collected while Using the Application"
          icon="check"
        />
        <p className="text-lg">
          While using Our Application, in order to provide features of Our
          Application, We may collect, with Your prior permission:
          <br />
          <span className="ml-5">
            Pictures and other information from your Device&apos;s camera and photo
            library
          </span>
          We use this information to provide features of Our Service, to improve
          and customize Our Service. The information may be uploaded to the
          Company&apos;s servers and/or a Service Provider&apos;s server or it may
          be simply stored on Your device.
          <br />
          You can enable or disable access to this information at any time,
          through Your Device settings.
        </p>
      </PAPSection>
    </>
  );
};
