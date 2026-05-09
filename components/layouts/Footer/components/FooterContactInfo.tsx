import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FOOTER_CONTACT, FOOTER_COMPANY_DESCRIPTION } from "../config/footer.config";

/**
 * FooterContactInfo Component (Server Component)
 * 
 * Company info and contact details
 * Server-rendered for SEO
 */
export const FooterContactInfo: React.FC = () => {
  return (
    <>
      <h3 className="text-2xl font-bold text-white mb-6">
        Easy Bangla Patente
      </h3>
      <p className="text-gray-300 mb-6 leading-relaxed">
        {FOOTER_COMPANY_DESCRIPTION}
      </p>

      {/* Contact Info */}
      <div className="space-y-3">
        <div className="flex items-center text-gray-300">
          <FaPhone className="mr-3 text-blue-400" />
          <a
            href={`tel:${FOOTER_CONTACT.phone.replace(/\s/g, "")}`}
            className="hover:text-blue-400 transition-colors"
          >
            {FOOTER_CONTACT.phone}
          </a>
        </div>
        <div className="flex items-center text-gray-300">
          <FaEnvelope className="mr-3 text-blue-400" />
          <a
            href={`mailto:${FOOTER_CONTACT.email}`}
            className="hover:text-blue-400 transition-colors"
          >
            {FOOTER_CONTACT.email}
          </a>
        </div>
        <div className="flex items-center text-gray-300">
          <FaMapMarkerAlt className="mr-3 text-blue-400" />
          <span>{FOOTER_CONTACT.location}</span>
        </div>
      </div>
    </>
  );
};
