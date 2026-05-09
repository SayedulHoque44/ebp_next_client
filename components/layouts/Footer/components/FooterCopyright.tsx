import React from "react";
import { FOOTER_COPYRIGHT } from "../config/footer.config";

/**
 * FooterCopyright Component (Server Component)
 * 
 * Copyright notice
 * Server-rendered for SEO
 */
export const FooterCopyright: React.FC = () => {
  return (
    <footer className="footer footer-center p-4 bg-black text-white mt-5">
      <aside>
        <p>{FOOTER_COPYRIGHT.text}</p>
      </aside>
    </footer>
  );
};
